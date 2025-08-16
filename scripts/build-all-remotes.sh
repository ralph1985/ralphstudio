#!/usr/bin/env bash
set -euo pipefail

pnpm -C apps/buybuddies run build:remote
pnpm -C apps/bar-manager run build:remote
pnpm -C apps/delivery-manager run build:remote

echo "✅ Remotos listos en public/remotes/*/*/remote.js"
