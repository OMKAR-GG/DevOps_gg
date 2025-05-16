#!/bin/bash

# Script to capture screenshots during Kubernetes deployment

# Create screenshots directory
SCREENSHOT_DIR="kubernetes-screenshots"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

mkdir -p "$SCREENSHOT_DIR"
echo "Created directory: $SCREENSHOT_DIR"

# Function to take a screenshot
take_screenshot() {
    local filename="$1"
    local filepath="$SCREENSHOT_DIR/$filename.png"
    
    # Check which screenshot tool is available
    if command -v gnome-screenshot &> /dev/null; then
        gnome-screenshot -w -f "$filepath"
    elif command -v import &> /dev/null; then
        import -window root "$filepath"
    elif command -v screencapture &> /dev/null; then
        screencapture -t png "$filepath"
    else
        echo "No screenshot tool found. Please install gnome-screenshot, imagemagick, or use macOS."
        return 1
    fi
    
    echo "Screenshot saved to: $filepath"
}

# Function to run a command and take a screenshot
run_command_with_screenshot() {
    local command="$1"
    local screenshot_name="$2"
    
    echo -e "\n>> Running: $command"
    eval "$command"
    sleep 2  # Give time for the command output to display
    take_screenshot "$screenshot_name"
}

# Main script execution
echo "Starting Kubernetes deployment screenshot capture..."

# 1. Minikube status
run_command_with_screenshot "minikube status" "01_minikube_status"

# 2. Docker images
run_command_with_screenshot "docker images" "02_docker_images"

# 3. Build Docker image
echo -e "\n>> Building Docker image..."
docker build -t ecommerce-website:latest ..
run_command_with_screenshot "docker images | grep ecommerce-website" "03_docker_image_built"

# 4. Apply Kubernetes configurations
run_command_with_screenshot "kubectl apply -f deployment.yaml" "04_deployment_applied"
run_command_with_screenshot "kubectl apply -f service.yaml" "05_service_applied"

# 5. Get deployments
run_command_with_screenshot "kubectl get deployments" "06_deployments"

# 6. Get services
run_command_with_screenshot "kubectl get services" "07_services"

# 7. Get pods
run_command_with_screenshot "kubectl get pods" "08_pods"

# 8. Wait for pods to be ready
echo -e "\n>> Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=ecommerce --timeout=120s
run_command_with_screenshot "kubectl get pods" "09_pods_ready"

# 9. Describe deployment
run_command_with_screenshot "kubectl describe deployment ecommerce-deployment" "10_deployment_details"

# 10. Describe service
run_command_with_screenshot "kubectl describe service ecommerce-service" "11_service_details"

# 11. Get all resources
run_command_with_screenshot "kubectl get all" "12_all_resources"

# 12. Scale deployment
run_command_with_screenshot "kubectl scale deployment ecommerce-deployment --replicas=5" "13_scale_deployment"
sleep 5  # Wait for scaling to take effect
run_command_with_screenshot "kubectl get pods" "14_scaled_pods"

echo -e "\nScreenshot capture complete. All screenshots saved to $SCREENSHOT_DIR directory."
echo "Opening the application in browser..."
minikube service ecommerce-service

# Note: You should manually take a screenshot of the browser showing the application
