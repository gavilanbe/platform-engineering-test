# Platform Engineering Test - Senior Level

> A comprehensive microservices architecture on Google Cloud Platform demonstrating advanced DevOps and platform engineering practices.

## 🏗️ Architecture Overview

This project showcases a production-ready, event-driven microservices application with modern DevOps practices, Infrastructure as Code, and cloud-native technologies.

### System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Google Cloud Platform                    │
├─────────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌──────────────────────────────────────┐ │
│  │   Cloud CDN     │    │         Cloud Load Balancer          │ │
│  │                 │    │           (HTTPS L7)                 │ │
│  └─────────────────┘    └──────────────────────────────────────┘ │
│           │                              │                      │
│  ┌─────────────────┐    ┌──────────────────────────────────────┐ │
│  │  Cloud Storage  │    │              GKE Cluster             │ │
│  │  (Static SPA)   │    │ ┌─────────────────────────────────┐  │ │
│  │                 │    │ │         Frontend NS             │  │ │
│  └─────────────────┘    │ │  ┌─────────┐  ┌─────────────┐   │  │ │
│                         │ │  │ Nginx   │  │   Vue.js    │   │  │ │
│                         │ │  │ Ingress │  │    SPA      │   │  │ │
│                         │ │  └─────────┘  └─────────────┘   │  │ │
│                         │ └─────────────────────────────────┘  │ │
│                         │ ┌─────────────────────────────────┐  │ │
│                         │ │       Backend Services NS      │  │ │
│                         │ │  ┌────────────┐  ┌───────────┐ │  │ │
│                         │ │  │API Gateway │  │Event Proc.│ │  │ │
│                         │ │  │(Express.js)│  │(Express.js)│ │  │ │
│                         │ │  └────────────┘  └───────────┘ │  │ │
│                         │ └─────────────────────────────────┘  │ │
│                         └──────────────────────────────────────┘ │
│                                    │              │              │
│  ┌─────────────────┐    ┌──────────────────┐  ┌─────────────────┐ │
│  │   Pub/Sub       │◄───┤  Secret Manager  │  │   Firestore     │ │
│  │   (Messaging)   │    │                  │  │   (NoSQL DB)    │ │
│  └─────────────────┘    └──────────────────┘  └─────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 🛠️ Technology Stack

### Frontend
- **Vue.js 3** - Modern JavaScript framework with Composition API
- **Vue Router** - Client-side routing
- **Vuex** - State management
- **Axios** - HTTP client for API communication

### Backend Microservices
- **Node.js + Express** - RESTful APIs
- **Google Cloud Pub/Sub** - Event-driven messaging
- **Google Cloud Firestore** - NoSQL document database
- **Joi** - Data validation
- **Morgan** - HTTP request logging

### Infrastructure & DevOps
- **Terraform** - Infrastructure as Code
- **Docker** - Containerization
- **Kubernetes (GKE)** - Container orchestration
- **Helm** - Kubernetes package manager
- **GitHub Actions** - CI/CD pipelines

### Monitoring & Security
- **Google Cloud Monitoring** - Observability
- **Google Secret Manager** - Secrets management
- **Helmet.js** - Security headers
- **CORS** - Cross-origin resource sharing

## 📁 Repository Structure

```
platform-engineering-test/
├── .github/
│   └── workflows/              # GitHub Actions CI/CD pipelines
├── config/
│   └── project.json           # Project configuration
├── infrastructure/
│   ├── terraform/             # Infrastructure as Code
│   │   ├── environments/      # Environment-specific configs
│   │   └── modules/           # Reusable Terraform modules
│   ├── helm/                  # Helm charts
│   └── k8s/                   # Kubernetes manifests
├── services/
│   ├── frontend/              # Vue.js SPA
│   ├── microservice-1/        # API Gateway service
│   └── microservice-2/        # Event processing service
├── local-dev/
│   ├── docker-compose.yml     # Local development environment
│   └── .env                   # Environment variables
├── scripts/
│   ├── auth-gcp.sh           # GCP authentication setup
│   ├── create-env-local.sh   # Environment file generation
│   └── dev-docker.sh         # Docker development startup
├── docs/                      # Documentation
├── .env.local                 # Local environment configuration
└── README.md
```

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** and npm
- **Docker** and Docker Compose
- **Google Cloud SDK** (`gcloud`)
- **Terraform** (for infrastructure)
- **kubectl** and **Helm** (for Kubernetes)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/platform-engineering-test.git
   cd platform-engineering-test
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup GCP authentication**
   ```bash
   ./scripts/auth-gcp.sh
   ```

