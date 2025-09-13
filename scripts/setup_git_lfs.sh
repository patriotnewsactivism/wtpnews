#!/usr/bin/env bash
# scripts/setup_git_lfs.sh
set -euo pipefail

require_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1"; exit 1; }; }

require_cmd git

# Ensure we're in a git repo
REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null || true)
if [[ -z "${REPO_ROOT}" ]]; then
  echo "Run this inside your local clone of the repository." >&2
  exit 1
fi
cd "${REPO_ROOT}"

REPO_NAME=$(basename "${REPO_ROOT}")
if [[ "${REPO_NAME}" != "wtpnews" ]]; then
  echo "Repo is '${REPO_NAME}', not 'wtpnews'. Continuing anyway." >&2
fi

install_git_lfs() {
  if command -v git-lfs >/dev/null 2>&1; then
    echo "git-lfs already installed"
    return
  fi

  OS=$(uname -s)
  case "$OS" in
    Darwin)
      if command -v brew >/dev/null 2>&1; then
        brew install git-lfs
      else
        echo "Homebrew not found. Install from https://brew.sh or download LFS: https://git-lfs.com" >&2
        exit 1
      fi
      ;;
    Linux)
      if command -v apt-get >/dev/null 2>&1; then
        sudo apt-get update -y && sudo apt-get install -y git-lfs
      elif command -v dnf >/dev/null 2>&1; then
        sudo dnf install -y git-lfs
      elif command -v yum >/dev/null 2>&1; then
        sudo yum install -y git-lfs
      elif command -v pacman >/dev/null 2>&1; then
        sudo pacman -S --noconfirm git-lfs
      else
        echo "Unsupported package manager. Install git-lfs manually: https://git-lfs.com" >&2
        exit 1
      fi
      ;;
    *)
      echo "Unsupported OS: $OS. Install git-lfs manually: https://git-lfs.com" >&2
      exit 1
      ;;
  esac
}

install_git_lfs

git lfs install

# Customize patterns as needed
PATTERNS=(
  "*.png" "*.jpg" "*.jpeg" "*.gif" "*.webp" "*.tiff"
  "*.mp4" "*.mov" "*.mkv"
  "*.wav" "*.mp3" "*.flac"
  "*.psd" "*.ai"
)

for p in "${PATTERNS[@]}"; do
  git lfs track "$p"
done

# Ensure .gitattributes is added
if [[ -f .gitattributes ]]; then
  git add .gitattributes
fi

# Commit if needed
if ! git diff --cached --quiet; then
  git commit -m "chore: enable Git LFS for media assets"
else
  echo "No changes to commit (LFS patterns may already be set)."
fi

# Push (set upstream if missing)
CURRENT_BRANCH=$(git symbolic-ref --short HEAD)
if git rev-parse --abbrev-ref --symbolic-full-name @{u} >/dev/null 2>&1; then
  git push
else
  if git remote get-url origin >/dev/null 2>&1; then
    git push --set-upstream origin "$CURRENT_BRANCH"
  else
    echo "No 'origin' remote. Add one, then push: git remote add origin <URL> && git push -u origin $CURRENT_BRANCH" >&2
  fi
fi

echo "Done. Git LFS enabled and patterns tracked."
