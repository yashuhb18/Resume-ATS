"""
Mock Assessment Service - Generates technical quizzes dynamically using LLMs.
"""
import os
import json
import random
from typing import List, Dict, Any
import httpx
from app.models.schemas import DomainInfo, SkillsData

try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

class MockAssessmentGenerator:
    """Generates personalized technical questions dynamically."""

    def __init__(self):
        # Fallback question bank if LLMs fail
        self.fallback_questions = [
            {
                "question": "What is the ideal input impedance of an Operational Amplifier (Op-Amp)?",
                "options": ["Zero", "100 Ohms", "Infinite", "Negative"],
                "correct_answer": "Infinite",
                "explanation": "An ideal Op-Amp has infinite input impedance so it does not draw any current from the input source."
            },
            {
                "question": "Which theorem states that any linear bilateral network can be replaced by an equivalent circuit consisting of a single voltage source and series resistance?",
                "options": ["Norton's Theorem", "Superposition Theorem", "Thevenin's Theorem", "Maximum Power Transfer Theorem"],
                "correct_answer": "Thevenin's Theorem",
                "explanation": "Thevenin's Theorem simplifies complex circuits into a Vth and Rth."
            },
            {
                "question": "According to the Nyquist-Shannon sampling theorem, what is the minimum sampling rate for a signal with a maximum frequency of fm?",
                "options": ["fm", "1.5 fm", "2 fm", "4 fm"],
                "correct_answer": "2 fm",
                "explanation": "The sampling rate must be at least twice the maximum frequency to perfectly reconstruct the signal."
            },
            {
                "question": "What is the primary advantage of CMOS over NMOS technology?",
                "options": ["Faster switching speed", "Lower static power dissipation", "Smaller transistor size", "Higher integration density"],
                "correct_answer": "Lower static power dissipation",
                "explanation": "CMOS only consumes significant power during switching, resulting in near-zero static power dissipation."
            },
            {
                "question": "In a 3-phase system, what is the phase difference between the three voltages?",
                "options": ["90 degrees", "120 degrees", "180 degrees", "360 degrees"],
                "correct_answer": "120 degrees",
                "explanation": "A balanced 3-phase system has voltages separated by 360/3 = 120 degrees."
            }
        ]

    def generate_assessment(self, domain: DomainInfo, skills: SkillsData, num_questions: int = 5) -> Dict[str, Any]:
        """Generates a personalized quiz based on the user's parsed skills."""
        
        all_skills = (
            skills.programming_languages + 
            skills.frameworks + 
            skills.tools + 
            skills.databases + 
            skills.other
        )
        
        prompt = (
            f"You are an expert technical interviewer for the domain: {domain.primary}. "
            f"The candidate has the following technical skills: {', '.join(all_skills[:30])}. "
            f"Generate exactly {num_questions} multiple-choice questions to test their knowledge on these specific skills and their domain. "
            "Return ONLY a valid JSON object with the following structure, with no markdown formatting or extra text:\n"
            "{\n"
            '  "questions": [\n'
            '    {\n'
            '      "question": "Question text here?",\n'
            '      "options": ["Option A", "Option B", "Option C", "Option D"],\n'
            '      "correct_answer": "Option B",\n'
            '      "explanation": "Brief explanation of why Option B is correct."\n'
            '    }\n'
            "  ]\n"
            "}"
        )

        questions = self._generate_with_openai(prompt)
        if not questions:
            questions = self._generate_with_ollama(prompt)
        
        if not questions or "questions" not in questions:
            # Fallback
            random.shuffle(self.fallback_questions)
            questions = {"questions": self.fallback_questions[:num_questions]}

        return {
            "title": f"Customized {domain.primary} Assessment",
            "description": "Test your core concepts based on your resume's skills to prepare for technical interviews.",
            "questions": questions["questions"],
            "total_questions": len(questions["questions"])
        }

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
            # Clean possible markdown
            if content.startswith("```json"):
                content = content[7:-3]
            elif content.startswith("```"):
                content = content[3:-3]
            return json.loads(content)
        except Exception as e:
            print(f"OpenAI Assessment Error: {e}")
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
            print(f"Ollama Assessment Error: {e}")
            return None

mock_assessment_generator = MockAssessmentGenerator()
