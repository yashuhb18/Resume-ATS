import os
import re
import json
import httpx
from typing import Dict, List, Any, Optional

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

try:
    import google.generativeai as genai
except ImportError:
    genai = None

from app.models.schemas import (
    SkillsData, DomainInfo, ScoreBreakdown, 
    ATSIssue, Suggestion, KeywordsAnalysis
)
from app.services.ats_scorer import ATSScorer

class LLMATSScorer:
    """Intelligent ATS Scorer using LLM with fallback to traditional rule-based scoring"""
    
    def __init__(self):
        self.legacy_scorer = ATSScorer()
        self._last_provider = "legacy"
        
    async def analyze_resume(
        self, 
        parsed_data: Dict, 
        skills: SkillsData, 
        domain: DomainInfo,
        parsing_method: str = "standard",
        ocr_confidence: str = None,
        ml_analysis: Dict[str, Any] = None
    ) -> Dict[str, Any]:
        """
        Analyze resume using the best available LLM provider,
        falling back to legacy regex scoring if needed.
        """
        # Always run legacy scoring first to get methodology, keywords_analysis, and fallback data
        legacy_result = self.legacy_scorer.calculate_score(
            parsed_data, skills, domain, parsing_method, ocr_confidence, ml_analysis
        )
        
        # Build prompt
        prompt = self._build_prompt(parsed_data, skills, domain, legacy_result)
        
        # Try LLM providers
        llm_response_text = None
        
        # 1. Try Groq/OpenAI if configured
        if not llm_response_text:
            llm_response_text = self._try_openai(prompt)
            
        # 2. Try Google Gemini if configured
        if not llm_response_text:
            llm_response_text = self._try_gemini(prompt)
            
        # 3. Try Local Ollama
        if not llm_response_text:
            llm_response_text = await self._try_ollama_async(prompt)
            
        # If we got a response, parse it and merge with legacy structure
        if llm_response_text:
            try:
                llm_data = self._parse_json(llm_response_text)
                return self._merge_results(legacy_result, llm_data)
            except Exception as e:
                print(f"Failed to parse LLM ATS output: {e}")
                
        # If all LLMs fail or JSON parsing fails, return the legacy result
        self._last_provider = "legacy_regex"
        return legacy_result

    def _build_prompt(self, parsed_data: Dict, skills: SkillsData, domain: DomainInfo, legacy_result: Dict) -> str:
        text = parsed_data.get('raw_text', '')
        # Limit text to avoid blowing up context windows on local models
        text = text[:8000] if text else "No text extracted."
        
        skills_dict = {
            "programming_languages": getattr(skills, "programming_languages", []),
            "frameworks": getattr(skills, "frameworks", []),
            "tools": getattr(skills, "tools", []),
            "databases": getattr(skills, "databases", []),
            "soft_skills": getattr(skills, "soft_skills", [])
        }
        
        return f"""You are an expert technical recruiter and strict ATS system.
Analyze the following resume for the domain '{domain.primary}'.

## RESUME TEXT
{text}

## EXTRACTED SKILLS
{json.dumps(skills_dict)}

YOUR TASK: Evaluate the resume strictly on parseability, keyword relevance, skill evidence, and experience impact. 
Do not use generic advice. Point to specific lines or missing skills.
Return ONLY valid JSON format exactly matching this structure, with no markdown code blocks around it:
{{
  "score": 75,
  "category": "Good",
  "breakdown": {{
    "keyword_relevance": 70,
    "section_completeness": 90,
    "formatting_score": 85,
    "skill_relevance": 70,
    "experience_clarity": 60,
    "project_impact": 80
  }},
  "issues": [
    {{
      "type": "content",
      "severity": "High",
      "description": "Specific issue description (e.g. 'You listed Python but have no projects showing it')",
      "suggestion": "Specific actionable fix"
    }}
  ],
  "suggestions": [
    {{
      "category": "Impact",
      "title": "Quantify Backend Experience",
      "description": "Your backend experience bullets lack scale.",
      "priority": "High",
      "examples": ["Optimized database queries reducing latency by 20%"]
    }}
  ]
}}
Ensure the JSON is valid. Do not output anything else.
"""

    def _try_openai(self, prompt: str) -> Optional[str]:
        api_key = os.getenv("OPENAI_API_KEY") or os.getenv("GROQ_API_KEY")
        if not api_key or OpenAI is None:
            return None
            
        base_url = "https://api.groq.com/openai/v1" if os.getenv("GROQ_API_KEY") else None
        model = os.getenv("OPENAI_MODEL") or ("llama3-70b-8192" if base_url else "gpt-4o-mini")
        
        try:
            client = OpenAI(api_key=api_key, base_url=base_url)
            response = client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                temperature=0.3,
                max_tokens=1500,
                response_format={"type": "json_object"}
            )
            self._last_provider = f"openai_compatible/{model}"
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI/Groq ATS Scorer error: {e}")
            return None

    def _try_gemini(self, prompt: str) -> Optional[str]:
        api_key = os.getenv("GEMINI_API_KEY")
        if not api_key or genai is None:
            return None
            
        try:
            genai.configure(api_key=api_key)
            model = genai.GenerativeModel('gemini-1.5-flash', generation_config={"response_mime_type": "application/json"})
            response = model.generate_content(prompt)
            self._last_provider = "gemini-1.5-flash"
            return response.text
        except Exception as e:
            print(f"Gemini ATS Scorer error: {e}")
            return None

    async def _try_ollama_async(self, prompt: str) -> Optional[str]:
        ollama_host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        ollama_model = os.getenv("OLLAMA_MODEL", "llama3.1:8b")
        
        try:
            async with httpx.AsyncClient(timeout=120.0) as client:
                # Check if model exists
                tags_resp = await client.get(f"{ollama_host}/api/tags")
                tags_resp.raise_for_status()
                
                available_names = [m.get("name", "") for m in tags_resp.json().get("models", [])]
                available_bases = [name.split(":")[0] for name in available_names]
                if ollama_model.split(":")[0] not in available_bases:
                    if available_names:
                        ollama_model = available_names[0]
                    else:
                        return None

                response = await client.post(
                    f"{ollama_host}/api/generate",
                    json={
                        "model": ollama_model,
                        "prompt": prompt,
                        "stream": False,
                        "format": "json",
                        "options": {
                            "temperature": 0.3,
                            "num_predict": 1024,
                            "num_ctx": 4096
                        }
                    }
                )
                
                if response.status_code == 200:
                    self._last_provider = f"ollama/{ollama_model}"
                    return response.json().get("response", "")
        except Exception as e:
            print(f"Ollama ATS Scorer error: {e}")
        return None

    def _parse_json(self, text: str) -> Dict:
        # Strip markdown
        text = text.strip()
        if text.startswith("```json"):
            text = text[7:]
        elif text.startswith("```"):
            text = text[3:]
        if text.endswith("```"):
            text = text[:-3]
        return json.loads(text.strip())

    def _merge_results(self, legacy: Dict, llm: Dict) -> Dict:
        """Merge LLM intelligent insights with standard formatting and schemas."""
        try:
            breakdown_dict = llm.get('breakdown', {})
            breakdown = ScoreBreakdown(
                keyword_relevance=breakdown_dict.get('keyword_relevance', legacy['breakdown'].keyword_relevance),
                section_completeness=breakdown_dict.get('section_completeness', legacy['breakdown'].section_completeness),
                formatting_score=breakdown_dict.get('formatting_score', legacy['breakdown'].formatting_score),
                skill_relevance=breakdown_dict.get('skill_relevance', legacy['breakdown'].skill_relevance),
                experience_clarity=breakdown_dict.get('experience_clarity', legacy['breakdown'].experience_clarity),
                project_impact=breakdown_dict.get('project_impact', legacy['breakdown'].project_impact)
            )
            
            issues = []
            for i in llm.get('issues', []):
                issues.append(ATSIssue(
                    type=i.get('type', 'content'),
                    severity=i.get('severity', 'Medium'),
                    description=i.get('description', ''),
                    suggestion=i.get('suggestion', '')
                ))
            if not issues:
                issues = legacy['issues']
                
            suggestions = []
            for s in llm.get('suggestions', []):
                suggestions.append(Suggestion(
                    category=s.get('category', 'General'),
                    title=s.get('title', 'Suggestion'),
                    description=s.get('description', ''),
                    priority=s.get('priority', 'Medium'),
                    examples=s.get('examples', [])
                ))
            if not suggestions:
                suggestions = legacy['suggestions']

            return {
                'score': llm.get('score', legacy['score']),
                'breakdown': breakdown,
                'category': llm.get('category', legacy['category']),
                'issues': issues,
                'suggestions': suggestions,
                'keywords_analysis': legacy['keywords_analysis'],  # Keep legacy standard analysis
                'methodology': legacy['methodology']               # Keep legacy standard analysis
            }
        except Exception as e:
            print(f"Error mapping LLM fields to schema: {e}")
            return legacy

llm_ats_scorer = LLMATSScorer()