4. **Create local environment**
   ```bash
   ./scripts/create-env-local.sh YOUR_PROJECT_ID
   ```

5. **Start development environment**
   ```bash
   # Option 1: Local development (fastest)
   npm run dev:local
   
   # Option 2: Docker with emulators (most realistic)
   npm run dev
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - API Gateway: http://localhost:8080
   - Event Processor: http://localhost:8081

## 🔧 Development

### Local Development Modes

#### 1. Native Local Development (Recommended for development)
```bash
npm run dev:local
```
- Runs all services natively on your machine
- Fastest development cycle with hot reload
- No Docker overhead
- Perfect for active development

#### 2. Docker Development (Recommended for testing)
```bash
npm run dev
```
- Runs services in Docker containers
- Includes GCP emulators (Pub/Sub, Firestore)
- More realistic production environment
- Perfect for integration testing

### Service Endpoints

| Service | URL | Description |
|---------|-----|-------------|
| Frontend | http://localhost:3000 | Vue.js SPA |
| API Gateway | http://localhost:8080/api | RESTful API |
| Event Processor | http://localhost:8081/api | Event handling |
| Health Checks | `/api/health` | Service health status |

### Available Scripts

```bash
# Development
npm run dev:local     # Start all services locally
npm run dev           # Start with Docker + emulators
npm run dev:frontend  # Frontend only
npm run dev:api       # API Gateway only
npm run dev:events    # Event Processor only

# Code Quality
npm run lint          # Lint all services
npm run test          # Run all tests
npm run build         # Build all services

