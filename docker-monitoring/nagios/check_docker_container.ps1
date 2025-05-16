param(
    [Parameter(Mandatory=$true)]
    [string]$ContainerName
)

$containerStatus = docker inspect -f "{{.State.Running}}" $ContainerName 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "CRITICAL - Container $ContainerName not found"
    exit 2
}

if ($containerStatus -eq "true") {
    Write-Host "OK - Container $ContainerName is running"
    exit 0
} else {
    Write-Host "CRITICAL - Container $ContainerName is not running"
    exit 2
}
