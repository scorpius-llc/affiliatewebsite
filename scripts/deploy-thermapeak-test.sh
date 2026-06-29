#!/usr/bin/env bash

set -euo pipefail

PROJECT_ID="thermapeak"
REGION="us-east1"
SERVICE_NAME="thermapeak-test"
IMAGE="us-east1-docker.pkg.dev/thermapeak/thermapeak-repo/thermapeak-test"
SDK_BIN="$HOME/Downloads/google-cloud-sdk/bin"

if [ -d "$SDK_BIN" ]; then
  export PATH="$SDK_BIN:$PATH"
fi

require_command() {
  local name="$1"
  if ! command -v "$name" >/dev/null 2>&1; then
    echo "Missing required command: $name" >&2
    exit 2
  fi
}

require_command gcloud

ACTIVE_PROJECT="$(gcloud config get-value project 2>/dev/null || true)"
if [ "$ACTIVE_PROJECT" != "$PROJECT_ID" ]; then
  gcloud config set project "$PROJECT_ID"
fi

if ! gcloud auth list --filter=status:ACTIVE --format='value(account)' | grep -q .; then
  echo "No active gcloud account. Run: gcloud auth login thomas@scorpius-llc.com" >&2
  exit 2
fi

gcloud builds submit \
  --project "$PROJECT_ID" \
  --tag "$IMAGE" \
  .

gcloud run deploy "$SERVICE_NAME" \
  --project "$PROJECT_ID" \
  --region "$REGION" \
  --image "$IMAGE" \
  --platform managed \
  --allow-unauthenticated \
  --port 8080 \
  --memory 256Mi \
  --cpu 1 \
  --concurrency 80 \
  --max-instances 10 \
  --timeout 300
