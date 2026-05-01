"""
Roadmap Chat Service - Conversations about the generated roadmap using Gemini.
"""
import os
import google.generativeai as genai
from typing import List, Dict, Any, Optional

class RoadmapChatService:
    """Provides conversational access to Gemini for roadmap-specific advice."""

    def __init__(self):
        self.api_key = os.getenv("GEMINI_API_KEY")
        if self.api_key:
            genai.configure(api_key=self.api_key)

    async def chat(self, query: str, context: Dict[str, Any], history: List[Dict[str, str]] = []) -> str:
        """
        Consult Gemini about the specific roadmap context.
        """
        if not self.api_key:
            return "Intelligence Offline: Gemini API Key missing."

        try:
            model = genai.GenerativeModel('gemini-flash-latest')
            
            # Construct a rich prompt with roadmap context
            system_context = f"""
            You are the 'Roadmap Oracle' within the ResQ Galactic Career Command Center.
            The user is looking at their generated career roadmap for the domain: {context.get('domain', 'Professional')}.
            
            Roadmap Briefing:
            {context.get('role_suitability', '')}
            
            Recent Job Openings:
            {', '.join([j.get('title', '') for j in context.get('job_openings', [])[:3]])}
            
            Your goal is to provide elite, accurate, and highly specific career advice. 
            Keep responses punchy, professional, and insightful.
            """
            
            full_query = f"{system_context}\n\nUser Question: {query}"
            
            # Simplified chat for now, can be expanded with real history
            response = model.generate_content(full_query)
            return response.text.strip()
            
        except Exception as e:
            print(f"DEBUG: Roadmap Oracle Error: {e}")
            return f"Quantum Interference: {str(e)}"

roadmap_chat_service = RoadmapChatService()
