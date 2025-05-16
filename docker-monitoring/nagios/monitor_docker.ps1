$containers = @(
    @{
        Name = "test-nginx"
        ServiceDescription = "Docker Container - test-nginx"
    },
    @{
        Name = "nagios"
        ServiceDescription = "Docker Container - nagios"
    },
    @{
        Name = "6325876640ce"
        ServiceDescription = "Docker Container - project-app"
    }
)

# First, let's create a custom service file for Nagios
$serviceFile = @"
# Docker container monitoring services
define service {
  use                 local-service
  host_name           localhost
  service_description Docker Container - test-nginx
  check_command       check_dummy!3!"No data received yet"
  active_checks_enabled 0
  passive_checks_enabled 1
}

define service {
  use                 local-service
  host_name           localhost
  service_description Docker Container - nagios
  check_command       check_dummy!3!"No data received yet"
  active_checks_enabled 0
  passive_checks_enabled 1
}

define service {
  use                 local-service
  host_name           localhost
  service_description Docker Container - project-app
  check_command       check_dummy!3!"No data received yet"
  active_checks_enabled 0
  passive_checks_enabled 1
}
"@

# Save to a file
$serviceFile | Out-File -FilePath "docker_services.cfg" -Encoding ASCII

# Copy to Nagios
Write-Host "Copying service definitions to Nagios..."
docker cp docker_services.cfg nagios:/opt/nagios/etc/objects/

# Make sure it's included in the config
docker exec nagios bash -c "grep -q 'docker_services.cfg' /opt/nagios/etc/nagios.cfg || echo 'cfg_file=/opt/nagios/etc/objects/docker_services.cfg' >> /opt/nagios/etc/nagios.cfg"

# Restart Nagios
Write-Host "Restarting Nagios..."
docker exec nagios sv restart nagios

# Wait for Nagios to restart
Start-Sleep -Seconds 5

# Now check each container and update Nagios
foreach ($container in $containers) {
    Write-Host "Checking container $($container.Name)..."
    $containerStatus = docker inspect -f "{{.State.Running}}" $container.Name 2>$null

    if ($LASTEXITCODE -ne 0) {
        # Container not found
        $status = 2 # CRITICAL
        $output = "Container $($container.Name) not found"
    } elseif ($containerStatus -eq "true") {
        # Container is running
        $status = 0 # OK
        $output = "Container $($container.Name) is running"
    } else {
        # Container exists but is not running
        $status = 2 # CRITICAL
        $output = "Container $($container.Name) is not running"
    }

    # Update Nagios using the direct status file approach
    Write-Host "Updating Nagios for $($container.Name) with status $status..."
    & .\update_nagios_status.ps1 -ContainerName $container.Name -ServiceDescription $container.ServiceDescription -Status $status -Output $output
}

Write-Host "Done! Please refresh the Nagios web interface to see the updated status."
