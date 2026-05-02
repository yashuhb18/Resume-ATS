import httpx
import os
from sqlalchemy.orm import Session
from app.models.intelligence import JobPost
from datetime import datetime
from typing import List, Dict, Any
import google.generativeai as genai

class JobIntelligenceEngine:
    def __init__(self):
        self.adzuna_app_id = os.getenv("ADZUNA_APP_ID")
        self.adzuna_app_key = os.getenv("ADZUNA_APP_KEY")
        self.gemini_model = genai.GenerativeModel('gemini-1.5-flash')

    async def sync_jobs(self, db: Session):
        """Fetch and structure jobs from multiple sources"""
        domains = ["VLSI Design", "Embedded Systems", "FPGA Engineer", "IoT Engineer", "ASIC Design", "Analog Electronics"]
        
        all_jobs = []
        for domain in domains:
            jobs = await self._fetch_from_adzuna(domain)
            all_jobs.extend(jobs)

        # Process and save
        for job in all_jobs:
            exists = db.query(JobPost).filter(JobPost.url == job["url"]).first()
            if exists:
                continue
            
            # Use AI to refine skills and categorization
            refined = await self._refine_job_with_ai(job)
            if refined:
                new_job = JobPost(
                    title=job["title"],
                    company=job.get("company"),
                    location=job.get("location"),
                    salary_range=job.get("salary"),
                    skills_required=refined["skills"],
                    tools_required=refined["tools"],
                    domain=refined["domain"],
                    url=job["url"],
                    experience_level=refined["experience_level"],
                    created_at=datetime.utcnow()
                )
                db.add(new_job)
        
        db.commit()

    async def _fetch_from_adzuna(self, query: str) -> List[Dict[str, Any]]:
        if not self.adzuna_app_id or not self.adzuna_app_key:
            return []
        
        url = f"https://api.adzuna.com/v1/api/jobs/in/search/1" # Focus on India for ECE hub
        params = {
            "app_id": self.adzuna_app_id,
            "app_key": self.adzuna_app_key,
            "what": query,
            "results_per_page": 10,
            "content-type": "application/json"
        }
        
        async with httpx.AsyncClient() as client:
            try:
                response = await client.get(url, params=params)
                if response.status_code == 200:
                    data = response.json()
                    results = []
                    for r in data.get("results", []):
                        results.append({
                            "title": r.get("title"),
                            "company": r.get("company", {}).get("display_name"),
                            "location": r.get("location", {}).get("display_name"),
                            "url": r.get("redirect_url"),
                            "description": r.get("description"),
                            "salary": f"{r.get('salary_min', '')} - {r.get('salary_max', '')}"
                        })
                    return results
            except:
                pass
        return []

    async def _refine_job_with_ai(self, job: Dict[str, Any]) -> Dict[str, Any]:
        prompt = f"""
        Analyze this job posting:
        Title: {job['title']}
        Description: {job['description']}
        
        Task:
        1. Extract top 5 technical skills required.
        2. Identify specific tools/frameworks mentioned (e.g. Vivado, Keil, Cadence).
        3. Assign to a primary ECE domain: VLSI, Embedded, IoT, Signal Processing, Robotics, Wireless.
        4. Determine required experience level: Junior, Mid, Senior, Expert.
        
        Return ONLY a JSON object:
        {{
            "skills": [...],
            "tools": [...],
            "domain": "...",
            "experience_level": "..."
        }}
        """
        try:
            response = await self.gemini_model.generate_content_async(prompt)
            import json
            text = response.text.strip()
            if "```json" in text:
                text = text.split("```json")[1].split("```")[0].strip()
            return json.loads(text)
        except:
            return None

job_engine = JobIntelligenceEngine()
