# Platform Engineering Test - Senior Level

## 🏗️ Architecture Overview

This project demonstrates advanced platform engineering skills through a full-stack microservices application deployed on Google Cloud Platform (GCP) using modern DevOps practices.

### Technology Stack
- **Frontend**: Vue.js SPA deployed to Cloud Storage + CDN
- **Backend**: Microservices on GKE (Standard mode)
- **Messaging**: Google Pub/Sub
- **Database**: Firestore (NoSQL)
- **Infrastructure**: Terraform with modular design
- **CI/CD**: GitHub Actions
- **Orchestration**: Kubernetes + Helm
- **Monitoring**: Cloud Monitoring + Alerting

### Repository Structure
```
platform-engineering-test/
├── services/              # Application services
│   ├── frontend/         # Vue.js SPA
│   ├── microservice-1/   # API Gateway service
│   └── microservice-2/   # Event processing service
├── infrastructure/       # Infrastructure as Code
│   ├── terraform/        # Terraform modules
│   ├── helm/            # Helm charts
│   └── k8s/             # Kubernetes manifests
└── local-dev/           # Local development environment
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Terraform
- gcloud CLI
- kubectl
- helm

### Local Development
```bash
# Install dependencies
npm install

# Start local development environment
npm run dev
```

## 📋 Implementation Progress

- [x] Repository setup and structure
- [x] Monorepo configuration with Lerna
- [x] Conventional commits setup
- [x] Frontend Vue.js application structure
- [ ] Microservice 1 (API)
- [ ] Microservice 2 (Event processor)
- [ ] Terraform infrastructure modules
- [ ] Kubernetes manifests
- [ ] CI/CD pipelines
- [ ] Monitoring and alerting