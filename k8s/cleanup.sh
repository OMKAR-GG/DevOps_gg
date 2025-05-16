#!/bin/bash

echo "Deleting Kubernetes resources..."
kubectl delete -f service.yaml
kubectl delete -f deployment.yaml

echo "Resources deleted successfully!"
