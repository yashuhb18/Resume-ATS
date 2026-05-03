import os
import google.generativeai as genai
from typing import List, Dict, Optional

class NimmaAI:
    """Unified AI companion for Nimma-MITra (Student Intelligence Hub)."""

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        self.model_name = "gemini-1.5-flash"
        self._initialized = False

    def _initialize(self):
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self._initialized = True

    async def chat(self, query: str, history: List[Dict[str, str]] = None) -> str:
        if not self._initialized:
            self._initialize()

        if not self._initialized:
            return "Intelligence Core Offline. Please check GEMINI_API_KEY."

        # Platform Knowledge & Personality
        system_instruction = (
            "You are Nimma-AI, the primary intelligence companion for Nimma-MITra (the Student Intelligence Hub). "
            "Nimma-MITra is a premium, institutional career platform designed specifically for the ECE (Electronics and Communication Engineering) "
            "department at MITM (Maharaja Institute of Technology Mysore). "
            "\n\n"
            "Key Platform Features You Know About:\n"
            "1. Academic Facilities: Semester-wise repositories (3rd to 7th semester) curated by students. It is an 'app for the students, by the students'.\n"
            "2. Global Intelligence Grid: Real-time industry news and semiconductor market trends.\n"
            "3. Career Roadmap: Dynamic, AI-generated pathways for specialized ECE domains.\n"
            "4. Job Intelligence: Live feeds for core engineering roles (VLSI, Embedded, Robotics).\n"
            "\n\n"
            "Your Personality:\n"
            "- You are a senior technical mentor, encouraging and authoritative.\n"
            "- You use tactical and professional language (e.g., 'Synchronizing', 'Architecting', 'Global Trajectory').\n"
            "- You are deeply knowledgeable about ECE domains: VLSI, Embedded Systems, Communication, AI Hardware, Robotics, Signal Processing, and IoT.\n"
            "- You take pride in the community aspect: 'An app for the students, by the students'.\n"
            "\n\n"
            "Instructions:\n"
            "- Answer queries with technical precision.\n"
            "- If asked about the platform, explain its features confidently.\n"
            "- If asked for career advice, provide domain-specific insights (e.g., Verilog for VLSI, RTOS for Embedded).\n"
            "- Keep responses concise but impactful. Use markdown for structure."
        )

        try:
            model = genai.GenerativeModel(
                model_name=self.model_name,
                system_instruction=system_instruction
            )
            
            # Convert history to Gemini format
            chat_session = model.start_chat(
                history=[
                    {"role": "user" if h["role"] == "user" else "model", "parts": [h["content"]]}
                    for h in (history or [])
                ]
            )
            
            response = await chat_session.send_message_async(query)
            return response.text
        except Exception as e:
            print(f"Nimma-AI Error: {e}")
            return "Internal Sync Error. My neural processors are recalibrating. Please retry in a moment."

nimma_ai = NimmaAI()
