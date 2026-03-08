# content-pipeline-watcher.ps1
# Watches 1-inbox/ for new folders and triggers the Content Manager pipeline
# Usage: .\content-pipeline-watcher.ps1 [-BasePath "C:\path\to\content-pipeline"]

param(
    [string]$BasePath = "C:\Users\cschi\Documents\content-pipeline"
)

$inboxPath = Join-Path $BasePath "1-inbox"
$processingPath = Join-Path $BasePath "2-processing"

# Ensure paths exist
if (-not (Test-Path $inboxPath)) {
    Write-Error "Inbox path not found: $inboxPath. Run Quick Start setup first."
    exit 1
}

Write-Host "=== Content Pipeline Watcher ===" -ForegroundColor Gold
Write-Host "Monitoring: $inboxPath" -ForegroundColor Cyan
Write-Host "Press Ctrl+C to stop." -ForegroundColor DarkGray
Write-Host ""

# File system watcher
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $inboxPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true
$watcher.NotifyFilter = [System.IO.NotifyFilters]::FileName -bor [System.IO.NotifyFilters]::DirectoryName

$processedFolders = @{}

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $name = $Event.SourceEventArgs.Name
    $changeType = $Event.SourceEventArgs.ChangeType

    # Only trigger on video files
    $videoExtensions = @(".mp4", ".mov", ".mkv", ".avi", ".webm")
    $ext = [System.IO.Path]::GetExtension($path).ToLower()

    if ($videoExtensions -contains $ext) {
        $folder = Split-Path $path
        $folderName = Split-Path $folder -Leaf

        # Don't re-process the same folder
        if (-not $processedFolders.ContainsKey($folderName)) {
            $processedFolders[$folderName] = $true

            Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] New footage detected!" -ForegroundColor Green
            Write-Host "  Folder: $folderName" -ForegroundColor White
            Write-Host "  File: $name" -ForegroundColor White
            Write-Host "  Triggering Phase 1: Ingest..." -ForegroundColor Yellow

            # Option 1: Trigger via Claude Code (uncomment when ready)
            # claude -p "Process new footage at '$folder' using the content-manager system. Run Phase 1: Ingest."

            # Option 2: Trigger via Antigravity (manual for now)
            Write-Host ""
            Write-Host "  ACTION REQUIRED:" -ForegroundColor Red
            Write-Host "  Run in Antigravity or Claude Code:" -ForegroundColor White
            Write-Host "  'Process footage in $folder using content-manager system'" -ForegroundColor Cyan
            Write-Host ""
        }
    }
}

Register-ObjectEvent $watcher "Created" -Action $action | Out-Null

# Keep alive
try {
    while ($true) {
        Start-Sleep -Seconds 2

        # Also check for unprocessed folders (in case watcher missed them)
        $inboxFolders = Get-ChildItem $inboxPath -Directory -ErrorAction SilentlyContinue
        foreach ($folder in $inboxFolders) {
            $hasVideo = Get-ChildItem $folder.FullName -File | Where-Object { @(".mp4",".mov",".mkv",".avi",".webm") -contains $_.Extension.ToLower() }
            if ($hasVideo -and -not $processedFolders.ContainsKey($folder.Name)) {
                $processedFolders[$folder.Name] = $true
                Write-Host "[$(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')] Found unprocessed footage: $($folder.Name)" -ForegroundColor Yellow
                Write-Host "  ACTION REQUIRED: Process this folder manually." -ForegroundColor White
            }
        }
    }
}
finally {
    $watcher.Dispose()
    Write-Host "Watcher stopped." -ForegroundColor DarkGray
}
