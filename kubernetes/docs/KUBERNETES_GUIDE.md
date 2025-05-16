# Kubernetes Integration Guide

This guide provides step-by-step instructions for deploying your containerized React application to Kubernetes using Minikube.

## Prerequisites

- Docker installed
- Minikube installed
- kubectl installed

## Deployment Steps

### 1. Start Minikube

```bash
minikube start --driver=docker
```

Take a screenshot after Minikube starts:
```bash
minikube status
```

### 2. Point Docker CLI to Minikube's Docker Daemon

For PowerShell:
```powershell
minikube -p minikube docker-env --shell=powershell | Invoke-Expression
```

For Bash:
```bash
eval $(minikube -p minikube docker-env)
```

### 3. Build Docker Image

Build the Docker image within Minikube's Docker environment:
```bash
docker build -t ecommerce-website:latest .
```

Take a screenshot after the image is built:
```bash
docker images | grep ecommerce-website
```

### 4. Apply Kubernetes Configurations

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

Take a screenshot after applying configurations:
```bash
kubectl get deployments
kubectl get services
```

### 5. Wait for Pods to be Ready

```bash
kubectl wait --for=condition=ready pod -l app=ecommerce --timeout=120s
```

Take a screenshot of the running pods:
```bash
kubectl get pods
```

### 6. Access the Application

```bash
minikube service ecommerce-service
```

This command will automatically open your browser with the correct URL.

Take a screenshot of the service details:
```bash
kubectl describe service ecommerce-service
```

## Important Kubernetes Commands for Screenshots

### Viewing Resources

```bash
# List all pods with details
kubectl get pods -o wide

# List all services
kubectl get services

# List all deployments
kubectl get deployments

# Get all resources in the namespace
kubectl get all
```

### Detailed Information

```bash
# Describe a specific pod
kubectl describe pod <pod-name>

# Describe the deployment
kubectl describe deployment ecommerce-deployment

# Describe the service
kubectl describe service ecommerce-service
```

### Logs and Debugging

```bash
# View logs for a specific pod
kubectl logs <pod-name>

# Interactive shell into a pod
kubectl exec -it <pod-name> -- /bin/sh
```

### Scaling

```bash
# Scale the deployment to 5 replicas
kubectl scale deployment ecommerce-deployment --replicas=5
```

Take a screenshot after scaling:
```bash
kubectl get pods
```

### Dashboard (Optional)

```bash
# Start the Kubernetes dashboard
minikube dashboard
```

Take a screenshot of the dashboard.

## Cleanup

When you're done, you can clean up the resources:

```bash
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/deployment.yaml
```

Or use the provided cleanup scripts:

For PowerShell:
```powershell
./k8s/cleanup.ps1
```

For Bash:
```bash
./k8s/cleanup.sh
```

Take a screenshot after cleanup:
```bash
kubectl get all
```

## Troubleshooting

If you encounter issues:

1. Check pod status: `kubectl get pods`
2. View pod logs: `kubectl logs <pod-name>`
3. Describe the pod for events: `kubectl describe pod <pod-name>`
4. Ensure the image was built correctly: `docker images | grep ecommerce-website`
5. Verify Minikube is running: `minikube status`

## Taking Screenshots on Different Operating Systems

### Windows

1. Use the built-in Snipping Tool or press `Windows + Shift + S`
2. Use PowerShell to take screenshots programmatically:
   ```powershell
   Add-Type -AssemblyName System.Windows.Forms
   [System.Windows.Forms.SendKeys]::SendWait("%{PRTSC}")
   Start-Sleep -Seconds 1
   $img = [System.Windows.Forms.Clipboard]::GetImage()
   $img.Save("screenshot_$(Get-Date -Format 'yyyyMMdd_HHmmss').png")
   ```

### macOS

1. Press `Command + Shift + 3` for full screen or `Command + Shift + 4` to select an area
2. Use the following command to take a screenshot of a specific window:
   ```bash
   screencapture -t png -w screenshot_$(date +%Y%m%d_%H%M%S).png
   ```

### Linux

1. Use the built-in screenshot tool or press `Print Screen`
2. Use the following command to take a screenshot:
   ```bash
   gnome-screenshot -w -f screenshot_$(date +%Y%m%d_%H%M%S).png
   ```
   or
   ```bash
   import -window root screenshot_$(date +%Y%m%d_%H%M%S).png
   ```
