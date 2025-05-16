# Lab Report: Kubernetes and Docker Integration

## Name: [Your Name]
## Roll No: [Your Roll No]
## Branch: [Your Branch]

## Aim
Integrate Kubernetes and Docker. Automate the process of running containerized applications developed in exercise 3 using Kubernetes.

## Theory
Kubernetes is an open-source container orchestration platform designed to automate the deployment, scaling, and management of containerized applications. It provides a framework to run distributed systems resiliently, handling failover, scaling, and deployment patterns.

Key Kubernetes concepts:
- **Pods**: The smallest deployable units in Kubernetes that can contain one or more containers
- **Deployments**: Manage the desired state of pods, enabling rolling updates and rollbacks
- **Services**: Abstract way to expose applications running on pods
- **Nodes**: Worker machines in the Kubernetes cluster
- **Cluster**: Set of nodes that run containerized applications

Docker is used to package applications into containers, while Kubernetes orchestrates these containers across multiple hosts.

## Implementation

### 1. Docker Configuration

The application is containerized using a multi-stage Dockerfile:

```dockerfile
# Build stage
FROM node:20-alpine AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the code
COPY . .

# Build the application
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy built files from build stage to nginx serve directory
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
```

This Dockerfile creates a production-ready image by:
1. Building the React application in a Node.js container
2. Copying only the built files to a lightweight Nginx container
3. Configuring Nginx to serve the application

### 2. Kubernetes Deployment Configuration

Created a deployment configuration (`deployment.yaml`) to manage the application pods:

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: ecommerce-deployment
  labels:
    app: ecommerce
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ecommerce
  template:
    metadata:
      labels:
        app: ecommerce
    spec:
      containers:
        - name: ecommerce
          image: ecommerce-website:latest
          imagePullPolicy: Never
          ports:
            - containerPort: 80
          resources:
            limits:
              cpu: "0.5"
              memory: "512Mi"
            requests:
              cpu: "0.2"
              memory: "256Mi"
```

This deployment:
- Creates 3 replicas of the application for high availability
- Uses the locally built Docker image
- Sets resource limits to prevent resource exhaustion
- Configures resource requests for proper scheduling

### 3. Kubernetes Service Configuration

Created a service configuration (`service.yaml`) to expose the application:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: ecommerce-service
spec:
  type: NodePort
  selector:
    app: ecommerce
  ports:
    - protocol: TCP
      port: 80
      targetPort: 80
      nodePort: 30080
```

This service:
- Exposes the application on port 30080 externally
- Routes traffic to port 80 of the pods
- Uses selector to identify which pods to route traffic to

### 4. Deployment Process

The deployment process was automated using scripts for both PowerShell and Bash environments:

1. Start Minikube:
   ```bash
   minikube start --driver=docker
   ```

2. Point Docker CLI to Minikube's Docker daemon:
   ```bash
   eval $(minikube -p minikube docker-env)
   ```

3. Build the Docker image:
   ```bash
   docker build -t ecommerce-website:latest .
   ```

4. Apply Kubernetes configurations:
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

5. Wait for pods to be ready:
   ```bash
   kubectl wait --for=condition=ready pod -l app=ecommerce --timeout=120s
   ```

6. Access the application:
   ```bash
   minikube service ecommerce-service
   ```

### 5. Testing and Validation

The deployment was tested by:
1. Verifying all pods are running: `kubectl get pods`
2. Checking service accessibility: `minikube service ecommerce-service`
3. Testing application functionality in the browser
4. Scaling the deployment to verify elasticity: `kubectl scale deployment ecommerce-deployment --replicas=5`

## Results

The integration of Docker and Kubernetes was successful:

1. The application was containerized using Docker
2. Kubernetes was configured to manage the containerized application
3. The deployment process was automated using scripts
4. The application was accessible through the Kubernetes service
5. The deployment could be scaled up and down as needed

## Screenshots

[Insert screenshots here with captions]

1. Minikube Status
   ![Minikube Status](path/to/screenshot1.png)

2. Docker Image Build
   ![Docker Image](path/to/screenshot2.png)

3. Kubernetes Deployment
   ![Kubernetes Deployment](path/to/screenshot3.png)

4. Kubernetes Service
   ![Kubernetes Service](path/to/screenshot4.png)

5. Running Pods
   ![Running Pods](path/to/screenshot5.png)

6. Application in Browser
   ![Application](path/to/screenshot6.png)

7. Scaled Deployment
   ![Scaled Deployment](path/to/screenshot7.png)

## Conclusion

This lab demonstrated the successful integration of Docker and Kubernetes for containerizing and orchestrating a React application. The key achievements include:

1. **Containerization**: The application was successfully packaged into a Docker container using a multi-stage build process for optimized image size.

2. **Orchestration**: Kubernetes was configured to manage the containerized application, providing features like:
   - High availability through multiple replicas
   - Service discovery and load balancing
   - Resource management
   - Scaling capabilities

3. **Automation**: The deployment process was automated using scripts, making it repeatable and consistent.

4. **Scalability**: The deployment demonstrated the ability to scale up and down based on demand.

The integration of Docker and Kubernetes provides a robust foundation for deploying and managing containerized applications in production environments, offering benefits such as improved resource utilization, simplified deployment, and enhanced application resilience.

## References

1. Kubernetes Documentation: https://kubernetes.io/docs/
2. Docker Documentation: https://docs.docker.com/
3. Minikube Documentation: https://minikube.sigs.k8s.io/docs/
