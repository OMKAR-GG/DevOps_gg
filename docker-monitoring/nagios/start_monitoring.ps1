# This script will run the Docker container monitoring every minute
Write-Host "Starting Docker container monitoring for Nagios..."
Write-Host "Press Ctrl+C to stop monitoring."

try {
    while ($true) {
        Write-Host "Running monitoring at $(Get-Date)..."
        & .\monitor_docker.ps1
        Write-Host "Waiting 60 seconds for next check..."
        Start-Sleep -Seconds 60
    }
} catch {
    Write-Host "Monitoring stopped."
}
