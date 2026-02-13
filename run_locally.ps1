Write-Host "Starting AuraHealth..." -ForegroundColor Cyan

# Check for Java
if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    Write-Error "Java not found in PATH. Please install Java 17+."
    exit 1
}

# Check for Maven
$mvnCmd = "mvn"
if (-not (Get-Command mvn -ErrorAction SilentlyContinue)) {
    $localMvn = Join-Path $PSScriptRoot "maven\apache-maven-3.9.6\bin\mvn.cmd"
    if (Test-Path $localMvn) {
        Write-Host "Global Maven not found, using local Maven..." -ForegroundColor Yellow
        $mvnCmd = $localMvn
    }
    else {
        Write-Error "Maven not found in PATH and local distribution missing."
        exit 1
    }
}

# Check for Node
if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
    Write-Error "Node.js not found in PATH. Please install Node.js."
    exit 1
}

# Start Backend
Write-Host "Starting Backend..." -ForegroundColor Green
Start-Process -FilePath $mvnCmd -ArgumentList "spring-boot:run" -WorkingDirectory "./backend" -NoNewWindow:($false)

# Start Frontend
Write-Host "Starting Frontend..." -ForegroundColor Green
Start-Process -FilePath "npm" -ArgumentList "run dev" -WorkingDirectory "./frontend" -NoNewWindow:($false)

Write-Host "Applications started in separate windows." -ForegroundColor Cyan
