# Lab Report: Integrating Kubernetes and Docker

Name: [Your Name]
Roll No: [Your Roll No]
Branch: [Your Branch]

## Aim
Integrate Kubernetes and Docker. Automate the process of running containerized applications developed in exercise 3 using Kubernetes.

## Theory
Kubernetes is an open-source container orchestration platform used to automate the deployment, scaling, and management of containerized applications. When used with Docker, Kubernetes provides powerful infrastructure to run and manage applications in containers across a cluster of machines.

Kubernetes uses objects like Pods, Deployments, and Services to define and manage applications:
- Docker is used to build the image of the application.
- Kubernetes is used to deploy and manage those Docker containers.

## Implementation Steps

### Step 1: Start Minikube
Started a local Kubernetes cluster using the following command:
```bash
minikube start --driver=docker
```

### Step 2: Use Minikube's Docker daemon
Configured Docker to use Minikube's environment:
```bash
eval $(minikube docker-env)
```

### Step 3: Build Docker Image
Built the Docker image for the e-commerce application:
```bash
docker build -t ecommerce-app:latest .
```

### Step 4: Create Kubernetes Deployment
Created a deployment.yaml file with the following configuration:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ecommerce-app-deployment
  labels:
    app: ecommerce-app
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ecommerce-app
  template:
    metadata:
      labels:
        app: ecommerce-app
    spec:
      containers:
        - name: ecommerce-app
          image: ecommerce-app:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 80
```

### Step 5: Create Kubernetes Service
Created a service.yaml file with the following configuration:
```yaml
apiVersion: v1
kind: Service
metadata:
  name: ecommerce-app-service
spec:
  type: NodePort
  selector:
    app: ecommerce-app
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

### Step 6: Apply Kubernetes Configurations
Applied the Kubernetes configurations:
```bash
kubectl apply -f deployment.yaml
kubectl apply -f service.yaml
```

### Step 7: Access the Application
Accessed the application using the Minikube service command:
```bash
minikube service ecommerce-app-service
```

## Results
The e-commerce application was successfully deployed to Kubernetes with 3 replicas. The application was accessible through the NodePort service at port 30080.

## Observations
- Kubernetes automatically managed the deployment of the application across multiple pods.
- The service provided a stable endpoint to access the application.
- Kubernetes handled the distribution of traffic across the pods.

## Conclusion
Successfully integrated Docker and Kubernetes by building a Docker image, deploying it using Kubernetes, and accessing the application via a Kubernetes service. This setup allows automated management, scaling, and efficient orchestration of containerized applications.

## Screenshots
[Include screenshots of your application running in Kubernetes]
