# ResQ Complete Installation and Running Guide

This guide is for sharing the project with a friend, guide, or evaluator. Follow the commands in order to install, run, test, and reach the final resume-analysis output.

## 1. Requirements

Install these before running the project:

- Python 3.10 or newer
- Node.js 18 or newer
- Git
- VS Code

Check versions:

```powershell
python --version
node --version
npm --version
git --version
```

## 2. Get the Project

If cloning from GitHub:

```powershell
git clone <your-repository-url>
cd Resume-ATS
```

If you received the folder directly, open the folder in VS Code:

```powershell
cd "C:\path\to\Resume-ATS"
code .
```

## 3. Backend Setup

Run these commands from the project root:

```powershell
python -m venv venv
.\venv\Scripts\activate
python -m pip install --upgrade pip
pip install -r backend\requirements.txt
pip install -r backend\requirements-ml.txt
```

`requirements-ml.txt` installs PyTorch. It is needed for the stronger backend resume-quality model.

## 4. Optional OCR System Setup

The project already installs Python OCR libraries. For scanned PDFs, Windows may also need these system tools:

- Tesseract OCR
- Poppler for Windows

If OCR is not installed, normal text-based PDF and DOCX analysis still works. Scanned PDF OCR may show as unavailable.

## 5. OpenAI Chatbot Setup

Create this file:

```powershell
notepad backend\.env
```

Add:

```env
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-5.2-chat-latest
```

Without `OPENAI_API_KEY`, the chatbot still works with a local fallback, but it will feel less like a premium AI model.

Optional local fallback with Ollama:

```powershell
ollama pull llama3.1:8b
```

Then add this to `backend\.env`:

```env
OLLAMA_HOST=http://localhost:11434
OLLAMA_MODEL=llama3.1:8b
```

## 6. Frontend Setup

Open a new VS Code terminal from the project root:

```powershell
cd frontend
npm install
```

## 7. Run the Backend

Open Terminal 1 in VS Code:

```powershell
cd backend
..\venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8001
```

Backend health check:

```text
http://localhost:8001/health
```

Expected output:

```json
{"status":"healthy"}
```

## 8. Run the Frontend

Open Terminal 2 in VS Code:

```powershell
cd frontend
npm run dev -- -p 3001
```

Open the app:

```text
http://localhost:3001
```

## 9. Final Output Flow

Use this flow to show the complete project:

1. Open `http://localhost:3001`.
2. Upload a resume in PDF or DOCX format.
3. Click analyze.
4. Wait for the loading screen to complete.
5. Review the final dashboard:
   - ATS score
   - Candidate profile
   - Detected domain
   - Score breakdown
   - Skills
   - Experience
   - Projects
   - Resume-specific issues
   - Resume-specific AI improvement suggestions
6. Click the chatbot button at bottom-right.
7. Ask:

```text
Act as HR. Would you shortlist me for this role?
```

8. Optional: upload a job description with the resume and run comparison.
9. Download the PDF report using the report button.

## 10. Resume + Job Description Comparison

From the app upload section:

1. Choose resume file.
2. Choose job description file.
3. Run comparison.

Supported files:

- Resume: `.pdf`, `.docx`
- Job description: `.pdf`, `.docx`, `.txt`

The output includes:

- ATS score
- JD match percentage
- Missing skills
- Missing keywords
- Recruiter-style report
- Suggestions to improve match

## 11. Quick API Test Commands

Health:

```powershell
Invoke-WebRequest http://localhost:8001/health -UseBasicParsing
```

Analyze resume from PowerShell:

```powershell
curl.exe -X POST "http://localhost:8001/api/analyze" -F "file=@C:\path\to\resume.pdf"
```

## 12. Build Check Before Sharing

Backend compile check:

```powershell
cd backend
..\venv\Scripts\activate
python -m compileall app
```

Frontend production build:

```powershell
cd frontend
npm run build
```

Both should complete without errors.

## 13. Common Problems and Fixes

### Backend command not found

Use:

```powershell
..\venv\Scripts\activate
python -m uvicorn app.main:app --reload --port 8001
```

### Frontend cannot reach backend

Make sure backend is running on:

```text
http://localhost:8001
```

The frontend proxy is configured in:

```text
frontend/next.config.js
```

### Port already in use

Find process:

```powershell
netstat -ano | findstr :8001
netstat -ano | findstr :3001
```

Kill process:

```powershell
taskkill /PID <process-id> /F
```

### Chatbot feels rule-based

Check `backend\.env`:

```env
OPENAI_API_KEY=sk-your-openai-key-here
OPENAI_MODEL=gpt-5.2-chat-latest
```

Restart backend after editing `.env`.

### PyTorch not active

Run:

```powershell
.\venv\Scripts\activate
pip install -r backend\requirements-ml.txt
```

Check:

```powershell
python -c "import torch; print(torch.__version__)"
```

## 14. One-Command Setup Option

From the project root, you can run:

```powershell
.\setup.bat
```

Then start manually using the backend and frontend commands above.

## 15. Stop Servers

In each terminal:

```powershell
Ctrl + C
```

If the process does not stop, use the port-kill commands from section 13.

## 16. Submission Checklist

Before sending to a guide or friend:

- `backend/.env` is not shared if it contains a real API key.
- Backend starts on port `8001`.
- Frontend starts on port `3001`.
- `http://localhost:8001/health` returns healthy.
- `http://localhost:3001` opens the app.
- Resume upload produces the final dashboard.
- Chatbot answers after resume upload.
- `npm run build` passes.
- `python -m compileall app` passes.
