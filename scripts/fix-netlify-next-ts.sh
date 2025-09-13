#!/usr/bin/env bash
# File: scripts/fix-netlify-next-ts.sh
# Purpose: Fix Netlify build error "Please install @types/react and @types/node" for Next.js.
# Why: Netlify fails when a tsconfig.json exists but TS type packages are missing.

set -euo pipefail

FORCE_MODE=""
if [[ "${1:-}" == "--force-ts" ]]; then
  FORCE_MODE="ts"
elif [[ "${1:-}" == "--force-js" ]]; then
  FORCE_MODE="js"
fi

has_ts_files() {
  git ls-files | grep -E '\\.(ts|tsx)$' >/dev/null 2>&1
}

has_tsconfig() {
  [[ -f tsconfig.json ]]
}

pm() {
  # Why: Netlify log shows npm; keep it simple & predictable.
  echo npm
}

install_typescript_deps() {
  echo "→ Installing TypeScript dev deps (typescript @types/react @types/node)"
  $(pm) install --save-dev typescript @types/react @types/node
}

ensure_tsconfig() {
  if ! has_tsconfig; then
    echo "→ Creating minimal tsconfig.json compatible with Next.js"
    cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "preserve",
    "allowJs": true,
    "strict": true,
    "noEmit": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx"
  ],
  "exclude": ["node_modules"]
}
JSON
  fi
}

remove_ts_setup() {
  echo "→ Removing TypeScript config to build as plain JS"
  rm -f tsconfig.json next-env.d.ts
}

main() {
  echo "Fixing Netlify Next.js TypeScript setup…"

  if [[ "$FORCE_MODE" == "ts" ]]; then
    install_typescript_deps
    ensure_tsconfig
    echo "✔ TS mode forced. Commit changes and redeploy."
    exit 0
  fi

  if [[ "$FORCE_MODE" == "js" ]]; then
    remove_ts_setup
    echo "✔ JS mode forced. Commit changes and redeploy."
    exit 0
  fi

  if has_tsconfig || has_ts_files; then
    # Project is (or was) TS-enabled. Install required type packages.
    install_typescript_deps
    ensure_tsconfig
    echo "✔ Added missing TypeScript deps & config. Commit and redeploy."
  else
    # No TS files and no tsconfig → nothing to fix.
    echo "✔ No TypeScript detected. Nothing to change. If Netlify still fails, run with --force-js."
  fi
}

main "$@"
