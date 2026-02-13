$mavenUrl = "https://archive.apache.org/dist/maven/maven-3/3.9.6/binaries/apache-maven-3.9.6-bin.zip"
$mavenZip = "maven.zip"
$mavenDir = "maven"

Write-Host "Downloading Maven..."
Invoke-WebRequest -Uri $mavenUrl -OutFile $mavenZip

Write-Host "Extracting Maven..."
Expand-Archive -Path $mavenZip -DestinationPath $mavenDir -Force

Write-Host "Maven installed in $mavenDir"
Remove-Item $mavenZip
