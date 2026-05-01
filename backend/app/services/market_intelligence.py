"""
Market Intelligence Service - Real-time global job and market data ingestion.
"""
import os
import httpx
from typing import List, Dict, Any, Optional

class MarketIntelligenceService:
    """Fetches real-world global job data to ground the AI in reality."""

    def __init__(self):
        # We can use Adzuna or a similar free API
        # Users can sign up for a free key at https://developer.adzuna.com/
        self.app_id = os.getenv("ADZUNA_APP_ID")
        self.app_key = os.getenv("ADZUNA_APP_KEY")
        self.base_url = "https://api.adzuna.com/v1/api/jobs/gb/search/1" # Default to GB, can be dynamic

    async def get_market_briefing(self, domain: str) -> Dict[str, Any]:
        """
        Fetches a real-time briefing of the global market for a specific domain.
        """
        if not self.app_id or not self.app_key:
            # Return high-quality mock data if keys are missing to ensure the AI still has context
            return self._get_fallback_briefing(domain)

        try:
            async with httpx.AsyncClient() as client:
                params = {
                    "app_id": self.app_id,
                    "app_key": self.app_key,
                    "what": domain,
                    "results_per_page": 5,
                    "content-type": "application/json"
                }
                response = await client.get(self.base_url, params=params)
                response.raise_for_status()
                data = response.json()
                
                jobs = []
                for result in data.get("results", []):
                    jobs.append({
                        "title": result.get("title"),
                        "company": result.get("company", {}).get("display_name"),
                        "location": result.get("location", {}).get("display_name"),
                        "salary_min": result.get("salary_min"),
                        "apply_link": result.get("redirect_url")
                    })
                
                return {
                    "live_jobs": jobs,
                    "average_salary": data.get("mean_salary", "N/A"),
                    "market_source": "Adzuna Global Feed"
                }
        except Exception as e:
            print(f"DEBUG: Market Intelligence Error: {e}")
            return self._get_fallback_briefing(domain)

    def _get_fallback_briefing(self, domain: str) -> Dict[str, Any]:
        """High-quality synthetic briefing when API is offline."""
        return {
            "live_jobs": [
                {"title": f"Senior {domain}", "company": "Global Tech Leader", "location": "Remote", "apply_link": "https://www.linkedin.com/jobs"},
                {"title": f"Staff {domain}", "company": "Innovation Labs", "location": "Global", "apply_link": "https://www.indeed.com"}
            ],
            "average_salary": "6-Figure Competitive",
            "market_source": "Neural Simulation (API Keys Missing)"
        }

market_intelligence = MarketIntelligenceService()
