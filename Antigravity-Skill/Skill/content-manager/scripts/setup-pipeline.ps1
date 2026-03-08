# setup-pipeline.ps1
# Creates the content pipeline folder structure and verifies tool installation
# Usage: .\setup-pipeline.ps1 [-BasePath "C:\Users\cschi\Documents\content-pipeline"]

param(
    [string]$BasePath = "C:\Users\cschi\Documents\content-pipeline"
)

Write-Host "=== Content Pipeline Setup ===" -ForegroundColor Cyan
Write-Host ""

# ── Step 1: Create folder structure ──
Write-Host "[1/3] Creating folder structure..." -ForegroundColor Yellow

$folders = @(
    "1-inbox",
    "2-processing",
    "3-editor\outbox",
    "3-editor\inbox",
    "4-post-production",
    "5-content",
    "6-publish-queue",
    "archive"
)

foreach ($folder in $folders) {
    $fullPath = Join-Path $BasePath $folder
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "  Created: $folder" -ForegroundColor Green
    } else {
        Write-Host "  Exists:  $folder" -ForegroundColor DarkGray
    }
}

Write-Host ""

# ── Step 2: Verify tools ──
Write-Host "[2/3] Checking required tools..." -ForegroundColor Yellow

$tools = @{
    "ffmpeg" = @{
        required = $true
        install = "winget install Gyan.FFmpeg"
        purpose = "Video cutting, shorts extraction, outtake removal"
    }
    "ffprobe" = @{
        required = $true
        install = "(included with FFmpeg)"
        purpose = "Video metadata extraction"
    }
    "whisper" = @{
        required = $true
        install = "pip install openai-whisper"
        purpose = "Audio transcription"
    }
}

$allGood = $true
foreach ($tool in $tools.GetEnumerator()) {
    $found = Get-Command $tool.Key -ErrorAction SilentlyContinue
    if ($found) {
        Write-Host "  ✓ $($tool.Key) — installed" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $($tool.Key) — NOT FOUND" -ForegroundColor Red
        Write-Host "    Install: $($tool.Value.install)" -ForegroundColor DarkYellow
        Write-Host "    Purpose: $($tool.Value.purpose)" -ForegroundColor DarkGray
        $allGood = $false
    }
}

Write-Host ""

# ── Step 3: Create README ──
Write-Host "[3/3] Creating pipeline README..." -ForegroundColor Yellow

$readme = @"
# Content Pipeline

Drop raw footage → get publish-ready content ecosystem.

## Quick Start

1. Drop raw video into `1-inbox/[YYYY-MM-DD]_[topic]/`
2. Optionally add `notes.txt` with context
3. System processes automatically (or trigger manually)
4. Review and polish in `6-publish-queue/`
5. Publish and move to `archive/`

## Folder Guide

| Folder | What's In It |
|--------|-------------|
| `1-inbox/` | Drop raw footage here |
| `2-processing/` | System works here (transcripts, outtake detection) |
| `3-editor/outbox/` | Clean cuts waiting for your editor |
| `3-editor/inbox/` | Editor drops finished work here |
| `4-post-production/` | Shorts, thumbnails, descriptions |
| `5-content/` | Written content (LinkedIn, X, newsletter, blog) |
| `6-publish-queue/` | Everything ready for final polish + publish |
| `archive/` | Completed campaigns |

## Running the Watcher

```powershell
.\content-pipeline-watcher.ps1
```

## Manual Processing

```powershell
# Transcribe
.\transcribe.ps1 -VideoPath "path\to\video.mp4"

# Detect outtakes
.\detect-outtakes.ps1 -VideoPath "path\to\video.mp4" -TranscriptPath "path\to\transcript.txt"

# Create clean cut
.\create-clean-cut.ps1 -VideoPath "path\to\video.mp4" -OuttakesLog "path\to\outtakes_log.json"
```

## System Documentation

Full system spec: `Antigravity-Skill/Skill/content-manager/SYSTEM.md`
"@

$readmePath = Join-Path $BasePath "README.md"
$readme | Out-File $readmePath -Encoding utf8
Write-Host "  Created: README.md" -ForegroundColor Green

Write-Host ""
Write-Host "=== Setup Complete ===" -ForegroundColor Green
Write-Host "Pipeline root: $BasePath"

if ($allGood) {
    Write-Host "All tools installed. Ready to process footage." -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "Some tools are missing. Install them before processing footage." -ForegroundColor Yellow
    Write-Host "The pipeline will still work for steps that don't need the missing tools." -ForegroundColor DarkGray
}

Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Install any missing tools listed above"
Write-Host "  2. Drop a test video into: $BasePath\1-inbox\$(Get-Date -Format 'yyyy-MM-dd')_test-run\"
Write-Host "  3. Run: .\content-pipeline-watcher.ps1"
Write-Host "  4. Or process manually using the scripts in Antigravity-Skill\Skill\content-manager\scripts\"
