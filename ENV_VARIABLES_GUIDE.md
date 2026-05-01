# Environment Variables Quick Reference

## Railway Backend

Set these in your Railway backend service:

```text
OPENAI_API_KEY=sk-proj-your-actual-key
OPENAI_MODEL=gpt-4o
PYTHONUNBUFFERED=1
```

Your current backend URL is:

```text
https://resume-ats-backend-production.up.railway.app
```

Health check:

```text
https://resume-ats-backend-production.up.railway.app/health
```

## Vercel Frontend

Set the Vercel project root directory to:

```text
frontend
```

Set these in Vercel project environment variables:

```text
BACKEND_URL=https://resume-ats-backend-production.up.railway.app
NEXT_PUBLIC_API_URL=
NODE_ENV=production
```

Leave `NEXT_PUBLIC_API_URL` empty unless you intentionally want browser requests to call Railway directly. With it empty, Vercel uses `/api` and `/health` rewrites.

## Local Development

Backend:

```text
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
# OPENAI_API_KEY=sk-proj-your-key
# OPENAI_MODEL=gpt-4o
```

Frontend `frontend/.env.local`:

```text
BACKEND_URL=http://localhost:8001
NEXT_PUBLIC_API_URL=
```

## Test URLs

After deploy, confirm these:

```text
https://resume-ats-backend-production.up.railway.app/health
https://your-vercel-domain.vercel.app/health
https://your-vercel-domain.vercel.app/api/analyze
```

`/api/analyze` should return a `422` missing file error when opened without a file. That is correct because it proves Vercel is reaching the backend route.
