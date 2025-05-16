#!/bin/bash

# Exit on error
set -e

echo "Starting Minikube if not already running..."
minikube status || minikube start --driver=docker

echo "Pointing Docker CLI to Minikube's Docker daemon..."
eval $(minikube -p minikube docker-env)

echo "Building Docker image..."
docker build -t ecommerce-website:latest ..

echo "Applying Kubernetes configurations..."
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml

echo "Waiting for pods to be ready..."
kubectl wait --for=condition=ready pod -l app=ecommerce --timeout=120s

echo "Deployment successful! Opening service in browser..."
minikube service ecommerce-service
