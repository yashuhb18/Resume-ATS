import google.generativeai as genai
from typing import List, Dict, Any, Optional
from sqlalchemy.orm import Session
from app.models.intelligence import NewsArticle, MarketTrend, JobPost
import os

class AIMentorSystem:
    def __init__(self):
        self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')

    async def get_guidance(self, db: Session, user_query: str, resume_context: Optional[str] = None) -> Dict[str, Any]:
        """Provide personalized ECE career guidance based on market intelligence."""
        # Fetch Matrix Context
        news = db.query(NewsArticle).order_by(NewsArticle.importance_score.desc()).limit(5).all()
        jobs = db.query(JobPost).limit(5).all()
        
        matrix_context = f"""
        Current Market Intel:
        - News: {[n.title for n in news]}
        - Top Job Roles: {[j.title for j in jobs]}
        """
        
        system_prompt = f"""
        You are the 'Nimma-Mitra AI Mentor', a world-class ECE career strategist and technical expert.
        Your goal is to provide elite, non-generic advice for Electronics & Communication Engineering.
        
        Matrix Intelligence:
        {matrix_context}
        
        User Context:
        {resume_context if resume_context else "No resume provided yet."}
        
        Instructions:
        1. Be technical, tactical, and encouraging.
        2. Reference specific ECE domains (VLSI, Embedded, IoT, etc.) where relevant.
        3. Use the Matrix Intelligence to back up your advice with real-world trends.
        4. If asked about a roadmap, provide a brief 3-step action plan.
        """
        
        messages = [
            {"role": "user", "parts": [f"{system_prompt}\n\nUser Question: {user_query}"]}
        ]
        
        response = await self.gemini_model.generate_content_async(messages)
        
        return {
            "answer": response.text,
            "suggested_questions": [
                "How do I break into VLSI as a fresher?",
                "What are the top 3 tools for Embedded Systems in 2026?",
                "Is AI hardware a good field for ECE students?",
                "Review my resume for Qualcomm-level roles."
            ]
        }

ai_mentor = AIMentorSystem()
