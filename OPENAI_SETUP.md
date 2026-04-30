# OpenAI Setup Guide for ResQ

## Why This Matters

The chatbot now prefers a premium OpenAI model first. If `OPENAI_API_KEY` is missing, ResQ falls back to local/offline logic so the app does not break, but the chat will feel less natural.

Current default model:

```env
OPENAI_MODEL=gpt-5.2-chat-latest
```

OpenAI's current model docs list GPT-5.2 as the latest high-capability family, and the latest-model guide names `gpt-5.2-chat-latest` as the ChatGPT-style model.

## Local Setup

Create or update `backend/.env`:

```env
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-5.2-chat-latest
```

Then restart the backend:

```powershell
cd backend
..\venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8001
```

## Optional Offline Fallback

If you want a local Ollama fallback, use a stronger model instead of tiny models:

```powershell
ollama pull llama3.1:8b
```

Then add:

```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

The app order is:

1. OpenAI premium model
2. Strong Ollama local fallback
3. Minimal local fallback so the endpoint never crashes

## Quick Test

After starting backend, open:

```text
http://localhost:8001/health
```

Then use the frontend chatbot and ask:

```text
Act as HR. Would you shortlist me for this role?
```

If the answer still feels scripted, check that `backend/.env` exists and the backend terminal does not show an OpenAI fallback error.
