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

try:
    from openai import AsyncOpenAI
except ImportError:
    AsyncOpenAI = None


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
        1. GROUNDING: You MUST incorporate real job titles and companies from the LIVE MARKET DATA.
        2. BRAIN: Design exactly 6 steps total (2 Beginner, 2 Intermediate, 2 Advanced) that are 100% specific to the candidate.
        3. INNOVATION: Create projects that combine their existing stack with trending technologies.
        4. GITHUB: Provide specific, valid GitHub search URLs for niche implementations.

        Return a RAW JSON object. NO MARKDOWN. NO BACKTICKS. NO CODE BLOCKS.
        Must match this exactly:
        {{
            "domain": "{identified_domain or 'Professional'}",
            "role_suitability": "Short paragraph explaining fit.",
            "news_headline": "A catchy market headline based on LIVE DATA.",
            "beginner_steps": [
                {{"title": "...", "description": "...", "key_skills": ["...", "..."], "course_link": "https://...", "youtube_link": "https://...", "projects": [{{"title": "...", "github_repo": "https://..."}}]}}
            ],
            "intermediate_steps": [... same format ...],
            "advanced_steps": [... same format ...]
        }}
        """

        roadmap_data = None
        
        # 1. Try Groq / OpenAI
        roadmap_data = await self._generate_with_openai(prompt)

        # 2. Try Gemini
        if not roadmap_data:
            roadmap_data = await self._generate_with_gemini(prompt, self.architect_model)
            if not roadmap_data:
                print("DEBUG: Architect Model Failed. Falling back to High-Speed Scanner.")
                roadmap_data = await self._generate_with_gemini(prompt, self.scanner_model)
                
        # 3. Try Ollama (Local)
        if not roadmap_data:
            print("DEBUG: Cloud Models Failed or Not Configured. Falling back to Ollama.")
            roadmap_data = await self._generate_with_ollama(prompt)
            
        # 4. Total Failure Fallback
        if not roadmap_data:
            print("DEBUG: All AI Models Failed. Falling back to Global Intelligence Fallback.")
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
        prompt = f"Analyze this resume text and return ONLY the specific professional domain title (e.g. 'Senior Cloud Security Architect', 'Data Scientist'). Resume: {text[:2000]}"
        
        # Try OpenAI
        api_key = os.getenv("OPENAI_API_KEY") or os.getenv("GROQ_API_KEY")
        if api_key and AsyncOpenAI:
            try:
                base_url = "https://api.groq.com/openai/v1" if os.getenv("GROQ_API_KEY") else None
                client = AsyncOpenAI(api_key=api_key, base_url=base_url)
                model = os.getenv("OPENAI_MODEL") or ("llama3-70b-8192" if base_url else "gpt-4o-mini")
                response = await client.chat.completions.create(
                    model=model,
                    messages=[{"role": "user", "content": prompt}],
                    max_tokens=30,
                    temperature=0.3
                )
                return response.choices[0].message.content.strip()
            except: pass
            
        # Try Gemini
        if self.gemini_key and genai:
            try:
                model = genai.GenerativeModel(self.scanner_model)
                response = await model.generate_content_async(prompt)
                return response.text.strip()
            except: pass
            
        # Try Ollama
        ollama_host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        ollama_model = os.getenv("OLLAMA_MODEL", "llama3.1:8b")
        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(
                    f"{ollama_host}/api/generate",
                    json={
                        "model": ollama_model,
                        "prompt": prompt,
                        "stream": False,
                        "options": {"temperature": 0.3, "num_predict": 30}
                    }
                )
                if response.status_code == 200:
                    return response.json().get("response", "").strip()
        except: pass
            
        return "Professional"

    async def _generate_with_openai(self, prompt: str) -> Optional[Dict[str, Any]]:
        api_key = os.getenv("OPENAI_API_KEY") or os.getenv("GROQ_API_KEY")
        if not api_key or not AsyncOpenAI:
            return None
        try:
            base_url = "https://api.groq.com/openai/v1" if os.getenv("GROQ_API_KEY") else None
            client = AsyncOpenAI(api_key=api_key, base_url=base_url)
            model = os.getenv("OPENAI_MODEL") or ("llama3-70b-8192" if base_url else "gpt-4o-mini")
            
            response = await client.chat.completions.create(
                model=model,
                messages=[{"role": "user", "content": prompt}],
                max_tokens=2500,
                temperature=0.4,
                response_format={"type": "json_object"}
            )
            return self._parse_json(response.choices[0].message.content)
        except Exception as e:
            print(f"DEBUG: OpenAI/Groq Error: {e}")
            return None

    async def _generate_with_gemini(self, prompt: str, model_name: str) -> Optional[Dict[str, Any]]:
        if not self.gemini_key or not genai:
            return None
        try:
            model = genai.GenerativeModel(model_name)
            response = await model.generate_content_async(prompt)
            return self._parse_json(response.text)
        except Exception as e:
            print(f"DEBUG: Gemini ({model_name}) Error: {e}")
            return None

    async def _generate_with_ollama(self, prompt: str) -> Optional[Dict[str, Any]]:
        ollama_host = os.getenv("OLLAMA_HOST", "http://localhost:11434")
        ollama_model = os.getenv("OLLAMA_MODEL", "llama3.1:8b")
        try:
            async with httpx.AsyncClient(timeout=180.0) as client:
                response = await client.post(
                    f"{ollama_host}/api/generate",
                    json={
                        "model": ollama_model,
                        "prompt": prompt,
                        "stream": False,
                        "format": "json",
                        "options": {
                            "temperature": 0.4,
                            "num_predict": 2500,
                            "num_ctx": 4096
                        }
                    }
                )
                if response.status_code == 200:
                    return self._parse_json(response.json().get("response", ""))
        except Exception as e:
            print(f"DEBUG: Ollama Error: {e}")
        return None

    def _parse_json(self, content: str) -> Dict[str, Any]:
        """Safely extract and parse JSON from text, handling markdown artifacts."""
        content = content.strip()
        try:
            # Try to parse directly first
            return json.loads(content)
        except json.JSONDecodeError:
            pass
            
        import re
        # Try to find JSON object within text
        match = re.search(r'\{[\s\S]*\}', content)
        if match:
            try:
                cleaned = match.group(0)
                # Fix common trailing commas before closing brackets
                cleaned = re.sub(r',\s*\}', '}', cleaned)
                cleaned = re.sub(r',\s*\]', ']', cleaned)
                return json.loads(cleaned)
            except Exception as e:
                print(f"DEBUG: Regex JSON parse failed: {e}")
                
        raise ValueError("Could not extract valid JSON from LLM response.")

roadmap_generator = RoadmapGenerator()
