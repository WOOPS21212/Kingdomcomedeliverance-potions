@echo off
title Starting Task Master AI
echo.

:: Navigate to the project root
cd /d "%~dp0\.."

:: Check if npx is installed
where npx >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo Error: npx is not installed. Please install Node.js and npm.
    exit /b 1
)

:: Load environment variables from .env file if it exists
if exist .env (
    echo Loading environment variables from .env file...
    for /f "tokens=*" %%a in (.env) do (
        set "%%a"
    )
)

:: Start the Task Master AI server
echo Launching Task Master AI with Claude 3.7 Sonnet model...
npx -y --package=task-master-ai task-master-ai

echo Task Master AI server started. You can now use it in your project.
pause
