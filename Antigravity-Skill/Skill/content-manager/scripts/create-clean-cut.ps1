# create-clean-cut.ps1
# Reads outtakes_log.json and creates a clean cut by removing flagged segments
# Usage: .\create-clean-cut.ps1 -VideoPath "C:\path\to\video.mp4" -OuttakesLog "C:\path\to\outtakes_log.json"

param(
    [Parameter(Mandatory=$true)]
    [string]$VideoPath,

    [Parameter(Mandatory=$true)]
    [string]$OuttakesLog,

    [string]$OutputPath,

    [double]$CrossfadeDuration = 0.5
)

# Validate
if (-not (Test-Path $VideoPath)) { Write-Error "Video not found: $VideoPath"; exit 1 }
if (-not (Test-Path $OuttakesLog)) { Write-Error "Outtakes log not found: $OuttakesLog"; exit 1 }

if (-not $OutputPath) {
    $dir = Split-Path $VideoPath
    $OutputPath = Join-Path $dir "clean_cut.mp4"
}

# Resolve FFmpeg path
$ffmpeg = "ffmpeg"
if (-not (Get-Command $ffmpeg -ErrorAction SilentlyContinue)) {
    $wingetPath = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
    if (Test-Path $wingetPath) { $ffmpeg = $wingetPath }
}

# Resolve FFprobe path
$ffprobe = "ffprobe"
if (-not (Get-Command $ffprobe -ErrorAction SilentlyContinue)) {
    $wingetPath = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winet.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffprobe.exe"
    if (Test-Path $wingetPath) { $ffprobe = $wingetPath }
}

Write-Host "=== Clean Cut Generator ===" -ForegroundColor Cyan
Write-Host "Input: $VideoPath"
Write-Host "Outtakes: $OuttakesLog"
Write-Host "Output: $OutputPath"
Write-Host "Crossfade: ${CrossfadeDuration}s"
Write-Host "Using FFmpeg at: $ffmpeg"
Write-Host ""

# Parse outtakes log
$log = Get-Content $OuttakesLog -Raw | ConvertFrom-Json
$outtakes = $log.outtakes | Where-Object { $_.reason -eq "dead_air" -and $_.start -ne "MANUAL_CHECK" }

if ($outtakes.Count -eq 0) {
    Write-Host "No dead air outtakes found. Copying original as clean cut." -ForegroundColor Yellow
    Copy-Item $VideoPath $OutputPath -Force
    Write-Host "Done: $OutputPath"
    exit 0
}

Write-Host "Removing $($outtakes.Count) outtake segments..." -ForegroundColor Yellow

# Get video duration
$durationOutput = & $ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 $VideoPath 2>&1
$totalDuration = [double]$durationOutput

# Convert outtake timestamps to seconds
function ConvertTo-Seconds($timestamp) {
    $parts = $timestamp.Split(":")
    return [int]$parts[0] * 3600 + [int]$parts[1] * 60 + [double]$parts[2]
}

# Build keep segments (everything NOT in an outtake)
$keepSegments = @()
$currentStart = 0

foreach ($outtake in ($outtakes | Sort-Object { ConvertTo-Seconds $_.start })) {
    $outStart = ConvertTo-Seconds $outtake.start
    $outEnd = ConvertTo-Seconds $outtake.end

    if ($outStart -gt $currentStart) {
        $keepSegments += @{
            start = $currentStart
            end = $outStart
            duration = [math]::Round($outStart - $currentStart, 2)
        }
    }
    $currentStart = $outEnd
}

# Add final segment
if ($currentStart -lt $totalDuration) {
    $keepSegments += @{
        start = $currentStart
        end = $totalDuration
        duration = [math]::Round($totalDuration - $currentStart, 2)
    }
}

Write-Host "Keeping $($keepSegments.Count) segments:" -ForegroundColor White
foreach ($seg in $keepSegments) {
    $startTs = [TimeSpan]::FromSeconds($seg.start).ToString("hh\:mm\:ss\.ff")
    $endTs = [TimeSpan]::FromSeconds($seg.end).ToString("hh\:mm\:ss\.ff")
    Write-Host "  $startTs → $endTs ($($seg.duration)s)" -ForegroundColor DarkGray
}

# Build FFmpeg filter complex
$filterParts = @()
$concatInputs = ""
$segIndex = 0

foreach ($seg in $keepSegments) {
    $filterParts += "[0:v]trim=start=$($seg.start):end=$($seg.end),setpts=PTS-STARTPTS[v$segIndex]"
    $filterParts += "[0:a]atrim=start=$($seg.start):end=$($seg.end),asetpts=PTS-STARTPTS[a$segIndex]"
    $concatInputs += "[v$segIndex][a$segIndex]"
    $segIndex++
}

$filterComplex = ($filterParts -join ";") + ";${concatInputs}concat=n=$($keepSegments.Count):v=1:a=1[vout][aout]"

# Run FFmpeg
Write-Host ""
Write-Host "Running FFmpeg..." -ForegroundColor Yellow

$ffmpegArgs = @(
    "-i", $VideoPath,
    "-filter_complex", $filterComplex,
    "-map", "[vout]",
    "-map", "[aout]",
    "-c:v", "libx264",
    "-preset", "medium",
    "-crf", "18",
    "-c:a", "aac",
    "-b:a", "192k",
    $OutputPath,
    "-y"
)

$process = Start-Process $ffmpeg -ArgumentList $ffmpegArgs -Wait -PassThru -NoNewWindow

if ($process.ExitCode -eq 0) {
    # Calculate savings
    $originalSize = (Get-Item $VideoPath).Length / 1MB
    $cleanSize = (Get-Item $OutputPath).Length / 1MB
    $removedTime = ($outtakes | Measure-Object -Property duration_seconds -Sum).Sum

    Write-Host ""
    Write-Host "=== Clean Cut Complete ===" -ForegroundColor Green
    Write-Host "Output: $OutputPath"
    Write-Host "Original duration: $([TimeSpan]::FromSeconds($totalDuration).ToString('hh\:mm\:ss'))"
    Write-Host "Removed: $([math]::Round($removedTime, 1))s of dead air"
    Write-Host "Clean duration: $([TimeSpan]::FromSeconds($totalDuration - $removedTime).ToString('hh\:mm\:ss'))"
    Write-Host "File size: $([math]::Round($originalSize, 1))MB → $([math]::Round($cleanSize, 1))MB"
} else {
    Write-Error "FFmpeg failed. Check the filter complex syntax."
    exit 1
}
