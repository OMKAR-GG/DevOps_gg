# Kubernetes Deployment Guide

This guide explains how to deploy the ecommerce application to Kubernetes using Minikube.

## Prerequisites

- Docker installed
- Minikube installed
- kubectl installed

## Step 1: Start Minikube

Start a local Kubernetes cluster:

```bash
minikube start --driver=docker
```

## Step 2: Use Minikube's Docker Daemon

Point your Docker CLI to Minikube's Docker daemon:

For PowerShell:
```powershell
minikube -p minikube docker-env --shell=powershell | Invoke-Expression
```

For Bash:
```bash
eval $(minikube -p minikube docker-env)
```

## Step 3: Build Docker Image

Build the Docker image (make sure you're in the project root directory):

```bash
docker build -t ecommerce-website:latest .
```

## Step 4: Apply Kubernetes Configurations

Apply the deployment and service configurations:

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

## Step 5: Access the Application

Access the application using Minikube's service command:

```bash
minikube service ecommerce-service
```

This will automatically open your browser with the correct URL.

## Useful Kubernetes Commands

```bash
# List all pods
kubectl get pods

# List all services
kubectl get services

# View logs for a specific pod
kubectl logs <pod-name>

# Scale the deployment
kubectl scale deployment ecommerce-deployment --replicas=5

# Delete the deployment and service
kubectl delete -f k8s/deployment.yaml
kubectl delete -f k8s/service.yaml

# Get detailed information about a pod
kubectl describe pod <pod-name>

# Get detailed information about the service
kubectl describe service ecommerce-service

# Restart the deployment
kubectl rollout restart deployment ecommerce-deployment
```

## Troubleshooting

If you encounter issues:

1. Check pod status: `kubectl get pods`
2. View pod logs: `kubectl logs <pod-name>`
3. Describe the pod for events: `kubectl describe pod <pod-name>`
4. Ensure the image was built correctly: `docker images | grep ecommerce-website`
5. Verify Minikube is running: `minikube status`
