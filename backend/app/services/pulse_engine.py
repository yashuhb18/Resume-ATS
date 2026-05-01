import os
import json
from typing import Dict, Any, List
try:
    from openai import OpenAI
except ImportError:
    OpenAI = None

class PulseEngine:
    """Provides real-time industry intelligence and social pulse data."""

    def __init__(self):
        self.api_key = os.getenv("OPENAI_API_KEY")

    def get_pulse(self, domain: str) -> Dict[str, Any]:
        """Fetch the latest briefing and social hooks for a specific domain."""
        
        # 1. Generate AI Briefing
        briefing = self._generate_briefing(domain)
        
        # 2. Generate Social Media Search Hooks (Optimized for 'Recent' and 'Jobs')
        hooks = self._generate_social_hooks(domain)
        
        return {
            "domain": domain,
            "briefing": briefing,
            "social_hooks": hooks
        }

    def _generate_briefing(self, domain: str) -> str:
        """Synthesize a 2-3 sentence 'Today's Briefing' for the domain."""
        if not self.api_key or OpenAI is None:
            return f"The {domain} industry is seeing a major shift towards localized semiconductor manufacturing and AI-integrated hardware design."

        try:
            client = OpenAI(api_key=self.api_key)
            response = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[
                    {"role": "system", "content": "You are a senior tech industry analyst specializing in ECE and EEE hardware."},
                    {"role": "user", "content": f"Summarize the 3 most critical news trends happening TODAY (or very recently) in the field of {domain}. Be extremely specific and professional. Max 3 sentences."}
                ],
                max_tokens=150,
                temperature=0.8
            )
            return response.choices[0].message.content.strip()
        except Exception:
            return f"The {domain} industry is accelerating with new innovations in energy efficiency and high-speed data processing."

    def _generate_social_hooks(self, domain: str) -> List[Dict[str, str]]:
        """Generate deep-links to LinkedIn, Reddit, and Twitter with specific queries."""
        encoded_domain = domain.replace(" ", "%20")
        
        return [
            {
                "platform": "LinkedIn (Latest Jobs)",
                "type": "jobs",
                "url": f"https://www.linkedin.com/search/results/jobs/?keywords={encoded_domain}&f_TPR=r86400", # Past 24h
                "description": "Fresh roles posted in the last 24 hours."
            },
            {
                "platform": "LinkedIn (Discussions)",
                "type": "posts",
                "url": f"https://www.linkedin.com/search/results/content/?keywords={encoded_domain}%20hiring%20OR%20hiring%20announcement&f_TPR=r86400",
                "description": "Recent hiring announcements and networking posts."
            },
            {
                "platform": "Reddit",
                "type": "community",
                "url": f"https://www.reddit.com/search/?q={encoded_domain}&t=day", # Past 24h
                "description": "Trending hardware discussions from the last 24 hours."
            }
        ]

pulse_engine = PulseEngine()
