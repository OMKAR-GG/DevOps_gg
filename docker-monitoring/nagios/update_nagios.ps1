param(
    [Parameter(Mandatory=$true)]
    [string]$ContainerName,
    [Parameter(Mandatory=$true)]
    [string]$ServiceDescription,
    [Parameter(Mandatory=$true)]
    [string]$Status,
    [Parameter(Mandatory=$true)]
    [string]$Output
)

# Get current timestamp in Nagios format
$timestamp = [int][double]::Parse((Get-Date -UFormat %s))

# Create the Nagios external command
$command = "[$timestamp] PROCESS_SERVICE_CHECK_RESULT;localhost;$ServiceDescription;$Status;$Output"

Write-Host "Sending command to Nagios: $command"

# Send the command to Nagios via Docker exec
$result = docker exec nagios bash -c "echo '$command' >> /opt/nagios/var/rw/nagios.cmd" 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "Error sending command to Nagios: $result" -ForegroundColor Red
} else {
    Write-Host "Command sent successfully to Nagios" -ForegroundColor Green
}

# Check if the command file exists and is writable
$checkCmd = docker exec nagios bash -c "ls -la /opt/nagios/var/rw/nagios.cmd" 2>&1
Write-Host "Command file status: $checkCmd"
