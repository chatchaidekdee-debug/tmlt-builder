@echo off
title TMLT Lab Catalog Builder - Launcher
echo ====================================================
echo  TMLT to Lab Catalog Builder ^& Editor - Windows Launcher
echo ====================================================
echo.
echo Checking Node.js environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please download and install Node.js from: https://nodejs.org/
    echo Once installed, run this file again.
    echo.
    pause
    exit /b
)

echo Installing lightweight local server (if needed)...
call npm install --no-audit --no-fund >nul 2>&1

echo Starting application...
echo Keeping this console window open while using the app.
echo.
call npm start
pause
