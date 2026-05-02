import feedparser
import asyncio
import httpx
from datetime import datetime
from typing import List, Dict, Any
import google.generativeai as genai
from sqlalchemy.orm import Session
from app.models.intelligence import NewsArticle
from app.services.intelligence_service import intelligence_service
import os

class AdvancedNewsEngine:
    def __init__(self):
        self.rss_feeds = [
            "https://www.eetimes.com/feed/",
            "https://www.semiconductor-digest.com/feed/",
            "https://embedded.com/feed/",
            "https://hackaday.com/blog/feed/",
            "https://rss.slashdot.org/Slashdot/slashdotMain"
        ]
        self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')

    async def fetch_and_process_news(self, db: Session):
        """Fetch news from RSS, summarize with Gemini, and save to DB."""
        articles_to_process = []
        
        for url in self.rss_feeds:
            feed = feedparser.parse(url)
            for entry in feed.entries[:5]: # Take top 5 from each feed
                articles_to_process.append({
                    "title": entry.title,
                    "link": entry.link,
                    "description": entry.summary if hasattr(entry, 'summary') else entry.title,
                    "published": entry.published if hasattr(entry, 'published') else datetime.utcnow().isoformat()
                })

        # Process batches with Gemini for categorization and summarization
        # In production, we'd do this in parallel, but let's be careful with rate limits
        for article in articles_to_process:
            # Check if exists
            exists = db.query(NewsArticle).filter(NewsArticle.url == article["link"]).first()
            if exists:
                continue

            try:
                processed = await self._summarize_with_ai(article)
                if processed:
                    new_article = NewsArticle(
                        title=article["title"],
                        summary=processed["summary"],
                        url=article["link"],
                        source=processed["source"],
                        category=processed["category"],
                        importance_score=processed["importance_score"],
                        published_at=datetime.utcnow() # Simplified
                    )
                    db.add(new_article)
            except Exception as e:
                print(f"Error processing news with AI: {e}")
        
        db.commit()

    async def _summarize_with_ai(self, article: Dict[str, Any]) -> Dict[str, Any]:
        prompt = f"""
        Analyze this engineering news article:
        Title: {article['title']}
        Snippet: {article['description']}
        
        Task:
        1. Provide a 1-sentence technical summary.
        2. Categorize it into one of: VLSI, Embedded Systems, AI Hardware, Semiconductor Industry, FPGA, Wireless Communication, Robotics.
        3. Rate its importance to an ECE student's career (0.0 to 1.0).
        4. Identify the primary source or company involved.
        
        Return ONLY a JSON object:
        {{
            "summary": "...",
            "category": "...",
            "importance_score": 0.0,
            "source": "..."
        }}
        """
        response = await self.gemini_model.generate_content_async(prompt)
        import json
        try:
            # Basic JSON extraction from markdown if necessary
            text = response.text.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            return json.loads(text)
        except:
            return None

news_engine = AdvancedNewsEngine()
