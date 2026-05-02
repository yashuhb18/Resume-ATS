import asyncio
import os
import sys
import httpx

async def test():
    prompt = """
        You are the 'Supreme Career Architect' at the ResQ Galactic Intelligence Center.
        Task: Design a 100% UNIQUE, high-fidelity career matrix grounded in REAL-WORLD global data.
        
        RECOVERY CONTEXT:
        Domain: Data Analytics

        CRITICAL ARCHITECTURE RULES:
        1. GROUNDING: You MUST incorporate real job titles and companies.
        2. BRAIN: Design exactly 3 steps total (1 Beginner, 1 Intermediate, 1 Advanced) to keep the JSON concise.
        3. INNOVATION: Create projects that combine their existing stack with trending technologies.
        4. GITHUB: Provide specific, valid GitHub search URLs for niche implementations.

        Return a RAW JSON object. NO MARKDOWN. NO BACKTICKS. NO CODE BLOCKS.
        Must match this exactly:
        {
            "domain": "Data Analytics",
            "role_suitability": "Short paragraph explaining fit.",
            "news_headline": "A catchy market headline based on LIVE DATA.",
            "beginner_steps": [
                {"title": "...", "description": "...", "key_skills": ["...", "..."], "course_link": "https://...", "youtube_link": "https://...", "projects": [{"title": "...", "github_repo": "https://..."}]}
            ],
            "intermediate_steps": [ {"title": "...", "description": "...", "key_skills": ["...", "..."], "course_link": "https://...", "youtube_link": "https://...", "projects": [{"title": "...", "github_repo": "https://..."}]} ],
            "advanced_steps": [ {"title": "...", "description": "...", "key_skills": ["...", "..."], "course_link": "https://...", "youtube_link": "https://...", "projects": [{"title": "...", "github_repo": "https://..."}]} ]
        }
        """
    print('Sending prompt to Ollama...')
    try:
        async with httpx.AsyncClient(timeout=180.0) as client:
            response = await client.post(
                'http://localhost:11434/api/generate',
                json={
                    'model': 'llama3.1:8b',
                    'prompt': prompt,
                    'stream': False,
                    'format': 'json',
                    'options': {
                        'temperature': 0.4,
                        'num_predict': 1000,
                        'num_ctx': 2048
                    }
                }
            )
            print('Status code:', response.status_code)
            if response.status_code == 200:
                print('RAW RESPONSE:')
                print(response.json().get('response', ''))
            else:
                print('FAILED HTTP CALL', response.text)
    except Exception as e:
        print("ERROR:", e)

asyncio.run(test())
