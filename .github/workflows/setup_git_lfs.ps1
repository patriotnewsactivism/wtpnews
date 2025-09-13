# TL;DR

Enable Git LFS locally in the `wtpnews` repo, track large media types, commit `.gitattributes`, and push. Optional: migrate existing large files to LFS (history rewrite).

---

## Plan (pseudocode)

1. Verify we’re in a Git repo named `wtpnews` and that `git` exists.
2. Install `git-lfs` (macOS Homebrew / Debian/Ubuntu APT / Fedora DNF / Arch pacman). If not possible, print manual instructions.
3. Run `git lfs install` once per machine.
4. Track common newsroom asset types with LFS: images, audio, video, design binaries.
5. Stage and commit the generated `.gitattributes`.
6. Push to the current branch (set upstream if missing).
7. (Optional) If large binaries already live in history, run a guarded `git lfs migrate import` for specific patterns, create a safety tag, and force-push with lease.

---

## Bash (macOS/Linux): `scripts/setup_git_lfs.sh`

```bash
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
```

---

## PowerShell (Windows): `scripts/setup_git_lfs.ps1`

```powershell
# scripts/setup_git_lfs.ps1
$ErrorActionPreference = 'Stop'

function Require-Cmd($name) {
  if (-not (Get-Command $name -ErrorAction SilentlyContinue)) {
    Write-Error "Missing: $name"
  }
}

Require-Cmd git

# Ensure in a git repo
$repoRoot = (& git rev-parse --show-toplevel) 2>$null
if (-not $repoRoot) { throw "Run this inside your local clone of the repository." }
Set-Location $repoRoot

# Install git-lfs
if (-not (Get-Command git-lfs -ErrorAction SilentlyContinue)) {
  if (Get-Command winget -ErrorAction SilentlyContinue) {
    winget install --id GitHub.GitLFS -e --silent
  } elseif (Get-Command choco -ErrorAction SilentlyContinue) {
    choco install git-lfs -y
  } else {
    throw "Install git-lfs manually: https://git-lfs.com"
  }
}

& git lfs install

$patterns = @(
  '*.png','*.jpg','*.jpeg','*.gif','*.webp','*.tiff',
  '*.mp4','*.mov','*.mkv',
  '*.wav','*.mp3','*.flac',
  '*.psd','*.ai'
)

foreach ($p in $patterns) { & git lfs track $p }

if (Test-Path .gitattributes) { & git add .gitattributes }

# Commit if needed
if (-not (& git diff --cached --quiet $null)) {
  & git commit -m "chore: enable Git LFS for media assets"
} else {
  Write-Host "No changes to commit (LFS patterns may already be set)."
}

# Push
$current = (& git symbolic-ref --short HEAD).Trim()
$hasUpstream = (& git rev-parse --abbrev-ref --symbolic-full-name '@{u}' 2>$null)
if ($hasUpstream) { & git push }
else {
  $origin = (& git remote get-url origin 2>$null)
  if ($origin) { & git push --set-upstream origin $current }
  else { Write-Error "No 'origin' remote. Add one then push: git remote add origin <URL> && git push -u origin $current" }
}

Write-Host "Done. Git LFS enabled and patterns tracked."
```

---

## Optional: migrate existing files into LFS (history rewrite)

> **Why this matters:** if large binaries already live in past commits, enabling LFS now won’t retroactively move them. Migration rewrites history—coordinate with collaborators.

### Bash: `scripts/migrate_existing_files.sh`

```bash
#!/usr/bin/env bash
# scripts/migrate_existing_files.sh
set -euo pipefail

require_cmd() { command -v "$1" >/dev/null 2>&1 || { echo "Missing: $1"; exit 1; }; }
require_cmd git; require_cmd git-lfs

# Safety tag for rollback
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
```

---

## Usage

1. Clone or open your local `wtpnews` repo.
2. Run the OS-appropriate setup script from repo root:

   * macOS/Linux: `bash scripts/setup_git_lfs.sh`
   * Windows: `pwsh -File scripts/setup_git_lfs.ps1`
3. Commit & push happens automatically if `.gitattributes` changed.
4. (If needed) migrate old binaries with `bash scripts/migrate_existing_files.sh`.

**Notes**

* Adjust tracked patterns to fit your assets.
* GitHub LFS storage/bandwidth quotas apply; check your plan.
* Coordinate before migration—collaborators must re-clone after history rewrite.

---

## Git Bash: clone & navigate to `patriotnewsactivism/wtpnews`

**You don’t `cd` to a URL.** You clone the repo once, then `cd` into the local folder.

### If you DON’T have it locally yet

