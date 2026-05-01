# Environment Variables Quick Reference

## 🚀 Render Deployment Checklist

### Step 1: Backend Service (Render)

**Name:** `resume-ats-backend`  
**Environment:** Python  
**Build Command:** `pip install -r requirements.txt`  
**Start Command:** `uvicorn app.main:app --host 0.0.0.0 --port 8001`

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
NEXT_PUBLIC_API_URL=https://resume-ats-backend.onrender.com
NODE_ENV=production
```

---

## 📋 Environment Variables Explained

| Variable | Where | Value | Purpose |
|----------|-------|-------|---------|
| `OPENAI_API_KEY` | Backend (Render) | `sk-proj-...` | OpenAI API authentication |
| `OPENAI_MODEL` | Backend (Render) | `gpt-4o` | Which AI model to use |
| `NEXT_PUBLIC_API_URL` | Frontend (Render) | Backend URL | Where frontend calls API |
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
NEXT_PUBLIC_API_URL=http://localhost:8001
```

---

## ✅ Deployment Flow

1. **Set Backend Env Vars on Render**
   - `OPENAI_API_KEY`, `OPENAI_MODEL`, `PYTHONUNBUFFERED`
   - Deploy backend
   - Get URL: `https://resume-ats-backend.onrender.com`

2. **Set Frontend Env Vars on Render**
   - `NEXT_PUBLIC_API_URL=<backend-url>`
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
- Verify `NEXT_PUBLIC_API_URL` is correct
- Test: Visit backend URL directly in browser
- Check CORS settings (enabled by default)

**Chatbot not responding**
- Backend must have `OPENAI_API_KEY` set
- OpenAI key must have available quota
- Check: https://platform.openai.com/account/billing/usage

---

**Ready to deploy?** Follow the checklist above! 🚀
