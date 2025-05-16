# PowerShell script to deploy the application to Kubernetes

# Check if Minikube is running, if not start it
try {
    minikube status
} catch {
    Write-Host "Starting Minikube..."
    minikube start --driver=docker
}

# Point Docker CLI to Minikube's Docker daemon
Write-Host "Pointing Docker CLI to Minikube's Docker daemon..."
minikube -p minikube docker-env --shell=powershell | Invoke-Expression

# Build Docker image
Write-Host "Building Docker image..."
docker build -t ecommerce-website:latest ..

# Apply Kubernetes configurations
Write-Host "Applying Kubernetes configurations..."
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

# Wait for pods to be ready
Write-Host "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=ecommerce --timeout=120s

# Open service in browser
Write-Host "Deployment successful! Opening service in browser..."
minikube service ecommerce-service
