# Chatbot Improvements Summary

## Current Behavior

The chatbot now uses this provider order:

1. OpenAI premium model: `gpt-5.2-chat-latest`
2. Strong local Ollama fallback: `llama3.1:8b`
3. Minimal local fallback only when no AI provider is configured

This removes the tiny local model from the default path. For the least scripted behavior, add `OPENAI_API_KEY` in `backend/.env`.

## What Changed

- OpenAI is tried before Ollama.
- The old tiny local model default was removed.
- The prompt now asks for grounded HR/interviewer behavior using resume, JD, ATS, skills, layout, and evidence signals.
- The setup guide was updated for `gpt-5.2-chat-latest`.
- Result-page recommendations are now resume-specific instead of common Software / IT keyword lists.

## Environment

```env
OPENAI_API_KEY=sk-your-key-here
OPENAI_MODEL=gpt-5.2-chat-latest
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

Ollama is optional. OpenAI is preferred when configured.

## Backend Command

```powershell
cd backend
..\venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8001
```
