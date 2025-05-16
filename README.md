# E-commerce Website with Docker Monitoring

A simple e-commerce website built with React, TypeScript, and Vite, with Docker container monitoring using Nagios.

## Docker Commands for Content Management

### Building and Running the Application

#### Using Docker Compose (Recommended)

```bash
# Build and start the container
docker-compose up -d

# View logs
docker-compose logs -f

# Stop the container
docker-compose down
```

#### Using Docker Directly

```bash
# Build the Docker image
docker build -t ecommerce-app .

# Run the container
docker run -d -p 8080:80 --name ecommerce-container ecommerce-app

# Stop the container
docker stop ecommerce-container

# Remove the container
docker rm ecommerce-container
```

### Useful Docker Commands for Content Management

```bash
# List all running containers
docker ps

# List all containers (including stopped ones)
docker ps -a

# List all images
docker images

# Remove an image
docker rmi [image-id]

# View container logs
docker logs [container-id]

# Execute a command in a running container
docker exec -it [container-id] [command]

# Example: Access shell in the container
docker exec -it ecommerce-container sh

# Copy files from host to container
docker cp [local-path] [container-id]:[container-path]

# Copy files from container to host
docker cp [container-id]:[container-path] [local-path]

# Inspect container details
docker inspect [container-id]

# View container resource usage
docker stats [container-id]
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Docker Monitoring with Nagios

This project includes a setup for monitoring Docker containers using Nagios. The monitoring system is located in the `docker-monitoring/nagios` directory.

### Features

- Monitor Docker container status (running/stopped)
- Web interface for viewing container status
- Alerts for container state changes
- Easy setup with Docker

### Getting Started with Monitoring

1. Start the Nagios container:
   ```bash
   docker run -d --name nagios -p 9090:80 jasonrivers/nagios
   ```

2. Set up the monitoring scripts:
   ```bash
   cd docker-monitoring/nagios
   powershell -File monitor_docker.ps1
   ```

3. Start continuous monitoring:
   ```bash
   powershell -File start_monitoring.ps1
   ```

4. Access the Nagios web interface at http://localhost:9090
   - Username: nagiosadmin
   - Password: nagios

For more details, see the [Nagios Docker Monitoring README](docker-monitoring/nagios/README.md).
