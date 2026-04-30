@echo off
echo ========================================
echo   Starting ResQ
echo ========================================
echo.

REM Start Backend
echo [INFO] Starting Backend Server...
start "ATS Backend" cmd /k "cd /d %~dp0backend && call ..\venv\Scripts\activate.bat && python -m uvicorn app.main:app --reload --port 8001"

REM Wait a moment for backend to start
timeout /t 3 /nobreak >nul

REM Start Frontend
echo [INFO] Starting Frontend Server...
start "ATS Frontend" cmd /k "cd /d %~dp0frontend && npm run dev -- -p 3001"

echo.
echo [INFO] Servers starting...
echo.
echo Backend: http://localhost:8001
echo Frontend: http://localhost:3001
echo.
echo Opening browser in 5 seconds...
timeout /t 5 /nobreak >nul

start http://localhost:3001

echo.
echo Press any key to stop both servers...
pause >nul
taskkill /FI "WINDOWTITLE eq ATS Backend*" /F >nul 2>&1
taskkill /FI "WINDOWTITLE eq ATS Frontend*" /F >nul 2>&1
