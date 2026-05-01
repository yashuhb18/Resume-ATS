"""
Roadmap Generator Service - Generates Career Roadmaps dynamically using LLMs.
"""
import os
import json
from typing import List, Dict, Any
import httpx
from app.models.schemas import RoadmapResponse, RoadmapStep
from app.services.roadmap_data import DOMAIN_ROADMAPS, GENERIC_ROADMAP

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

class RoadmapGenerator:
    """Generates career roadmaps dynamically based on a specific domain."""

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")

    def generate(self, domain: str) -> Dict[str, Any]:
        """
        Generate a completely distinct 3-phase career roadmap (Beginner, Intermediate, Advanced)
        with specific domain terminology and Coursera links.
        """
        
        prompt = f"""
        You are an elite Silicon Valley Hardware & Embedded Systems Career Architect.
        Generate a "God-Level" comprehensive career roadmap for the following ECE domain: {domain}

        Your output MUST be a valid JSON object matching this exact schema:
        {{
            "domain": "String (e.g., {domain})",
            "role_suitability": "String (A high-level professional assessment of why this domain suits an EC student)",
            "news_headline": "String (A realistic, exciting current industry trend)",
            "beginner_steps": [
                {{
                    "title": "String",
                    "description": "String (Technical and actionable)",
                    "key_skills": ["String", "String"],
                    "course_link": "String",
                    "youtube_link": "String",
                    "projects": [
                        {{"title": "Project 1", "github_repo": "GitHub URL"}},
                        {{"title": "Project 2", "github_repo": "GitHub URL"}}
                    ]
                }}
            ],
            "intermediate_steps": [ ... ],
            "advanced_steps": [ ... ]
        }}

        CRITICAL REQUIREMENTS:
        1. There MUST be exactly 5 steps in `beginner_steps`, 5 steps in `intermediate_steps`, and 5 steps in `advanced_steps`.
        2. ZERO OVERLAP: The roadmaps for VLSI must be completely different from Embedded, etc. Use specific domain keywords (e.g., RTL for VLSI, RTOS for Embedded).
        3. COURSERA PLUS: Every step must include a `course_link` pointing to a relevant Coursera course that fits the student's Coursera Plus subscription.
        4. Focus on becoming an elite master ready for top FAANG/Semiconductor roles.
        5. Do NOT wrap the JSON in markdown blocks. Output raw JSON only.
        """

        roadmap_data = self._generate_with_openai(prompt)
        if not roadmap_data:
            roadmap_data = self._generate_with_ollama(prompt)
            
        if not roadmap_data or "beginner_steps" not in roadmap_data:
            print("Falling back to hardcoded roadmap...")
            roadmap_data = DOMAIN_ROADMAPS.get(domain, GENERIC_ROADMAP)

        # Fail-safe: Ensure domain key exists to prevent Pydantic validation errors
        if "domain" not in roadmap_data:
            roadmap_data["domain"] = domain
            
        return roadmap_data

    def _generate_with_openai(self, prompt: str) -> Any:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key or OpenAI is None:
            return None

        try:
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7,
            )
            content = response.choices[0].message.content.strip()
            if content.startswith("```json"):
                content = content[7:-3].strip()
            elif content.startswith("```"):
                content = content[3:-3].strip()
            return json.loads(content)
        except Exception as e:
            print(f"OpenAI Roadmap Generator Error: {e}")
            return None

    def _generate_with_ollama(self, prompt: str) -> Any:
        host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        model = os.getenv("OLLAMA_MODEL", "llama3")

        try:
            with httpx.Client(timeout=45.0) as client:
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
            print(f"Ollama Roadmap Generator Error: {e}")
            return None

roadmap_generator = RoadmapGenerator()
