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
        """Generate a completely distinct 3-phase career roadmap."""
        
        prompt = (
            f"You are an elite, God-level Engineering Career Strategist for the domain: {domain}. "
            "Your task is to generate a highly detailed, extremely accurate 15-step career roadmap for them. "
            "The roadmap MUST be split into THREE distinct, non-overlapping paths: Beginner (0-1), Intermediate (Bridging the gap), and Advanced (Mastery). "
            "You MUST dictate the EXACT technical skills they need to learn, progressing logically from their current state up to 'Mastery'. "
            "Provide 100% relevant, industry-standard tools, languages, and hardware frameworks for this specific domain. "
            "Do not give generic advice. Be highly specific about WHAT to build and exactly WHAT technologies to use. "
            "Return ONLY a valid JSON object with the following structure, with no markdown formatting or extra text:\n"
            "{\n"
            f'  "domain": "{domain}",\n'
            '  "news_headline": "String (A realistic, exciting current industry trend or news headline related to this domain)",\n'
            '  "beginner_steps": [\n'
            '    {\n'
            '      "title": "String",\n'
            '      "description": "String",\n'
            '      "key_skills": ["String", "String", "String"]\n'
            '    }\n'
            '    // Exactly 5 steps\n'
            '  ],\n'
            '  "intermediate_steps": [\n'
            '    {\n'
            '      "title": "String",\n'
            '      "description": "String",\n'
            '      "key_skills": ["String", "String", "String"]\n'
            '    }\n'
            '    // Exactly 5 steps\n'
            '  ],\n'
            '  "advanced_steps": [\n'
            '    {\n'
            '      "title": "String",\n'
            '      "description": "String",\n'
            '      "key_skills": ["String", "String", "String"]\n'
            '    }\n'
            '    // Exactly 5 steps\n'
            '  ]\n'
            "}"
        )

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
