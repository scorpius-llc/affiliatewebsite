#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONTAINER_NAME="${THERMAPEAK_LOCAL_CONTAINER_NAME:-thermapeak-local-dev}"
PORT="${THERMAPEAK_LOCAL_PORT:-3000}"
NODE_IMAGE="${THERMAPEAK_LOCAL_NODE_IMAGE:-node:20-alpine}"
NODE_MODULES_VOLUME="${THERMAPEAK_LOCAL_NODE_MODULES_VOLUME:-thermapeak-local-node-modules}"

if ! command -v docker >/dev/null 2>&1; then
  echo "Docker is required for the local ThermaPeak dev container." >&2
  exit 1
fi

if docker ps -a --format '{{.Names}}' | grep -qx "$CONTAINER_NAME"; then
  echo "A container named $CONTAINER_NAME already exists."
  echo "Stop it first with: docker stop $CONTAINER_NAME"
  exit 1
fi

cat <<EOF
Starting ThermaPeak local dev container.

URL:
  http://localhost:${PORT}

Notes:
  - Source files are bind-mounted from: ${ROOT_DIR}
  - node_modules are kept in Docker volume: ${NODE_MODULES_VOLUME}
  - Stop this run configuration to stop the container.
EOF

exec docker run --rm \
  --name "$CONTAINER_NAME" \
  -p "${PORT}:3000" \
  -e CHOKIDAR_USEPOLLING=true \
  -e WATCHPACK_POLLING=true \
  -v "${ROOT_DIR}:/work" \
  -v "${NODE_MODULES_VOLUME}:/work/node_modules" \
  -w /work \
  "$NODE_IMAGE" \
  sh -lc "npm install && npm run dev -- --hostname 0.0.0.0"
