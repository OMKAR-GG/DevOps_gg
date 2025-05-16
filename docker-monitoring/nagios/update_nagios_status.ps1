param(
    [Parameter(Mandatory=$true)]
    [string]$ContainerName,
    [Parameter(Mandatory=$true)]
    [string]$ServiceDescription,
    [Parameter(Mandatory=$true)]
    [int]$Status,
    [Parameter(Mandatory=$true)]
    [string]$Output
)

# Create a temporary status file
$statusFile = @"
define servicestatus {
    host_name               localhost
    service_description     $ServiceDescription
    check_command           check_dummy!$Status!"$Output"
    current_state           $Status
    plugin_output           $Output
    long_plugin_output      
    performance_data        
    check_type              1
    last_check              $(Get-Date -UFormat %s)
    next_check              $(([datetime]::Now).AddMinutes(5).ToString("yyyy-MM-dd HH:mm:ss"))
    check_options           0
    current_attempt         1
    max_attempts            3
    state_type              1
    last_state_change       $(Get-Date -UFormat %s)
    last_hard_state_change  $(Get-Date -UFormat %s)
    last_hard_state         $Status
    last_time_ok            $(if ($Status -eq 0) { Get-Date -UFormat %s } else { "0" })
    last_time_warning       $(if ($Status -eq 1) { Get-Date -UFormat %s } else { "0" })
    last_time_critical      $(if ($Status -eq 2) { Get-Date -UFormat %s } else { "0" })
    last_time_unknown       $(if ($Status -eq 3) { Get-Date -UFormat %s } else { "0" })
    is_flapping             0
    scheduled_downtime_depth 0
    active_checks_enabled   0
    passive_checks_enabled  1
    obsess                  1
    notifications_enabled   1
}
"@

# Save to a temporary file
$tempFile = "temp_status_$ContainerName.cfg"
$statusFile | Out-File -FilePath $tempFile -Encoding ASCII

# Copy the file to the Nagios container
Write-Host "Copying status file for $ContainerName to Nagios container..."
docker cp $tempFile nagios:/tmp/
docker exec nagios bash -c "cat /tmp/$([System.IO.Path]::GetFileName($tempFile)) >> /opt/nagios/var/status.dat"

# Clean up
Remove-Item $tempFile
