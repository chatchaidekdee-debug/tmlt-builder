@echo off
title TMLT Lab Catalog Builder - EXE Builder
echo ====================================================
echo  TMLT to Lab Catalog Builder ^& Editor - Windows EXE Builder
echo ====================================================
echo.
echo Checking Node.js environment...
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js (https://nodejs.org/) to compile this application.
    pause
    exit /b
)

echo.
echo Step 1: Installing builder dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies.
    pause
    exit /b
)

echo.
echo Step 2: Compiling to standalone EXE file...
mkdir dist 2>nul
node ./node_modules/pkg/lib-es5/bin.js . --targets node18-win-x64 --output dist/tmlt_lab_catalog_builder.exe
if %errorlevel% neq 0 (
    echo.
    echo [ERROR] Compilation failed!
    pause
    exit /b
)

echo.
echo ====================================================
echo [SUCCESS] Windows EXE compiled successfully!
echo You can find the executable file here:
echo - Folder: %~dp0dist
echo - File: tmlt_lab_catalog_builder.exe
echo ====================================================
echo.
pause
