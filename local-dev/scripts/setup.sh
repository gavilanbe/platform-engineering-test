#!/bin/bash

echo "🚀 Setting up local development environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
    echo "❌ Docker is not running. Please start Docker and try again."
    exit 1
fi

# Build and start services
echo "📦 Building and starting services..."
docker-compose -f local-dev/docker-compose.yml up --build -d

echo "⏳ Waiting for services to be ready..."
sleep 30

# Health checks
echo "🔍 Checking service health..."

# Check frontend
if curl -f http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is ready"
else
    echo "❌ Frontend is not responding"
fi

# Check microservice-1
if curl -f http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "✅ Microservice-1 is ready"
else
    echo "❌ Microservice-1 is not responding"
fi

# Check microservice-2
if curl -f http://localhost:8081/api/health > /dev/null 2>&1; then
    echo "✅ Microservice-2 is ready"
else
    echo "❌ Microservice-2 is not responding"
fi

echo "🎉 Local development environment is ready!"
echo "🌐 Frontend: http://localhost:3000"
echo "🔧 API Gateway: http://localhost:8080"
echo "📊 Event Processor: http://localhost:8081"
