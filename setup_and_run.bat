@echo off
echo ==========================================
echo   AuraHealth: Environment Setup ^& Run
echo ==========================================

REM Add paths for Java, Node, and local Maven
set "JAVA_HOME=C:\Program Files\Eclipse Adoptium\jdk-25.0.2.10-hotspot"
set "MAVEN_HOME=%~dp0maven\apache-maven-3.9.6"
set "PATH=%PATH%;C:\Program Files\nodejs;%JAVA_HOME%\bin;%MAVEN_HOME%\bin"

REM Check for Java
java -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Java is still not found in configured path.
    pause
    exit /b
)

REM Check for Node.js
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is still not found in configured path.
    pause
    exit /b
)

REM Check for Maven
call mvn -version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Maven is not found.
    echo Path is: %MAVEN_HOME%\bin
    pause
    exit /b
)

echo.
echo [1/3] Setting up Backend (Spring Boot)...
cd backend
if not exist target (
    echo Building Backend with Maven...
    call mvn clean install -DskipTests
)
start "AuraHealth Backend" mvn spring-boot:run
cd ..

echo.
echo [2/3] Setting up Frontend (React)...
cd frontend
if not exist node_modules (
    echo Installing dependnecies...
    call npm install
)
echo Starting Frontend...
start "AuraHealth Frontend" npm run dev
cd ..

echo.
echo ==========================================
echo   AuraHealth is starting!
echo   Backend: http://localhost:8080
echo   Frontend: http://localhost:5173
echo ==========================================
pause
