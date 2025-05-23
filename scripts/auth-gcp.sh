#!/bin/bash

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

log_info() { echo -e "${BLUE}ℹ️  $1${NC}"; }
log_success() { echo -e "${GREEN}✅ $1${NC}"; }
log_error() { echo -e "${RED}❌ $1${NC}"; }
log_warning() { echo -e "${YELLOW}⚠️  $1${NC}"; }

echo "🔐 GCP Authentication Setup"
echo "=========================="
echo ""
log_warning "This script ONLY handles authentication."
log_warning "All GCP resources will be created by Terraform."
echo ""

# Check gcloud
if ! command -v gcloud &> /dev/null; then
    log_error "gcloud CLI not found. Install from: https://cloud.google.com/sdk/docs/install"
    exit 1
fi

# Check authentication
log_info "Checking current authentication..."
if gcloud auth list --filter=status:ACTIVE --format="value(account)" --quiet &>/dev/null; then
    current_account=$(gcloud auth list --filter=status:ACTIVE --format="value(account)" | head -n 1)
    log_success "Already authenticated as: $current_account"
    
    echo ""
    echo "Options:"
    echo "1) Keep current authentication"
    echo "2) Switch to different account"
    echo "3) Use service account key file"
    read -p "Choice [1-3]: " auth_choice
else
    echo ""
    echo "Authentication required. Choose method:"
    echo "1) Personal account login"
    echo "2) Service account key file"
    read -p "Choice [1-2]: " auth_choice
    auth_choice=$((auth_choice + 1))  # Adjust for menu
fi

case $auth_choice in
    1)
        log_info "Using current authentication"
        ;;
    2)
        log_info "Authenticating with personal account..."
        gcloud auth login
        gcloud auth application-default login
        ;;
    3)
        read -p "Path to service account key file: " key_file
        if [ ! -f "$key_file" ]; then
            log_error "Key file not found: $key_file"
            exit 1
        fi
        export GOOGLE_APPLICATION_CREDENTIALS="$key_file"
        gcloud auth activate-service-account --key-file="$key_file"
        ;;
esac

# Just set project - no resource creation
log_info "Available projects:"
gcloud projects list --format="table(projectId,name)" --limit=10

echo ""
read -p "Enter Project ID to use (default: nahuelgabe-test): " PROJECT_ID
PROJECT_ID=${PROJECT_ID:-nahuelgabe-test}

log_info "Setting active project: $PROJECT_ID"
gcloud config set project "$PROJECT_ID"

# Verify project access
if gcloud projects describe "$PROJECT_ID" &>/dev/null; then
    log_success "Project access verified: $PROJECT_ID"
else
    log_error "Cannot access project: $PROJECT_ID"
    exit 1
fi

log_success "Authentication setup completed!"
echo ""
echo "📋 Summary:"
echo "- Active Account: $(gcloud auth list --filter=status:ACTIVE --format='value(account)' | head -n 1)"
echo "- Active Project: $PROJECT_ID"
echo ""
echo "🚀 Next steps:"
echo "1. Create environment files: ./scripts/create-env-local.sh $PROJECT_ID"
echo "2. Start local development: npm run dev:local"
echo "3. When ready for infrastructure: cd infrastructure/terraform && terraform plan"
