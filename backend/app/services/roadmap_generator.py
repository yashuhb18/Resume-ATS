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
        input_context = f"Domain: {domain}" if domain else f"Resume DNA: {resume_text[:4000] if resume_text else 'N/A'}"
        
        prompt = f"""
        You are the 'Supreme Career Architect' at the ResQ Galactic Intelligence Center.
        Your task is to analyze the provided professional DNA and generate a 100% UNIQUE, high-fidelity career roadmap.
        
        CONTEXT:
        {input_context}

        CRITICAL INSTRUCTIONS:
        1. IDENTIFICATION: Carefully identify the exact professional domain. Avoid generic terms like "Software Engineer". Be specific (e.g., "Senior Cloud Security Architect", "Full-Stack MERN Specialist", "VLSI RTL Verification Lead").
        2. PERSONALIZATION: Every single step and project MUST be directly influenced by the candidate's current skills and experience. Do NOT use templates.
        3. PROJECT GENERATION: Create projects that combine the candidate's existing tech stack with the skills they need to learn.
        4. GITHUB LINKS: Provide highly specific GitHub search URLs (e.g., "https://github.com/search?q=react-native-webrtc-example" instead of a generic link).
        5. COURSERA PLUS: All course links must be high-quality Coursera or technical specialization links.
        6. MARKET DATA: Provide a realistic 7-point market demand trend (0-100) reflecting current global hiring for this EXACT role.

        Your output MUST be a valid JSON object matching this exact schema:
        {{
            "domain": "String (Be highly specific)",
            "role_suitability": "String (Elite briefing on why this trajectory fits their DNA)",
            "news_headline": "String (Real-world industry trend relevant to this role)",
            "market_demand_trend": [Int, Int, Int, Int, Int, Int, Int],
            "job_openings": [
                {{
                    "title": "Exact Role Title",
                    "company": "Top Global Company",
                    "location": "Remote / Global",
                    "apply_link": "Indeed/LinkedIn Search URL for this exact role",
                    "salary_range": "Realistic range for this expertise"
                }}
            ],
            "beginner_steps": [
                {{
                    "title": "String",
                    "description": "String",
                    "key_skills": ["Skill1", "Skill2"],
                    "course_link": "URL",
                    "youtube_link": "YouTube Search URL",
                    "projects": [
                        {{"title": "Custom Project Title", "github_repo": "Specific GitHub Search URL"}},
                        {{"title": "Custom Project Title", "github_repo": "Specific GitHub Search URL"}}
                    ]
                }}
            ],
            "intermediate_steps": [ ... 5 steps total ... ],
            "advanced_steps": [ ... 5 steps total ... ]
        }}

        OUTPUT RAW JSON ONLY. NO MARKDOWN.
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
            model = genai.GenerativeModel('gemini-flash-latest')
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
