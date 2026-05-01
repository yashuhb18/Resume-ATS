"""
Roadmap Generator Service - Universal Global Intelligence Engine v5.0 (Dual-Model Architecture).
"""
import os
import json
import httpx
import asyncio
from typing import List, Dict, Any, Optional
from app.models.schemas import RoadmapResponse, RoadmapStep, ProjectDetail, JobOpening
from app.services.roadmap_data import DOMAIN_ROADMAPS, GENERIC_ROADMAP
from app.services.market_intelligence import market_intelligence

try:
    import google.generativeai as genai
except ImportError:
    genai = None

class RoadmapGenerator:
    """Supreme Career Architect utilizing Dual-Model Neural Logic and Real-Time Market Grounding."""

    def __init__(self):
        self.gemini_key = os.getenv("GEMINI_API_KEY")
        if self.gemini_key and genai:
            genai.configure(api_key=self.gemini_key)
        
        # Primary Architect: Gemini 2.5 Pro (Deep Reasoning)
        # High-Speed Scanner: Gemini Flash (Classification)
        self.architect_model = "gemini-2.5-pro"
        self.scanner_model = "gemini-flash-latest"

    async def generate_async(self, domain: Optional[str] = None, resume_text: Optional[str] = None) -> Dict[str, Any]:
        """
        Asynchronously generates a high-fidelity roadmap grounded in real-world market data.
        """
        print(f"DEBUG: Starting Neural Generation. Domain: {domain}, Resume: {bool(resume_text)}")
        
        # Phase 1: High-Speed DNA Scan (Identify Domain)
        identified_domain = domain
        if not identified_domain and resume_text:
            identified_domain = await self._scan_domain(resume_text)
            print(f"DEBUG: Neural Scan Locked Domain: {identified_domain}")
        
        # Phase 2: Market Intelligence Sync (Concurrent)
        market_briefing = await market_intelligence.get_market_briefing(identified_domain or "Universal Professional")
        
        # Phase 3: Supreme Architecture (Generate Roadmap)
        input_context = f"Domain: {identified_domain}" if not resume_text else f"Resume DNA: {resume_text[:4000]}"
        
        prompt = f"""
        You are the 'Supreme Career Architect' at the ResQ Galactic Intelligence Center.
        Task: Design a 100% UNIQUE, high-fidelity career matrix grounded in REAL-WORLD global data.
        
        RECOVERY CONTEXT:
        {input_context}

        LIVE MARKET DATA (GROUND TRUTH):
        {json.dumps(market_briefing, indent=2)}

        CRITICAL ARCHITECTURE RULES:
        1. GROUNDING: You MUST incorporate the real job titles and companies from the LIVE MARKET DATA.
        2. BRAIN: Design 15 steps (5 Beginner, 5 Intermediate, 5 Advanced) that are 100% specific to the candidate's DNA and the current market reality.
        3. INNOVATION: Create projects that combine their existing stack with trending technologies mentioned in the market briefing.
        4. GITHUB: Provide specific, valid GitHub search URLs for niche implementations.

        Return a RAW JSON object matching the ResQ schema. NO MARKDOWN.
        """

        roadmap_data = await self._generate_with_gemini(prompt, self.architect_model)
        
        if not roadmap_data:
            print("DEBUG: Architect Model Failed. Falling back to High-Speed Scanner.")
            roadmap_data = await self._generate_with_gemini(prompt, self.scanner_model)
            
        if not roadmap_data:
            print("DEBUG: AI Models Failed. Falling back to Global Intelligence Fallback.")
            roadmap_data = DOMAIN_ROADMAPS.get(identified_domain, GENERIC_ROADMAP)

        # Post-Processing: Inject Live Jobs if missing
        if "job_openings" not in roadmap_data or not roadmap_data["job_openings"]:
            roadmap_data["job_openings"] = market_briefing["live_jobs"]
        
        roadmap_data["domain"] = identified_domain or roadmap_data.get("domain", "Universal Professional")
        
        return roadmap_data

    def generate(self, domain: Optional[str] = None, resume_text: Optional[str] = None) -> Dict[str, Any]:
        """Synchronous wrapper for legacy support."""
        return asyncio.run(self.generate_async(domain, resume_text))

    async def _scan_domain(self, text: str) -> str:
        """Uses a fast model to identify the professional niche."""
        prompt = f"Analyze this resume text and return ONLY the specific professional domain title (e.g. 'Senior Cloud Security Architect'). Resume: {text[:2000]}"
        try:
            model = genai.GenerativeModel(self.scanner_model)
            response = await model.generate_content_async(prompt)
            return response.text.strip()
        except:
            return "Professional"

    async def _generate_with_gemini(self, prompt: str, model_name: str) -> Optional[Dict[str, Any]]:
        if not self.gemini_key or not genai:
            return None
        try:
            model = genai.GenerativeModel(model_name)
            response = await model.generate_content_async(prompt)
            content = response.text.strip()
            if "```json" in content:
                content = content.split("```json")[1].split("```")[0].strip()
            elif "```" in content:
                content = content.split("```")[1].split("```")[0].strip()
            return json.loads(content)
        except Exception as e:
            print(f"DEBUG: Gemini ({model_name}) Error: {e}")
            return None

roadmap_generator = RoadmapGenerator()
