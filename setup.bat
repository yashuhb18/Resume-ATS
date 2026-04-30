@echo off
echo ========================================
echo   ResQ - Setup Script
echo ========================================
echo.

REM Check if Python is installed
python --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Python is not installed. Please install Python 3.10 or higher.
    pause
    exit /b 1
)

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed. Please install Node.js 18 or higher.
    pause
    exit /b 1
)

echo [INFO] Setting up Backend...

REM Create virtual environment if it doesn't exist
if not exist "venv" (
    echo [INFO] Creating Python virtual environment...
    python -m venv venv
)

REM Activate virtual environment and install dependencies
call venv\Scripts\activate.bat
echo [INFO] Installing Python dependencies...
pip install -r backend\requirements.txt -q

echo.
echo [INFO] PyTorch is optional because it is a large install.
echo [INFO] To enable the full PyTorch model later, run:
echo        venv\Scripts\python.exe -m pip install -r backend\requirements-ml.txt

echo.
echo [INFO] Setting up Frontend...
cd frontend

REM Install npm dependencies
echo [INFO] Installing Node.js dependencies...
call npm install

cd ..

echo.
echo ========================================
echo   Setup Complete!
echo ========================================
echo.
echo To start the application:
echo.
echo 1. Start Backend (Terminal 1):
echo    cd backend
echo    ..\venv\Scripts\activate
echo    python -m uvicorn app.main:app --reload --port 8001
echo.
echo 2. Start Frontend (Terminal 2):
echo    cd frontend
echo    npm run dev -- -p 3001
echo.
echo Then open http://localhost:3001 in your browser.
echo.
pause
