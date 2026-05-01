"""
Roadmap Generator Service - Generates Career Roadmaps dynamically using LLMs.
Tailored for ECE/EEE with deep-tier technical precision.
"""
import os
import json
from typing import List, Dict, Any, Optional
import httpx
from app.models.schemas import RoadmapResponse, RoadmapStep
from app.services.roadmap_data import DOMAIN_ROADMAPS, GENERIC_ROADMAP

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

class RoadmapGenerator:
    """Generates career roadmaps dynamically based on a specific domain and resume context."""

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.openai_api_key = os.getenv("OPENAI_API_KEY")

    def generate(self, domain: str, resume_text: Optional[str] = None) -> Dict[str, Any]:
        """
        Generate a personalized career roadmap.
        If resume_text is provided, the roadmap is tailored to fill the student's specific gaps.
        """
        
        context_block = ""
        if resume_text:
            context_block = f"""
            RESUME CONTEXT DETECTED:
            {resume_text[:2000]} 

            INSTRUCTION: 
            1. Analyze the student's current skills vs the requirements for {domain}.
            2. Identify exactly where they are weak (e.g., if they know C but not Verilog).
            3. The "beginner_steps" should focus on bridging their immediate gaps.
            4. The "role_suitability" should explain why their specific background (from the resume) makes them a good or unique fit for this domain.
            """

        prompt = f"""
        You are an elite Lead Architect at a top-tier semiconductor firm (Intel/NVIDIA/Qualcomm).
        Generate a "Professional Authority" career roadmap for the domain: {domain}

        {context_block}

        Your output MUST be a valid JSON object matching this exact schema:
        {{
            "domain": "String (e.g., {domain})",
            "role_suitability": "String (Explain why this domain suits the student's DNA and which specific industry role they should target)",
            "news_headline": "String (A technical industry briefing, e.g., 'TSMC 2nm Node Production Breakthrough')",
            "beginner_steps": [
                {{
                    "title": "String",
                    "description": "String (Specific toolchain focus: e.g., Cadence Virtuoso, Xilinx Vivado, Keil uVision)",
                    "key_skills": ["String", "String"],
                    "course_link": "String (Relevant Coursera Plus URL)",
                    "youtube_link": "String (Technical deep-dive URL)",
                    "critical_project": "String (A high-impact hardware project they MUST build)"
                }}
            ],
            "intermediate_steps": [ ... ],
            "advanced_steps": [ ... ]
        }}

        CRITICAL REQUIREMENTS:
        1. TERMINOLOGY: Use high-level ECE terms (RTL, STA, DRC/LVS, RTOS, PCB Stackup, DSP Benchmarking).
        2. DATASET ACCURACY: Only recommend real, industry-standard toolchains. NO generic software advice.
        3. 3-TIER FORKING: beginner_steps (Fundamentals), intermediate_steps (Accelerator), advanced_steps (Mastery).
        4. ZERO HALLUCINATION: Ensure all links and descriptions are technically valid.
        5. PROJECT FOCUS: Every step MUST have a unique 'critical_project' that is industry-ready.
        
        Do NOT wrap the JSON in markdown blocks. Output raw JSON only.
        """

        # Priority: OpenAI (GPT-4 if possible) -> Ollama -> Hardcoded
        roadmap_data = self._generate_with_openai(prompt)
        if not roadmap_data:
            roadmap_data = self._generate_with_ollama(prompt)
            
        if not roadmap_data or "beginner_steps" not in roadmap_data:
            # Fallback to hardcoded but inject domain
            roadmap_data = DOMAIN_ROADMAPS.get(domain, GENERIC_ROADMAP).copy()
            roadmap_data["role_suitability"] = f"Based on industry benchmarks, {domain} offers high growth in semiconductor sectors. You should target Senior Design Engineer roles."
            
        # Ensure all fields exist for Pydantic
        if "domain" not in roadmap_data: roadmap_data["domain"] = domain
        if "role_suitability" not in roadmap_data: roadmap_data["role_suitability"] = "High-growth hardware role alignment detected."
        
        return roadmap_data

    def _generate_with_openai(self, prompt: str) -> Any:
        api_key = os.getenv("OPENAI_API_KEY")
        if not api_key or OpenAI is None:
            return None

        try:
            client = OpenAI(api_key=api_key)
            response = client.chat.completions.create(
                model="gpt-4-turbo-preview", # Upgrade to GPT-4 for "God-Level" accuracy
                messages=[{"role": "system", "content": "You are a professional ECE career architect. Output JSON only."}, 
                          {"role": "user", "content": prompt}],
                temperature=0.7,
                response_format={ "type": "json_object" }
            )
            content = response.choices[0].message.content.strip()
            return json.loads(content)
        except Exception as e:
            print(f"OpenAI Roadmap Generator Error: {e}")
            return None

    def _generate_with_ollama(self, prompt: str) -> Any:
        host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        model = os.getenv("OLLAMA_MODEL", "llama3")

        try:
            with httpx.Client(timeout=60.0) as client:
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
