# 🚀 Render Deployment Guide - Environment Variables

## Overview

When deploying to Render, you need to set environment variables for:
- **Backend API** (Python/FastAPI) - Port 8001
- **Frontend** (Next.js) - Port 3000
- **Optional:** OpenAI API key for premium chatbot features

---

## 🔧 Backend Environment Variables

### For Render Backend Service

1. **Go to Render Dashboard:** https://dashboard.render.com
2. **Select your Backend Web Service**
3. **Go to Settings → Environment**
4. **Add these environment variables:**

| Variable | Value | Required | Notes |
|----------|-------|----------|-------|
| `OLLAMA_HOST` | `http://localhost:11434` | No* | Local Ollama (Render doesn't support) |
| `OLLAMA_MODEL` | `llama3.1:8b` | No* | LLaMA model name |
| `OPENAI_API_KEY` | `sk-proj-xxxxx...` | No** | Your OpenAI secret key |
| `OPENAI_MODEL` | `gpt-4o` | No** | GPT model to use |
| `PYTHON_VERSION` | `3.10` | No | Python version |
| `PYTHONUNBUFFERED` | `1` | No | Show Python logs in real-time |

**Note:**
- `*` Ollama won't work on Render (no local execution). Use OpenAI instead.
- `**` Either OpenAI OR Ollama needed for AI features. Render requires OpenAI.

---

## 📦 Backend Setup on Render

### Step 1: Create Backend Service

1. Go to: https://dashboard.render.com/
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repo
4. Select branch: `main`
5. Fill in:
   - **Name:** `resume-ats-backend`
   - **Environment:** `Python`
   - **Build Command:** `pip install --no-cache-dir -r backend/requirements-render.txt`
   - **Start Command:** `cd backend && uvicorn app.main:app --host 0.0.0.0 --port 10000`
   - **Python Version:** Make sure it's set to `3.10` (NOT 3.11+)

### Step 2: Add Environment Variables

Before deploying, click **"Advanced"** → **"Add Environment Variable"**

Add these (required for Render):

```
OPENAI_API_KEY=sk-proj-your-actual-key-here
OPENAI_MODEL=gpt-4o
PYTHONUNBUFFERED=1
```

### Step 3: Deploy

Click **"Create Web Service"** and wait for deployment to complete.

---

## 🎨 Frontend Environment Variables

### For Render Frontend Service (Next.js)

1. **Go to Render Dashboard**
2. **Create new Static Site** (or Web Service if using Node)
3. **For Next.js, use Web Service:**
   - **Environment:** `Node`
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`

### Add Environment Variables for Frontend:

| Variable | Value | Notes |
|----------|-------|-------|
| `NEXT_PUBLIC_API_URL` | `https://resume-ats-backend.onrender.com` | Your backend URL |
| `NODE_ENV` | `production` | Production mode |

**Important:** Use `NEXT_PUBLIC_` prefix for frontend-accessible variables!

---

## 📝 Complete Backend Configuration Example

**On Render Dashboard → Environment:**

```
OPENAI_API_KEY=sk-proj-abc123def456ghi789jkl012
OPENAI_MODEL=gpt-4o
PYTHONUNBUFFERED=1
PYTHON_VERSION=3.10
```

---

## 🔗 Backend API URL on Render

After deployment, your backend URL will be:
```
https://resume-ats-backend.onrender.com
```

Use this in your frontend's `.env.local`:
```
NEXT_PUBLIC_API_URL=https://resume-ats-backend.onrender.com
```

---

## 🛠️ Local Development (.env File)

**For local testing, create `backend/.env`:**

```bash
# For local development (uses Ollama)
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b

# Optional: Override with OpenAI locally
# OPENAI_API_KEY=sk-proj-xxxxx
# OPENAI_MODEL=gpt-4o
```

**For local Next.js, create `frontend/.env.local`:**

```bash
NEXT_PUBLIC_API_URL=http://localhost:8001
```

---

## 📋 Environment Variables Summary

### Backend (Required on Render)
```
OPENAI_API_KEY=sk-proj-your-key
OPENAI_MODEL=gpt-4o
PYTHONUNBUFFERED=1
```

### Frontend (Required on Render)
```
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NODE_ENV=production
```

### Local Only (Not on Render)
```
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

---

## ✅ Deployment Checklist

- [ ] Backend `.env` or Render environment variables set with `OPENAI_API_KEY`
- [ ] Frontend environment has `NEXT_PUBLIC_API_URL` pointing to backend
- [ ] Backend `render.yaml` configured (see below)
- [ ] Frontend pointing to correct backend API
- [ ] Test API endpoint: `https://your-backend.onrender.com/docs`
- [ ] Test chatbot at: `https://your-frontend.onrender.com`

---

## 📄 render.yaml (Backend Configuration)

Create `backend/render.yaml`:

```yaml
services:
  - type: web
    name: resume-ats-backend
    env: python
    plan: free
    buildCommand: pip install -r requirements.txt
    startCommand: uvicorn app.main:app --host 0.0.0.0 --port 8001
    envVars:
      - key: OPENAI_API_KEY
        sync: false
      - key: OPENAI_MODEL
        value: gpt-4o
      - key: PYTHONUNBUFFERED
        value: 1
```

---

## 🔐 Security Tips

✅ **DO:**
- Use `OPENAI_API_KEY` as secret in Render (not in code)
- Regenerate API keys if accidentally exposed
- Use different keys for dev/prod

❌ **DON'T:**
- Commit `.env` to GitHub
- Share API keys in chat/email
- Use same key across multiple projects

---

## 🚨 Common Issues

### Issue: "pydantic-core" compilation error (maturin failed)

**Error:** `Read-only file system` + `maturin pep517` + `Cargo metadata failed`

**Root Cause:** pydantic-core needs Rust compilation, which fails on Render's filesystem.

**Solution (Choose One):**

**Option 1: Use Ultra-Minimal Requirements (RECOMMENDED)**
1. On Render Dashboard → Your service → Settings
2. Change Build Command to:
   ```
   pip install --no-cache-dir -r backend/requirements-render-minimal.txt
   ```
3. Save and **Redeploy**
4. This installs only: fastapi, uvicorn, httpx, python-dotenv
5. All AI features still work!

**Option 2: Force Older Python Package**
1. Change Build Command to:
   ```
   pip install --upgrade pip && pip install --no-cache-dir --no-binary pydantic -r backend/requirements-render.txt
   ```
2. Save and **Redeploy**

**Option 3: Use Pre-built Wheels Only**
1. Change Build Command to:
   ```
   pip install --only-binary :all: -r backend/requirements-render.txt
   ```
2. Save and **Redeploy**

**Step-by-Step Fix:**
1. Go to: https://dashboard.render.com
2. Click your `resume-ats-backend` service
3. Click **Settings** tab
4. Scroll down to **Build Command**
5. Replace with: `pip install --no-cache-dir -r backend/requirements-render-minimal.txt`
6. Click **Save**
7. Scroll to top → Click **Manual Deploy** → **Deploy latest commit**
8. Wait 2-3 minutes for build to complete

### Issue: "Internal Server Error" on Render

**Check:**
1. Environment variables are set correctly
2. `OPENAI_API_KEY` is not empty
3. Backend logs: Render Dashboard → Logs

### Issue: Frontend can't reach Backend

**Fix:**
1. Set `NEXT_PUBLIC_API_URL` to correct backend URL
2. Verify backend is running: `https://backend-url.onrender.com/docs`
3. Check CORS is enabled (it is by default)

### Issue: OpenAI API Errors

**Check:**
1. API key is valid and active
2. Key has credit/quota available
3. Monitor usage: https://platform.openai.com/account/billing/usage

---

## 🆘 Render Environment Variables Interface

1. Go to: **https://dashboard.render.com**
2. Select your service
3. Click: **Settings**
4. Scroll to: **Environment**
5. Click: **Add Environment Variable**
6. Fill in Key and Value
7. Click: **Save**

---

## 📚 Resources

- **Render Docs:** https://render.com/docs
- **Environment Variables:** https://render.com/docs/environment-variables
- **Python on Render:** https://render.com/docs/deploy-python
- **Next.js on Render:** https://render.com/docs/deploy-nextjs

---

## 💡 Quick Start for Render

```bash
# 1. Backend environment on Render:
OPENAI_API_KEY=sk-proj-your-key
OPENAI_MODEL=gpt-4o
PYTHONUNBUFFERED=1

# 2. Frontend environment on Render:
NEXT_PUBLIC_API_URL=https://your-backend.onrender.com
NODE_ENV=production

# 3. Backend command:
uvicorn app.main:app --host 0.0.0.0 --port 8001

# 4. Frontend build command:
npm run build && npm start
```

---

**Status:** ✅ Ready for Render Deployment  
**Last Updated:** May 1, 2026
