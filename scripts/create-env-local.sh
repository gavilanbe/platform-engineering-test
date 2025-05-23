#!/bin/bash

PROJECT_ID=${1:-nahuelgabe-test}

echo "📝 Creating LOCAL environment files (no GCP resources created)"
echo "Project ID: $PROJECT_ID"

# Root .env para desarrollo local
cat > .env.local << ENVEOF
# Local development configuration
GOOGLE_CLOUD_PROJECT=$PROJECT_ID
NODE_ENV=development

# Local ports
FRONTEND_PORT=3000
MICROSERVICE_1_PORT=8080
MICROSERVICE_2_PORT=8081
CORS_ORIGIN=http://localhost:3000

# For local development with GCP emulators
PUBSUB_EMULATOR_HOST=localhost:8085
FIRESTORE_EMULATOR_HOST=localhost:8080

# Local resource names (will be created by Terraform in cloud)
PUBSUB_TOPIC=item-events
PUBSUB_SUBSCRIPTION=item-events-subscription
FIRESTORE_COLLECTION=items
ENVEOF

# Microservice 1 .env
cat > services/microservice-1/.env << ENVEOF
NODE_ENV=development
PORT=8080
GOOGLE_CLOUD_PROJECT=$PROJECT_ID
CORS_ORIGIN=http://localhost:3000

# Local emulator settings
PUBSUB_EMULATOR_HOST=localhost:8085
PUBSUB_TOPIC=item-events
ENVEOF

# Microservice 2 .env  
cat > services/microservice-2/.env << ENVEOF
NODE_ENV=development
PORT=8081
GOOGLE_CLOUD_PROJECT=$PROJECT_ID
CORS_ORIGIN=http://localhost:3000

# Local emulator settings
PUBSUB_EMULATOR_HOST=localhost:8085
FIRESTORE_EMULATOR_HOST=localhost:8080
PUBSUB_SUBSCRIPTION=item-events-subscription
FIRESTORE_COLLECTION=items
ENVEOF

echo "✅ Local environment files created!"
echo ""
echo "📋 Files created:"
echo "- .env.local root configuration"
echo "- services/microservice-1/.env"
echo "- services/microservice-2/.env"
echo ""
echo "🔧 These files use local emulators for development."
echo "🏗️ Cloud resources will be created by Terraform."