```bash
# 1) Pick where you want the folder (example uses C:\dev)
mkdir -p /c/dev && cd /c/dev

# 2) Clone (HTTPS)
git clone https://github.com/patriotnewsactivism/wtpnews.git
#   or SSH (requires configured SSH key)
# git clone git@github.com:patriotnewsactivism/wtpnews.git

# 3) Go into it
cd wtpnews

# 4) Sanity checks
pwd              # show current path
git remote -v    # verify origin URL
git branch --show-current
```

### If you ALREADY cloned it

```bash
# Find where you put it
cd /c           # go to C: drive root
# cd /d         # go to D: drive root (if applicable)
# Use ls to explore; then, for example:
cd /c/dev/wtpnews
```

### Open the repo page in your browser (optional)

```bash
start https://github.com/patriotnewsactivism/wtpnews
```

### Notes

* In Git Bash, Windows drives map like `/c/Users/<you>/...`.
* If the repo is private and you use HTTPS, GitHub will prompt for a Personal Access Token (not your password).

---

## Fix: PowerShell `else` error you hit

* You ran the `if (...) { ... }` block, then pressed Enter and typed `else {` at a **new prompt**. PowerShell doesn’t keep the block open, so `else` alone errors.
* Paste the **entire** `if { ... } else { ... }` in one go, or retype `if` + `else` together.

Example (single paste):

```powershell
if ($hasUpstream) {
  git push
} else {
  $origin = (& git remote get-url origin 2>$null)
  if ($origin) { git push --set-upstream origin $current }
  else { Write-Error "No 'origin' remote. Add one then push: git remote add origin <URL> && git push -u origin $current" }
}
```

---

## Fix: Push rejected — 100MB file in `node_modules`

**What happened**: `node_modules/@next/swc-linux-x64-gnu/next-swc.linux-x64-gnu.node` (136MB) was committed. GitHub blocks files >100MB. These are build/deps; they should not be in Git history or LFS.

### Step 1 — Add a proper `.gitignore` (Next.js / Node)

Create `.gitignore` at repo root:

```gitignore
# Node
node_modules/
.npm/

# Next.js
.next/
out/
.vercel/

# Build / tooling
coverage/
dist/
.turbo/
.cache/

# Logs
npm-debug.log*
yarn-debug.log*
yarn-error.log*
*.log

# Env
.env
.env.*
!.env.example

# OS/editor
.DS_Store
Thumbs.db
.vscode/
.idea/
```

Commit it:

```powershell
git add .gitignore
git commit -m "chore: add .gitignore for Node/Next"
```

### Step 2 — Stop tracking accidental folders (keep them on disk)

```powershell
# Remove from the index, keep files locally
git rm -r --cached node_modules .next out .turbo 2>$null
git commit -m "chore: stop tracking node_modules and build artifacts"
```

Try to push now:

```powershell
git push origin main
```

If it still rejects: the large file exists **earlier in history**. Proceed to Step 3.

### Step 3 — Purge large deps from history (safe, targeted)

> This rewrites history. Coordinate with collaborators; they’ll need to re-clone or `git fetch --all && git reset --hard origin/main` after the push.

**Option A: `git filter-repo` (recommended)**

1. Check/install:

```powershell
git filter-repo -h 2>$null || pip install git-filter-repo
```

2. Rewrite to drop deps and native binaries:

```powershell
# Make a safety tag
$tag = "pre-node-prune-$(Get-Date -Format yyyyMMdd-HHmmss)"
git tag $tag

# Remove paths across the entire history
python -m git_filter_repo --path node_modules/ --path .next/ --path out/ --path-glob "*.node" --invert-paths --force

# Push rewritten history
git push --force-with-lease origin main
git push --force origin --tags
```

**Option B: BFG Repo-Cleaner (if Java installed, super simple)**

```powershell
# Using a bare mirror is the cleanest
cd ..
git clone --mirror https://github.com/patriotnewsactivism/wtpnews.git wtpnews.git
java -jar bfg.jar --delete-folders node_modules --delete-files "*.node" wtpnews.git
cd wtpnews.git
git reflog expire --expire=now --all && git gc --prune=now --aggressive
git push --force
```

### Step 4 — Keep LFS for **media only**

LFS is great for assets like `*.psd`, `*.ai`, `*.mp4`, `*.wav`. Don’t put `node_modules` in LFS.

### Quick verification

```powershell
# Ensure nothing huge remains in HEAD
git ls-files -s | findstr /i ".node"
# Check what's tracked by LFS
git lfs track
# Check size of the repo pack after GC (optional)
git gc --aggressive --prune=now
```

---

## Optional: strict pre-commit guard to avoid re-adding `node_modules`

Add `.git/hooks/pre-commit` (no extension), make it executable:

```bash
#!/usr/bin/env bash
set -euo pipefail
if git diff --cached --name-only | grep -E '^(node_modules/|\.next/|out/|.*\.node$)'; then
  echo "Blocked: attempting to commit build/dependency artifacts." >&2
  exit 1
fi
```
