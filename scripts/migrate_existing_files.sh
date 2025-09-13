#!/usr/bin/env bash
# scripts/migrate_existing_files.sh
set -euo pipefail

require_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1"; exit 1; }; }
require_cmd git
require_cmd git-lfs

TAG="pre-lfs-migration-$(date +%Y%m%d-%H%M%S)"

echo "Tagging current state as $TAG"
git tag "$TAG"

echo "Running LFS migration (this rewrites history)"
INCLUDE_PATTERNS="*.png,*.jpg,*.jpeg,*.gif,*.webp,*.tiff,*.mp4,*.mov,*.mkv,*.wav,*.mp3,*.flac,*.psd,*.ai"

git lfs migrate import --include="$INCLUDE_PATTERNS"

echo "Pushing rewritten history (force-with-lease)"
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
if git remote get-url origin >/dev/null 2>&1; then
  git push --force-with-lease origin "$CURRENT_BRANCH"
  git push --force --tags origin
else
  echo "No origin remote found. Add it and push manually." >&2
fi

echo "Migration complete. If issues arise, you can rollback: git reset --hard $TAG && git push --force-with-lease"
