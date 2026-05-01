import requests
from datetime import datetime, timedelta
from typing import List, Dict, Any

NEWS_API_KEY = "YOUR_NEWSAPI_KEY"  # Replace with your NewsAPI key
NEWS_API_URL = "https://newsapi.org/v2/everything"

class NewsEngine:
    """
    Fetches daily news updates for a given domain using NewsAPI.
    """
    def __init__(self, api_key: str = NEWS_API_KEY):
        self.api_key = api_key

    def fetch_domain_news(self, domain_keywords: List[str], max_results: int = 5) -> List[Dict[str, Any]]:
        today = datetime.utcnow().date()
        params = {
            "q": " OR ".join(domain_keywords),
            "from": today - timedelta(days=1),
            "to": today,
            "sortBy": "publishedAt",
            "language": "en",
            "pageSize": max_results,
            "apiKey": self.api_key,
        }
        response = requests.get(NEWS_API_URL, params=params)
        if response.status_code == 200:
            articles = response.json().get("articles", [])
            return [
                {
                    "title": a["title"],
                    "url": a["url"],
                    "source": a["source"]["name"],
                    "publishedAt": a["publishedAt"],
                    "description": a["description"],
                }
                for a in articles
            ]
        else:
            return []

# Example usage:
# engine = NewsEngine()
# news = engine.fetch_domain_news(["VLSI", "Embedded Systems"])
# print(news)
