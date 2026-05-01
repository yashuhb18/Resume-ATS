"""
Roadmap Generator Service - Generates Career Roadmaps dynamically using LLMs.
"""
import os
import json
from typing import List, Dict, Any
import httpx
from app.models.schemas import RoadmapResponse, RoadmapStep

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

class RoadmapGenerator:
    """Generates career roadmaps dynamically based on a specific domain."""

    def __init__(self):
        # Fallback roadmap if LLMs fail
        self.default_roadmap = {
            "domain": "Generic Electronics & Communication",
            "steps": [
                {
                    "title": "Core Fundamentals",
                    "description": "Master Network Theory, Digital Logic Design, and basic Microprocessors.",
                    "key_skills": ["Circuit Analysis", "Digital Logic", "Basic C"]
                },
                {
                    "title": "Hardware & Software Symbiosis",
                    "description": "Learn C/C++ programming alongside bare-metal microcontroller programming.",
                    "key_skills": ["C/C++", "Microcontrollers", "Embedded C"]
                },
                {
                    "title": "Practical Portfolios",
                    "description": "Build 2 hardware/software integration projects (e.g., IoT weather station, logic controller).",
                    "key_skills": ["Arduino/ESP32", "Sensors", "Hardware Debugging"]
                },
                {
                    "title": "Industry Standard Protocols",
                    "description": "Deep dive into standard communication protocols and real-time operating systems.",
                    "key_skills": ["SPI", "I2C", "UART", "RTOS"]
                },
                {
                    "title": "Advanced Specialization",
                    "description": "Focus on a niche like VLSI layout, high-speed PCB design, or DSP algorithms.",
                    "key_skills": ["Altium", "MATLAB", "Verilog"]
                }
            ]
        }

    def generate(self, domain: str, year_of_study: str, current_skill_level: str) -> Dict[str, Any]:
        """Generate a personalized roadmap for the specified domain."""
        
        prompt = (
            f"You are an elite, God-level Engineering Career Strategist for the domain: {domain}. "
            f"The candidate is currently in: {year_of_study} and has a skill level of: {current_skill_level}. "
            "Your task is to generate a highly detailed, extremely accurate 5-step career roadmap for them. "
            "You MUST dictate the EXACT technical skills they need to learn, progressing logically from their current state up to 'Mastery'. "
            "Provide 100% relevant, industry-standard tools, languages, and hardware frameworks for this specific domain. "
            "Do not give generic advice. Be highly specific about WHAT to build and exactly WHAT technologies to use. "
            "Return ONLY a valid JSON object with the following structure, with no markdown formatting or extra text:\n"
            "{\n"
            f'  "domain": "{domain}",\n'
            '  "steps": [\n'
            '    {\n'
            '      "title": "Step 1 Title (e.g., Immediate Focus: Core Fundamentals)",\n'
            '      "description": "Highly detailed description of the exact technologies to learn and the specific projects to build at this stage.",\n'
            '      "key_skills": ["Exact Tool/Skill 1", "Exact Tool/Skill 2", "Exact Tool/Skill 3"]\n'
            '    }\n'
            '    // Exactly 5 steps leading to mastery\n'
            "  ]\n"
            "}"
        )

        roadmap_data = self._generate_with_openai(prompt)
        if not roadmap_data:
            roadmap_data = self._generate_with_ollama(prompt)
            
        if not roadmap_data or "steps" not in roadmap_data:
            roadmap_data = self.default_roadmap

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
            content = response.choices[0].message.content
            if content.startswith("```json"):
                content = content[7:-3]
            elif content.startswith("```"):
                content = content[3:-3]
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
