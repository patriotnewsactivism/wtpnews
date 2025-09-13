#!/usr/bin/env bash
# scripts/purge-lfs.sh
# Fully remove Git LFS usage from repo history and stop tracking going forward.
# WARNING: Rewrites history. Coordinate and ensure backups.

set -euo pipefail

bold() { printf "\033[1m%s\033[0m\n" "$*"; }
err()  { printf "\033[31m%s\033[0m\n" "$*" 1>&2; }

# --- Preconditions ---
if ! git rev-parse --git-dir >/dev/null 2>&1; then
  err "Not a Git repository. Run inside a repo."; exit 1
fi

if ! command -v git-lfs >/dev/null 2>&1 && ! command -v git lfs >/dev/null 2>&1; then
  err "Git LFS not installed. Install it first."; exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  err "Working tree or index has changes. Commit or stash before proceeding."; exit 1
fi

# --- Config ---
# Extend as needed for filetypes you never want in LFS.
UNTRACK=(
  "**/*.md"
  "**/*.json"
  "**/*.yml" "**/*.yaml"
  "**/*.ts" "**/*.tsx" "**/*.js" "**/*.jsx"
  "**/*.css" "**/*.scss"
  "**/*.txt"
)

REMOTE="origin"
DATE=$(date +%Y%m%d-%H%M%S)
BACKUP_BRANCH="backup/pre-lfs-clean-${DATE}"
BACKUP_TAG="pre-lfs-clean-${DATE}"

bold "1) Creating safety branch & tag: ${BACKUP_BRANCH}, ${BACKUP_TAG}" 
# Why: quick rollback if anything surprises you.
CURRENT=$(git rev-parse --abbrev-ref HEAD)

git branch "${BACKUP_BRANCH}" || true
git tag -a "${BACKUP_TAG}" -m "Pre-LFS-clean snapshot ${DATE}" || true

bold "2) Current LFS tracking rules (.gitattributes):"
( git lfs track || true )

bold "3) Untracking text/code globs from LFS (future commits)"
for pat in "${UNTRACK[@]}"; do
  git lfs untrack "$pat" >/dev/null 2>&1 || true
  # Not fatal if it wasn't tracked.
  done

# Keep .gitattributes tidy if now empty.
if [[ -f .gitattributes ]] && [[ ! -s .gitattributes ]]; then
  rm -f .gitattributes
fi

git add .gitattributes 2>/dev/null || true
if ! git diff --cached --quiet; then
  git commit -m "chore: stop tracking text/code via Git LFS" >/dev/null
  bold "Committed untracking change on ${CURRENT}."
else
  bold "No untracking changes to commit."
fi

bold "4) Rewriting ENTIRE history: convert all LFS pointers to normal Git blobs"
# Why: ensures no LFS pointers remain anywhere in history.
# --everything covers all refs (branches, tags). Consider pruning refs beforehand if desired.

git lfs migrate export --everything

bold "5) Verifying migration"
# Working tree should have no LFS-managed files.
if git lfs ls-files | grep -q .; then
  err "LFS-managed files still present in working tree. Investigate patterns or custom attributes."; exit 1
else
  bold "No LFS-managed files in working tree."
fi

# History-level summary
( git lfs migrate info --everything || true )

bold "6) Force-pushing rewritten history (branches & tags)"
# NOTE: May require temporarily disabling branch protection.

git remote show "${REMOTE}" >/dev/null 2>&1 || { err "Remote '${REMOTE}' not found."; exit 1; }

echo
bold "About to push with history rewrite to '${REMOTE}'."
read -r -p "Type 'I understand' to continue: " CONFIRM
[[ "${CONFIRM}" == "I understand" ]] || { err "Confirmation failed."; exit 1; }

git push --force-with-lease "${REMOTE}" --all
# Some hosters require force for tags explicitly.
( git push --force "${REMOTE}" --tags ) || true

bold "7) Post-ops"
echo "- Ask teammates to reclone or hard-reset to new history."
echo "- Close/reopen PRs created before rewrite; update forks."
echo "- Optional: contact your Git hosting support to reclaim LFS storage (GC may be delayed)."

echo
bold "Done. Rollback: 'git checkout ${BACKUP_BRANCH}' or 'git reset --hard ${BACKUP_TAG}'."