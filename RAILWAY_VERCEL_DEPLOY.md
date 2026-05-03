# 🚀 ECE Hub — Railway + Vercel Deployment Guide

## Architecture
```
Students/HOD Browser
        ↓
  Vercel (Frontend)          ← nimma-mitra.vercel.app
        ↓  (proxy /api/*)
  Railway (Backend)          ← resume-ats-backend-production.up.railway.app
        ↓
  Supabase (PostgreSQL DB)   ← free cloud database
```

---

## ✅ Step 1 — Add Environment Variables on Railway

Go to **Railway → Your Backend Project → Variables** and add:

| Variable | Value |
|---|---|
| `HOD_PASSWORD` | `ecehod@25` |
| `STUDENT_PASSWORD` | `ece@25` |
| `JWT_SECRET` | `nimma-mitra-ece-hub-4mh23-secret` |
| `DATABASE_URL` | *(See Step 2 for Supabase URL)* |
| `GEMINI_API_KEY` | *(your existing key)* |
| `AI_PROVIDER` | `gemini` |

> Railway automatically injects `PORT` — the `railway.toml` uses `$PORT` so no changes needed.

---

## ✅ Step 2 — Set Up Supabase (Free Cloud Database)

1. Go to **[supabase.com](https://supabase.com)** → Sign up free
2. Click **"New Project"** → Name it `ece-hub` → Set a DB password → Create
3. Wait ~2 minutes for it to spin up
4. Go to **Settings → Database → Connection String → URI**
5. Copy the URI — it looks like:
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxx.supabase.co:5432/postgres
   ```
6. Paste that as `DATABASE_URL` in Railway Variables (Step 1)

> Tables (`students`, `activity_logs`) are **auto-created** on first backend startup. No SQL needed!

---

## ✅ Step 3 — Redeploy Backend on Railway

After setting variables:
- Railway auto-deploys on every `git push` to your connected branch
- Or click **"Deploy"** manually in the Railway dashboard
- Check logs — you should see: `Tables created OK` or no DB errors

**Verify backend is working:**
```
GET https://resume-ats-backend-production.up.railway.app/health
→ {"status": "healthy"}
```

---

## ✅ Step 4 — Vercel is Already Configured

Your `vercel.json` already proxies `/api/*` to Railway. No changes needed.

**But add this env var in Vercel too:**
- Go to **Vercel → Project → Settings → Environment Variables**
- Add: `NEXT_PUBLIC_API_URL` = *(leave empty or blank — the proxy handles it)*

> Since Vercel rewrites `/api/*` to Railway, `NEXT_PUBLIC_API_URL` should be **empty** or not set.
> The frontend code already handles this correctly.

---

## ✅ Step 5 — Test the Full Flow

1. Open your Vercel frontend URL
2. You should be redirected to `/login` (ECE Hub login gate)
3. Register with USN `4MH23EC001` and see it succeed
4. Try `4MH23EC126` — should be rejected
5. Visit `/hod` → Enter `ecehod@25` → See HOD dashboard
6. Check Supabase **Table Editor** → `students` table should have your test student

---

## 🔑 Quick Reference

| Who | URL | Password |
|---|---|---|
| Students | `/login` | USN + `ece@25` |
| HOD | `/hod` | `ecehod@25` |

| USN Range | Valid? |
|---|---|
| `4MH23EC001` – `4MH23EC125` | ✅ Yes |
| `4MH23EC000`, `4MH23EC126+` | ❌ No |
| Any other branch/year | ❌ No |

---

## 🐛 Troubleshooting

**"Tables not created"** → Check that `DATABASE_URL` is set in Railway. SQLite fallback is local only.

**"CORS error"** → Backend CORS is `allow_origins=["*"]` so this shouldn't happen. If it does, redeploy Railway.

**"Invalid token"** → JWT_SECRET must be the same on Railway. Check the env var.

**HOD sees no students** → Students must register first. Ask them to go to the Vercel URL and register.
