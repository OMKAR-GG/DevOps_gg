# LAB 04 REPORT

## Name: Ankit D. Nimbolkar
## Roll No: 242190014
## Branch: Software Engineering

## Aim
Integrate Kubernetes and Docker. Automate the process of running containerized applications developed in exercise 3 using Kubernetes.

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

This Dockerfile:
1. Uses Node.js to build the React application
2. Copies the built files to an Nginx container
3. Exposes port 80 for web access

### 2. Kubernetes Configuration

#### Deployment Configuration (k8s/deployment.yaml)

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
1. Creates 3 replicas of the application
2. Uses the locally built Docker image
3. Configures resource limits and requests
4. Exposes port 80 within the cluster

#### Service Configuration (k8s/service.yaml)

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
1. Exposes the application outside the cluster using NodePort
2. Maps port 30080 on the host to port 80 in the container
3. Selects pods with the label `app: ecommerce`

### 3. Docker Compose Alternative

Since Minikube installation faced issues, we used Docker Compose as an alternative to demonstrate containerization:

```yaml
version: '3.8'

services:
  app:
    build:
      context: .
      dockerfile: Dockerfile
    ports:
      - "8080:80"
    restart: unless-stopped
```

This Docker Compose configuration:
1. Builds the image using the Dockerfile
2. Maps port 8080 on the host to port 80 in the container
3. Configures the container to restart unless explicitly stopped

### 4. Execution Steps

1. **Build the Docker image**:
   ```bash
   docker build -t ecommerce-website:latest .
   ```

2. **Run with Docker Compose**:
   ```bash
   docker-compose up -d
   ```

3. **Access the application**:
   Open a browser and navigate to http://localhost:8080

### 5. Kubernetes Deployment (Instructions)

For environments with Minikube installed:

1. **Start Minikube**:
   ```bash
   minikube start --driver=docker
   ```

2. **Point Docker to Minikube's Docker daemon**:
   ```bash
   # For PowerShell
   minikube -p minikube docker-env --shell=powershell | Invoke-Expression
   
   # For Bash
   eval $(minikube -p minikube docker-env)
   ```

3. **Build the Docker image**:
   ```bash
   docker build -t ecommerce-website:latest .
   ```

4. **Apply Kubernetes configurations**:
   ```bash
   kubectl apply -f k8s/deployment.yaml
   kubectl apply -f k8s/service.yaml
   ```

5. **Access the application**:
   ```bash
   minikube service ecommerce-service
   ```

## Conclusion

This lab demonstrated the integration of Docker and Kubernetes for containerizing and orchestrating a React application. The key learnings include:

1. Creating multi-stage Docker builds for efficient containerization
2. Configuring Kubernetes deployments with resource management
3. Setting up Kubernetes services to expose applications
4. Using Docker Compose as an alternative when Kubernetes is not available

The implementation allows for:
- Scalable deployment with multiple replicas
- Resource management for containers
- Easy access to the application through port mapping
- Automated container management

These techniques provide a foundation for deploying containerized applications in production environments with proper orchestration and scaling capabilities.
