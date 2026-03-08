# detect-outtakes.ps1
# Detects dead air and restart phrases in video/audio, generates outtakes log
# Usage: .\detect-outtakes.ps1 -VideoPath "C:\path\to\video.mp4" [-TranscriptPath "C:\path\to\transcript.txt"]

param(
    [Parameter(Mandatory=$true)]
    [string]$VideoPath,

    [string]$TranscriptPath,

    [string]$OutputPath = (Join-Path (Split-Path $VideoPath) "outtakes_log.json"),

    [int]$SilenceThresholdDb = -30,

    [double]$SilenceMinDuration = 3.0
)

# Validate
if (-not (Test-Path $VideoPath)) {
    Write-Error "Video not found: $VideoPath"
    exit 1
}

Write-Host "=== Outtake Detection ===" -ForegroundColor Cyan
Write-Host "Input: $VideoPath"
Write-Host "Silence threshold: ${SilenceThresholdDb}dB, min duration: ${SilenceMinDuration}s"
Write-Host ""

$outtakes = @()

# ── Step 1: Detect silence using FFmpeg ──
Write-Host "[1/2] Detecting dead air..." -ForegroundColor Yellow

$silenceLog = Join-Path (Split-Path $VideoPath) "silence_detect.txt"
$ffmpegArgs = @(
    "-i", $VideoPath,
    "-af", "silencedetect=noise=${SilenceThresholdDb}dB:d=$SilenceMinDuration",
    "-f", "null", "-"
)

# FFmpeg outputs to stderr
Start-Process ffmpeg -ArgumentList $ffmpegArgs -Wait -NoNewWindow -RedirectStandardError $silenceLog

if (Test-Path $silenceLog) {
    $logContent = Get-Content $silenceLog

    $silenceStart = $null
    foreach ($line in $logContent) {
        if ($line -match "silence_start:\s*([\d\.]+)") {
            $silenceStart = [double]$Matches[1]
        }
        if ($line -match "silence_end:\s*([\d\.]+).*silence_duration:\s*([\d\.]+)") {
            $silenceEnd = [double]$Matches[1]
            $duration = [double]$Matches[2]

            $startTs = [TimeSpan]::FromSeconds($silenceStart).ToString("hh\:mm\:ss")
            $endTs = [TimeSpan]::FromSeconds($silenceEnd).ToString("hh\:mm\:ss")

            $outtakes += @{
                start = $startTs
                end = $endTs
                duration_seconds = [math]::Round($duration, 1)
                reason = "dead_air"
                confidence = 0.95
            }

            Write-Host "  Dead air: $startTs → $endTs (${duration}s)" -ForegroundColor DarkGray
        }
    }

    Remove-Item $silenceLog -ErrorAction SilentlyContinue
}

Write-Host "  Found $($outtakes.Count) silence segments" -ForegroundColor White

# ── Step 2: Detect restart phrases in transcript ──
Write-Host "[2/2] Scanning transcript for restart phrases..." -ForegroundColor Yellow

$restartPhrases = @(
    "let me start over",
    "let me start that over",
    "let me try that again",
    "hold on",
    "wait wait",
    "wait, wait",
    "actually, no",
    "actually no",
    "scratch that",
    "one more time",
    "can we redo",
    "let me redo",
    "that was bad",
    "that sucked",
    "nope, again",
    "cut that"
)

if ($TranscriptPath -and (Test-Path $TranscriptPath)) {
    $transcriptContent = Get-Content $TranscriptPath -Raw

    foreach ($phrase in $restartPhrases) {
        if ($transcriptContent -match [regex]::Escape($phrase)) {
            Write-Host "  Found restart phrase: '$phrase'" -ForegroundColor DarkYellow

            # Note: For precise timestamps, need word-level Whisper output (.json format)
            # This flags the presence — manual timestamp refinement may be needed
            $outtakes += @{
                start = "MANUAL_CHECK"
                end = "MANUAL_CHECK"
                duration_seconds = 0
                reason = "restart_phrase"
                phrase = $phrase
                confidence = 0.75
                note = "Phrase detected in transcript. Check word-level timestamps for precise location."
            }
        }
    }
} else {
    Write-Host "  No transcript provided — skipping phrase detection" -ForegroundColor DarkGray
}

# ── Output ──
$totalSilenceTime = ($outtakes | Where-Object { $_.reason -eq "dead_air" } | Measure-Object -Property duration_seconds -Sum).Sum
$restartCount = ($outtakes | Where-Object { $_.reason -eq "restart_phrase" }).Count

$result = @{
    source = $VideoPath
    analyzed = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
    summary = @{
        total_outtakes = $outtakes.Count
        dead_air_segments = ($outtakes | Where-Object { $_.reason -eq "dead_air" }).Count
        restart_phrases = $restartCount
        total_dead_air_seconds = [math]::Round($totalSilenceTime, 1)
    }
    outtakes = $outtakes
}

$jsonOutput = $result | ConvertTo-Json -Depth 4
$jsonOutput | Out-File $OutputPath -Encoding utf8

Write-Host ""
Write-Host "=== Summary ===" -ForegroundColor Green
Write-Host "Total outtakes: $($outtakes.Count)"
Write-Host "Dead air: $($result.summary.dead_air_segments) segments ($($result.summary.total_dead_air_seconds)s)"
Write-Host "Restart phrases: $restartCount"
Write-Host "Output: $OutputPath"
