# Environment Variables Quick Reference

## 🚀 Render Deployment Checklist

### Step 1: Backend Service (Render)

**Name:** `resume-ats-backend`  
**Environment:** Python  
**Build Command:** `pip install --upgrade pip setuptools wheel && pip install -r backend/requirements-render.txt`  
**Start Command:** `cd backend && uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-10000}`

**Add these Environment Variables:**
```
OPENAI_API_KEY=sk-proj-your-actual-key
OPENAI_MODEL=gpt-4o
PYTHONUNBUFFERED=1
```

### Step 2: Frontend Service (Render)

**Name:** `resume-ats-frontend`  
**Environment:** Node  
**Build Command:** `npm install && npm run build`  
**Start Command:** `npm start`

**Add these Environment Variables:**
```
BACKEND_URL=https://your-render-backend.onrender.com
# Optional: set this only if you want the browser to call Render directly.
# When empty, the frontend uses same-origin /api and /health rewrites.
NEXT_PUBLIC_API_URL=
NODE_ENV=production
```

---

## 📋 Environment Variables Explained

| Variable | Where | Value | Purpose |
|----------|-------|-------|---------|
| `OPENAI_API_KEY` | Backend (Render) | `sk-proj-...` | OpenAI API authentication |
| `OPENAI_MODEL` | Backend (Render) | `gpt-4o` | Which AI model to use |
| `BACKEND_URL` | Frontend (Vercel) | Backend URL | Where Next.js rewrites `/api` and `/health` |
| `NEXT_PUBLIC_API_URL` | Frontend (optional) | Backend URL or empty | Browser-side direct backend URL; empty uses rewrites |
| `NODE_ENV` | Frontend (Render) | `production` | Run in production mode |
| `PYTHONUNBUFFERED` | Backend (Render) | `1` | Show logs in real-time |
| `OLLAMA_HOST` | Local only | `http://localhost:11434` | Local AI (FREE) |

---

## 🔑 Getting Your API Keys

### OpenAI API Key
1. Visit: https://platform.openai.com/account/api-keys
2. Sign in or create account
3. Click "+ Create new secret key"
4. Copy: `sk-proj-xxxxx...`
5. Paste in Render environment

### Your Render Backend URL
After backend deploys, you get a URL like:
```
https://resume-ats-backend.onrender.com
```
Use this in frontend `NEXT_PUBLIC_API_URL`

---

## 📝 Local Development (.env files)

### Backend `backend/.env`
```
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
# OPENAI_API_KEY=sk-proj-xxxxx  # Optional
```

### Frontend `frontend/.env.local`
```
BACKEND_URL=http://localhost:8001
NEXT_PUBLIC_API_URL=
```

---

## ✅ Deployment Flow

1. **Set Backend Env Vars on Render**
   - `OPENAI_API_KEY`, `OPENAI_MODEL`, `PYTHONUNBUFFERED`
   - Deploy backend
   - Get URL: `https://resume-ats-backend.onrender.com`

2. **Set Frontend Env Vars on Vercel**
   - `BACKEND_URL=<backend-url>`
   - `NEXT_PUBLIC_API_URL=` can stay empty unless you need direct browser calls
   - `NODE_ENV=production`
   - Deploy frontend

3. **Test**
   - Backend API: `https://backend-url/docs`
   - Frontend: `https://frontend-url`
   - Upload resume → Use chatbot

---

## 🚨 Troubleshooting

**Backend shows "Internal Server Error"**
- Check if `OPENAI_API_KEY` is set
- Verify key starts with `sk-proj-`
- Check Render logs

**Frontend can't reach backend**
- Verify `BACKEND_URL` is correct in Vercel
- Test both `https://frontend-url/health` and `https://backend-url/health`
- Test: Visit backend URL directly in browser
- Check CORS settings (enabled by default)

**Chatbot not responding**
- Backend must have `OPENAI_API_KEY` set
- OpenAI key must have available quota
- Check: https://platform.openai.com/account/billing/usage

---

**Ready to deploy?** Follow the checklist above! 🚀
