# PowerShell script to capture screenshots during Kubernetes deployment
# This script requires PowerShell 5.1 or higher

$screenshotDir = "kubernetes-screenshots"
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"

# Create screenshots directory if it doesn't exist
if (-not (Test-Path $screenshotDir)) {
    New-Item -ItemType Directory -Path $screenshotDir | Out-Null
    Write-Host "Created directory: $screenshotDir"
}

# Function to take a screenshot
function Take-Screenshot {
    param (
        [string]$fileName
    )
    
    Add-Type -AssemblyName System.Windows.Forms,System.Drawing
    
    $screens = [System.Windows.Forms.Screen]::AllScreens
    $top = $left = 0
    $width = $height = 0
    
    # Calculate the total size of all screens
    foreach ($screen in $screens) {
        $top = [Math]::Min($top, $screen.Bounds.Top)
        $left = [Math]::Min($left, $screen.Bounds.Left)
        $width = [Math]::Max($width, $screen.Bounds.Right)
        $height = [Math]::Max($height, $screen.Bounds.Bottom)
    }
    
    $bounds = [Drawing.Rectangle]::FromLTRB($left, $top, $width, $height)
    $bmp = New-Object System.Drawing.Bitmap $bounds.Width, $bounds.Height
    $graphics = [Drawing.Graphics]::FromImage($bmp)
    
    $graphics.CopyFromScreen($bounds.Left, $bounds.Top, 0, 0, $bounds.Size)
    
    $filePath = Join-Path $screenshotDir "$fileName.png"
    $bmp.Save($filePath)
    
    $graphics.Dispose()
    $bmp.Dispose()
    
    Write-Host "Screenshot saved to: $filePath"
}

# Function to run a command and take a screenshot
function Run-CommandWithScreenshot {
    param (
        [string]$command,
        [string]$screenshotName
    )
    
    Write-Host "`n>> Running: $command"
    Invoke-Expression $command
    Start-Sleep -Seconds 2  # Give time for the command output to display
    Take-Screenshot $screenshotName
}

# Main script execution
Write-Host "Starting Kubernetes deployment screenshot capture..."

# 1. Minikube status
Run-CommandWithScreenshot "minikube status" "01_minikube_status"

# 2. Docker images
Run-CommandWithScreenshot "docker images" "02_docker_images"

# 3. Build Docker image
Write-Host "`n>> Building Docker image..."
docker build -t ecommerce-website:latest ..
Run-CommandWithScreenshot "docker images | findstr ecommerce-website" "03_docker_image_built"

# 4. Apply Kubernetes configurations
Run-CommandWithScreenshot "kubectl apply -f deployment.yaml" "04_deployment_applied"
Run-CommandWithScreenshot "kubectl apply -f service.yaml" "05_service_applied"

# 5. Get deployments
Run-CommandWithScreenshot "kubectl get deployments" "06_deployments"

# 6. Get services
Run-CommandWithScreenshot "kubectl get services" "07_services"

# 7. Get pods
Run-CommandWithScreenshot "kubectl get pods" "08_pods"

# 8. Wait for pods to be ready
Write-Host "`n>> Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=ecommerce --timeout=120s
Run-CommandWithScreenshot "kubectl get pods" "09_pods_ready"

# 9. Describe deployment
Run-CommandWithScreenshot "kubectl describe deployment ecommerce-deployment" "10_deployment_details"

# 10. Describe service
Run-CommandWithScreenshot "kubectl describe service ecommerce-service" "11_service_details"

# 11. Get all resources
Run-CommandWithScreenshot "kubectl get all" "12_all_resources"

# 12. Scale deployment
Run-CommandWithScreenshot "kubectl scale deployment ecommerce-deployment --replicas=5" "13_scale_deployment"
Start-Sleep -Seconds 5  # Wait for scaling to take effect
Run-CommandWithScreenshot "kubectl get pods" "14_scaled_pods"

Write-Host "`nScreenshot capture complete. All screenshots saved to $screenshotDir directory."
Write-Host "Opening the application in browser..."
minikube service ecommerce-service

# Note: You should manually take a screenshot of the browser showing the application