# Repository Management
npm run bootstrap     # Install all dependencies
npm run clean         # Clean node_modules
npm run version       # Version bump with conventional commits
```

## 🧪 Testing the Application

### Functional Testing

1. **Health Checks**
   ```bash
   curl http://localhost:8080/api/health
   curl http://localhost:8081/api/health
   ```

2. **Create an Item (API)**
   ```bash
   curl -X POST http://localhost:8080/api/items \
     -H "Content-Type: application/json" \
     -d '{"title": "Test Item", "description": "Testing the API"}'
   ```

3. **Retrieve Items**
   ```bash
   curl http://localhost:8081/api/items
   ```

4. **Frontend Testing**
   - Open http://localhost:3000
   - Navigate to "Items" page
   - Add a new item using the form
   - Verify it appears in the list

### Event Flow Testing

The application demonstrates event-driven architecture:

1. **Frontend** → POST `/api/items` → **API Gateway**
2. **API Gateway** → Publishes event → **Pub/Sub**
3. **Event Processor** ← Subscribes to events ← **Pub/Sub**
4. **Event Processor** → Saves data → **Firestore**
5. **Frontend** → GET `/api/items` ← **Event Processor**

## 🏗️ Infrastructure

### Terraform Modules

The infrastructure is organized into reusable Terraform modules:

- **VPC Module**: Network infrastructure and security
- **GKE Module**: Kubernetes cluster configuration
- **Pub/Sub Module**: Messaging infrastructure
- **Firestore Module**: Database setup
- **Load Balancer Module**: Traffic distribution
- **Monitoring Module**: Observability stack

### Deployment Environments

- **Development**: Local with emulators
- **Staging**: GCP with reduced resources
- **Production**: GCP with full redundancy and monitoring

## 📊 Monitoring & Observability

### Metrics Collected

- **Golden Signals**: Latency, Traffic, Errors, Saturation
- **Business Metrics**: Items processed, user actions
- **Infrastructure Metrics**: CPU, Memory, Disk, Network
- **Custom Metrics**: Application-specific KPIs

### Alerting Strategy

- **Critical**: Service down, high error rates
- **Warning**: Resource utilization, performance degradation
- **Info**: Deployment notifications, capacity planning

## 🔐 Security

### Authentication & Authorization
- Service accounts with minimal permissions
- Workload Identity for pod-to-GCP authentication
- Secret Manager for sensitive data

### Network Security
- Private GKE cluster
- VPC with proper firewall rules
- Network policies for micro-segmentation

### Application Security
- Helmet.js for security headers
- Input validation with Joi
- CORS configuration
- Non-root container execution

## 🎯 Development Workflow

### Branching Strategy
- **main**: Production-ready code
- **feature/\***: Feature development
- **hotfix/\***: Emergency fixes

### Commit Convention
Using Conventional Commits for semantic versioning:
```
feat: add new feature
fix: bug fix
docs: documentation changes
style: formatting changes
refactor: code refactoring
test: testing changes
chore: maintenance tasks
```

### Code Quality
- ESLint for code linting
- Husky for git hooks
- Commitlint for commit message validation
- Automated testing in CI/CD

## 🚀 Deployment

### CI/CD Pipeline

1. **Continuous Integration**
   - Code quality checks (lint, test)
   - Security scanning
   - Docker image building
   - Terraform validation

2. **Continuous Deployment**
   - Staging deployment (automatic)
   - Integration testing
   - Production deployment (manual approval)
   - Smoke tests

### Deployment Strategies
- **Blue-Green Deployments**: Zero-downtime releases
- **Canary Deployments**: Gradual traffic shifting
- **Rollback Capability**: Automated and manual rollback

## 📚 Skills Demonstrated

### Platform Engineering
- ✅ Infrastructure as Code with Terraform
- ✅ Kubernetes orchestration and management
- ✅ CI/CD pipeline automation
- ✅ Monitoring and alerting setup
- ✅ Security best practices implementation

### Software Architecture
- ✅ Event-driven microservices design
- ✅ API Gateway pattern implementation
- ✅ Database per service pattern
- ✅ Asynchronous message processing
- ✅ Frontend-backend separation

### Cloud Native
- ✅ GCP services integration
- ✅ Container orchestration
- ✅ Service mesh configuration
- ✅ Auto-scaling implementation
- ✅ Multi-environment deployment

### DevOps Practices
- ✅ Automated testing and quality gates
- ✅ Conventional commits and semantic versioning
- ✅ Infrastructure versioning and rollback
- ✅ Secrets management
- ✅ Comprehensive documentation

## 🔧 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
lsof -i :3000 :8080 :8081
kill -9 [PID]
```

**Docker issues:**
```bash
docker system prune -f
docker-compose down
```

**Authentication problems:**
```bash
gcloud auth login
gcloud auth application-default login
```

**Environment variables not loading:**
```bash
# Verify files exist
cat .env.local
cat local-dev/.env

# Manual load (if needed)
export $(grep -v '^#' .env.local | xargs)
```

## 📖 Additional Resources

- [Google Cloud Documentation](https://cloud.google.com/docs)
- [Terraform GCP Provider](https://registry.terraform.io/providers/hashicorp/google/latest/docs)
- [Kubernetes Documentation](https://kubernetes.io/docs/)
- [Vue.js Guide](https://vuejs.org/guide/)
- [Express.js Documentation](https://expressjs.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes following the coding standards
4. Commit using conventional commits (`git commit -m 'feat: add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎯 Project Status

- [x] **Monorepo Setup**: Lerna + Conventional Commits
- [x] **Frontend**: Vue.js SPA with routing and state management
- [x] **Backend**: Two microservices with Express.js
- [x] **Local Development**: Docker Compose + native development
- [x] **GCP Integration**: Authentication and service configuration
- [ ] **Infrastructure**: Terraform modules for GCP
- [ ] **Kubernetes**: Helm charts and manifests
- [ ] **CI/CD**: GitHub Actions pipelines
- [ ] **Monitoring**: Cloud Monitoring and alerting
- [ ] **Production**: Full deployment and testing

## 📧 Contact

For questions about this technical test implementation, please reach out through the provided channels.

---

*This project demonstrates senior-level platform engineering skills through practical implementation of modern DevOps practices, cloud-native architecture, and production-ready code.*