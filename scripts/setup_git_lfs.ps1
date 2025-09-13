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
