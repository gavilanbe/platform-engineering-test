#!/bin/bash

echo "🐳 Starting Docker development environment..."
echo "📋 Loading variables from local-dev/.env"

# Simply run docker-compose (it auto-loads .env)
docker-compose -f local-dev/docker-compose.yml up --build
