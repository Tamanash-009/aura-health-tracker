@echo off
echo Starting AuraHealth System...
echo.

echo 1. Starting Backend (Spring Boot)...
start "AuraHealth Backend" cmd /k "cd backend && "d:\HEALTH TRACKER\maven\apache-maven-3.9.6\bin\mvn.cmd" spring-boot:run"

echo 2. Waiting for Backend to initialize...
timeout /t 10

echo 3. Starting Frontend (React)...
start "AuraHealth Frontend" cmd /k "cd frontend && npm run dev"

echo.
echo System started! 
echo Frontend: http://localhost:5173
echo Backend: http://localhost:8080
echo.
pause
