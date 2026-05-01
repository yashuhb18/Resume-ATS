"""
Roadmap Generator Service - Universal Global Intelligence Engine.
"""
import os
import json
import httpx
from typing import List, Dict, Any, Optional
from app.models.schemas import RoadmapResponse, RoadmapStep, ProjectDetail, JobOpening
from app.services.roadmap_data import DOMAIN_ROADMAPS, GENERIC_ROADMAP

try:
    import google.generativeai as genai
except ImportError:
    genai = None

class RoadmapGenerator:
    """Universal Global Intelligence Engine for autonomous career analysis."""

    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY")
        if self.gemini_key and genai:
            genai.configure(api_key=self.gemini_key)

    def generate(self, domain: Optional[str] = None, resume_text: Optional[str] = None) -> Dict[str, Any]:
        """
        Analyze a domain or resume to generate a global market-aware career matrix.
        """
        print(f"DEBUG: Starting generation. Domain: {domain}, Resume: {bool(resume_text)}")
        
        # If resume_text is provided but no domain, classify first
        input_context = f"Domain: {domain}" if domain else f"Resume DNA: {resume_text[:2000] if resume_text else 'N/A'}"
        
        prompt = f"""
        You are the Global Universal Intelligence Engine for career architecture.
        Task: Analyze the following professional input and generate a 'God-Level' career matrix.
        
        Input: {input_context}

        Your output MUST be a valid JSON object matching this exact schema:
        {{
            "domain": "String (Identify the exact professional domain)",
            "role_suitability": "String (Professional assessment of candidate DNA alignment)",
            "news_headline": "String (Exciting global industry trend)",
            "market_demand_trend": [Int, Int, Int, Int, Int, Int, Int], // 7 points representing demand over the last 6 months (0-100)
            "job_openings": [
                {{
                    "title": "Role Title",
                    "company": "Top Global Company",
                    "location": "Remote / Major City",
                    "apply_link": "Direct LinkedIn/Indeed search URL for this role",
                    "salary_range": "e.g., $120k - $180k"
                }}
            ],
            "beginner_steps": [
                {{
                    "title": "String",
                    "description": "String",
                    "key_skills": ["Skill1", "Skill2"],
                    "course_link": "Coursera/Udemy URL",
                    "youtube_link": "YouTube search URL",
                    "projects": [
                        {{"title": "Project Alpha", "github_repo": "GitHub URL"}},
                        {{"title": "Project Beta", "github_repo": "GitHub URL"}}
                    ]
                }}
            ],
            "intermediate_steps": [ ... ],
            "advanced_steps": [ ... ]
        }}

        CRITICAL: 
        1. If it's a resume, extract the most powerful domain found.
        2. Exactly 5 steps per phase (Beginner, Intermediate, Advanced).
        3. Market demand trend must reflect realistic industry data.
        4. Output RAW JSON ONLY.
        """

        roadmap_data = self._generate_with_gemini(prompt)
        
        if not roadmap_data:
            print("DEBUG: Gemini failed or key missing. Falling back to Ollama.")
            roadmap_data = self._generate_with_ollama(prompt)
            
        if not roadmap_data:
            # Final fallback to hardcoded (for ECE domains) or generic
            print(f"DEBUG: All AI models failed. Falling back to hardcoded for domain: {domain}")
            roadmap_data = DOMAIN_ROADMAPS.get(domain, GENERIC_ROADMAP)

        # Ensure all required global fields exist for Pydantic
        if "market_demand_trend" not in roadmap_data:
            roadmap_data["market_demand_trend"] = [65, 70, 75, 80, 85, 90, 95]
        if "job_openings" not in roadmap_data:
            roadmap_data["job_openings"] = [
                {"title": f"Senior {domain or 'Professional'}", "company": "Global Leader", "apply_link": "https://www.linkedin.com/jobs"}
            ]
        if "domain" not in roadmap_data:
            roadmap_data["domain"] = domain or "Universal Professional"
            
        # Ensure steps exist (fallback data might only have 1 or 2)
        for phase in ["beginner_steps", "intermediate_steps", "advanced_steps"]:
            if phase not in roadmap_data or not roadmap_data[phase]:
                roadmap_data[phase] = GENERIC_ROADMAP[phase]

        return roadmap_data

    def _generate_with_gemini(self, prompt: str) -> Optional[Dict[str, Any]]:
        if not self.gemini_key or not genai:
            return None
        
        try:
            model = genai.GenerativeModel('gemini-1.5-flash')
            response = model.generate_content(prompt)
            content = response.text.strip()
            
            # Clean markdown JSON blocks if present
            if content.startswith("```json"):
                content = content[7:-3].strip()
            elif content.startswith("```"):
                content = content[3:-3].strip()
                
            return json.loads(content)
        except Exception as e:
            print(f"DEBUG: Gemini Global Engine Error: {e}")
            return None

    def _generate_with_ollama(self, prompt: str) -> Optional[Dict[str, Any]]:
        host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        model = os.getenv("OLLAMA_MODEL", "llama3")

        try:
            with httpx.Client(timeout=90.0) as client:
                resp = client.post(
                    f"{host}/api/generate",
                    json={
                        "model": model,
                        "prompt": prompt,
                        "stream": False,
                        "format": "json"
                    }
                )
                resp.raise_for_status()
                content = resp.json().get("response", "")
                return json.loads(content)
        except Exception as e:
            print(f"DEBUG: Ollama Global Engine Error: {e}")
            return None

roadmap_generator = RoadmapGenerator()
