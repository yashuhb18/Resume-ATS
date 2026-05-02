from sqlalchemy.orm import Session
from app.models.intelligence import MarketTrend, NewsArticle, JobPost
from datetime import datetime, timedelta
import google.generativeai as genai
from typing import List, Dict, Any

class TrendAnalyticsEngine:
    def __init__(self):
        self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')

    async def analyze_market_trends(self, db: Session):
        """Analyze existing news and jobs to generate trend data points."""
        # Fetch recent news and jobs for context
        news = db.query(NewsArticle).limit(50).all()
        jobs = db.query(JobPost).limit(50).all()
        
        context = f"""
        Recent Industry Intelligence:
        {[{'t': n.title, 'c': n.category} for n in news]}
        
        Recent Hiring Data:
        {[{'t': j.title, 'd': j.domain} for j in jobs]}
        """
        
        prompt = f"""
        Based on the industry intelligence and hiring data below, analyze the current ECE market trends.
        
        Context:
        {context}
        
        Task:
        For each domain (VLSI, Embedded Systems, IoT, AI Hardware, Robotics, Wireless), provide:
        1. A 'hiring_volume' score (0-100).
        2. A 'sentiment_score' (0-100) based on news updates.
        3. A 'growth_index' (0-100).
        
        Return ONLY a JSON object:
        {{
            "VLSI": {{"hiring_volume": 0, "sentiment_score": 0, "growth_index": 0}},
            ...
        }}
        """
        
        try:
            response = await self.gemini_model.generate_content_async(prompt)
            import json
            text = response.text.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            trends = json.loads(text)
            
            # Save to DB
            for domain, metrics in trends.items():
                for m_type, val in metrics.items():
                    new_trend = MarketTrend(
                        domain=domain,
                        metric_type=m_type,
                        metric_value=float(val),
                        date_recorded=datetime.utcnow()
                    )
                    db.add(new_trend)
            db.commit()
        except Exception as e:
            print(f"Error analyzing trends: {e}")

trend_engine = TrendAnalyticsEngine()
