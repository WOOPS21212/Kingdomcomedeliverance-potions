e?@echo off
title Launching KCD-Potions AI Workspace
echo.

:: === Step 1: Start Ollama ===
echo [1/4] Starting Ollama...
start "" cmd /k "ollama serve"
timeout /t 3 >nul

:: === Step 2: Start AnythingLLM Docker container ===
echo [2/4] Starting AnythingLLM container...
docker start anythingllm >nul 2>&1
timeout /t 3 >nul

:: === Step 3: Ingest KCD files ===
echo [3/4] Syncing KCD-Potions project files...
powershell -ExecutionPolicy Bypass -File "K:\404notfound-art\Kingdomcomedeliverance-potions\ingest-kcd-potions.ps1"
timeout /t 2 >nul

:: === Step 4: Launch AnythingLLM Workspace ===
echo [4/4] Opening AnythingLLM workspace in browser...
start http://localhost:3001/workspace/KCD-Potions

echo Done!
exit