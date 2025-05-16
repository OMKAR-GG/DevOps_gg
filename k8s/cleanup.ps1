# PowerShell script to clean up Kubernetes resources

Write-Host "Deleting Kubernetes resources..."
kubectl delete -f service.yaml
kubectl delete -f deployment.yaml

Write-Host "Resources deleted successfully!"
