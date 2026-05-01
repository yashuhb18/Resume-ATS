# Deployment Guide

## Current Production URLs

Backend:

```text
https://resume-ats-backend-production.up.railway.app
```

Frontend:

```text
https://resume-ats-mu.vercel.app
```

## Railway Backend

Use the backend service already deployed on Railway.

Required environment variables:

```text
OPENAI_API_KEY=sk-proj-your-actual-key
OPENAI_MODEL=gpt-4o
PYTHONUNBUFFERED=1
```

Health check:

```text
https://resume-ats-backend-production.up.railway.app/health
```

Expected response:

```json
{"status":"healthy"}
```

## Vercel Frontend

Project root:

```text
frontend
```

Environment variables:

```text
BACKEND_URL=https://resume-ats-backend-production.up.railway.app
NEXT_PUBLIC_API_URL=
NODE_ENV=production
```

The frontend is configured to call same-origin routes such as `/api/analyze`, `/api/compare`, `/api/download-report`, `/api/interview-chat`, and `/api/health`. Vercel rewrites those requests to Railway.

## Step-by-Step Deploy

1. Push latest `main` to GitHub.
2. Redeploy the Railway backend from latest `main`, or confirm the current Railway backend is healthy.
3. In Vercel, open the frontend project settings.
4. Confirm the root directory is `frontend`.
5. Set `BACKEND_URL` to `https://resume-ats-backend-production.up.railway.app`.
6. Keep `NEXT_PUBLIC_API_URL` empty.
7. Redeploy Vercel from latest `main`.
8. Visit `https://resume-ats-mu.vercel.app/api/health`.
9. Upload a PDF or DOCX resume from the site and confirm analysis completes.
10. Test resume-vs-JD compare, report download, and interview chat.

## Expected Route Tests

```text
https://resume-ats-backend-production.up.railway.app/health
https://resume-ats-mu.vercel.app/api/health
https://resume-ats-mu.vercel.app/api/analyze
```

`/api/analyze` without a file should return `422` with `Field required`. That is a good sign: it means the frontend route is reaching the backend.
