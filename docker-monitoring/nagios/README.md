# Nagios Docker Monitoring Setup

This document outlines the setup of Nagios for Docker container monitoring.

## Overview

Nagios has been configured to monitor Docker containers running on the host system. The setup includes:

1. A Nagios server running in a Docker container
2. PowerShell scripts for monitoring Docker container status
3. Service definitions for specific containers

## Access Information

- **Nagios Web Interface**: http://localhost:9090
- **Default Login**:
  - Username: nagiosadmin
  - Password: nagios

## Monitored Containers

The following Docker containers are being monitored:

- test-nginx
- nagios (self-monitoring)
- project-app

## How It Works

1. The `monitor_docker.ps1` script checks if specified Docker containers are running
2. It updates the Nagios status for each container
3. The status is displayed in the Nagios web interface

## Starting the Monitoring

To start the monitoring, run:

```powershell
powershell -File start_monitoring.ps1
```

This will check the container status every minute and update Nagios.

## Testing the Monitoring

To test the monitoring, you can stop one of the monitored containers:

```powershell
docker stop test-nginx
```

After the next monitoring cycle, Nagios should show the container as CRITICAL.

To restart the container:

```powershell
docker start test-nginx
```

After the next monitoring cycle, Nagios should show the container as OK.

## Customizing the Monitoring

To monitor additional containers, edit the `monitor_docker.ps1` script and add new container entries to the `$containers` array.

## Troubleshooting

If Nagios is not showing the correct status:

1. Check if the Nagios container is running: `docker ps | findstr nagios`
2. Restart Nagios if needed: `docker exec nagios sv restart nagios`
3. Run the monitoring script manually: `powershell -File monitor_docker.ps1`
4. Check the Nagios logs: `docker exec nagios tail -n 20 /opt/nagios/var/nagios.log`
