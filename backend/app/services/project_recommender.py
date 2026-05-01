"""
Project Recommender Service - Generates Smart Project Recommendations dynamically using LLMs.
"""
import os
import json
from typing import List, Dict, Any
import httpx
from app.models.schemas import SkillsData, DomainInfo

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

class ProjectRecommender:
    """Recommends projects dynamically based on missing skills and domain."""

    def __init__(self):
        self.default_projects = [
            {
                "title": "PCB Design for a Custom Power Supply",
                "description": "Design a schematic and PCB layout for a 5V/12V dual power supply using Altium Designer or KiCad.",
                "skills_gained": ["PCB Design", "Circuit Analysis", "Altium/KiCad"],
                "difficulty": "Intermediate",
                "domain": "Electronics"
            },
            {
                "title": "Machine Learning based Fault Detection in Circuits",
                "description": "Apply ML algorithms (using Python/Scikit-learn) on circuit sensor data to detect and classify component faults.",
                "skills_gained": ["Python", "Machine Learning", "Data Analysis", "Electronics"],
                "difficulty": "Advanced",
                "domain": "Interdisciplinary"
            },
            {
                "title": "IoT Based Smart Home Automation System",
                "description": "Develop a smart home system using ESP32/NodeMCU that controls appliances via a mobile app using MQTT protocol.",
                "skills_gained": ["IoT", "ESP32", "C++", "MQTT", "Sensors"],
                "difficulty": "Intermediate",
                "domain": "Embedded Systems"
            }
        ]

    def recommend(self, domain: DomainInfo, missing_skills: List[str]) -> List[Dict[str, Any]]:
        """Recommend projects based on domain and missing skills."""
        
        prompt = (
            f"You are a career strategist for the domain: {domain.primary}. "
            f"The candidate is missing these key skills required for their target roles: {', '.join(missing_skills[:15]) if missing_skills else 'Advanced domain-specific tools'}. "
            "Generate exactly 3 custom, high-impact project ideas they can build to acquire these missing skills and strengthen their portfolio. "
            "Return ONLY a valid JSON object with the following structure, with no markdown formatting or extra text:\n"
            "{\n"
            '  "projects": [\n'
            '    {\n'
            '      "title": "Project Title",\n'
            '      "description": "Detailed 2-sentence description of what to build and how.",\n'
            '      "skills_gained": ["Skill 1", "Skill 2", "Skill 3"],\n'
            '      "difficulty": "Beginner | Intermediate | Advanced",\n'
            '      "domain": "Specific sub-domain"\n'
            '    }\n'
            "  ]\n"
            "}"
        )

        projects_data = self._generate_with_openai(prompt)
        if not projects_data:
            projects_data = self._generate_with_ollama(prompt)
            
        if not projects_data or "projects" not in projects_data:
            return self.default_projects

        return projects_data["projects"]

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
            content = response.choices[0].message.content
            if content.startswith("```json"):
                content = content[7:-3]
            elif content.startswith("```"):
                content = content[3:-3]
            return json.loads(content)
        except Exception as e:
            print(f"OpenAI Project Recommender Error: {e}")
            return None

    def _generate_with_ollama(self, prompt: str) -> Any:
        host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        model = os.getenv("OLLAMA_MODEL", "llama3")

        try:
            with httpx.Client(timeout=30.0) as client:
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
            print(f"Ollama Project Recommender Error: {e}")
            return None

project_recommender = ProjectRecommender()
