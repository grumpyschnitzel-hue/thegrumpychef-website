# transcribe.ps1
# Transcribes video/audio using Whisper and generates clean transcript
# Usage: .\transcribe.ps1 -VideoPath "C:\path\to\video.mp4" [-Model "medium"] [-OutputDir "C:\path\to\output"]

param(
    [Parameter(Mandatory=$true)]
    [string]$VideoPath,

    [string]$OutputDir = (Split-Path $VideoPath),

    [ValidateSet("tiny","base","small","medium","large","large-v2","large-v3")]
    [string]$Model = "medium",

    [switch]$WordTimestamps
)

# Validate input
if (-not (Test-Path $VideoPath)) {
    Write-Error "Video file not found: $VideoPath"
    exit 1
}

$fileName = [System.IO.Path]::GetFileNameWithoutExtension($VideoPath)

# Resolve FFmpeg path
$ffmpeg = "ffmpeg"
if (-not (Get-Command $ffmpeg -ErrorAction SilentlyContinue)) {
    $wingetPath = "$env:LOCALAPPDATA\Microsoft\WinGet\Packages\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\ffmpeg-8.0.1-full_build\bin\ffmpeg.exe"
    if (Test-Path $wingetPath) { $ffmpeg = $wingetPath }
}

Write-Host "=== Transcription ===" -ForegroundColor Cyan
Write-Host "Input: $VideoPath"
Write-Host "Model: $Model"
Write-Host "Output: $OutputDir"
Write-Host "Using FFmpeg at: $ffmpeg"
Write-Host ""

# Step 1: Extract audio (WAV, 16kHz mono — optimal for Whisper)
$audioPath = Join-Path $OutputDir "audio_temp.wav"
Write-Host "[1/3] Extracting audio..." -ForegroundColor Yellow

$ffmpegArgs = @("-i", $VideoPath, "-vn", "-acodec", "pcm_s16le", "-ar", "16000", "-ac", "1", $audioPath, "-y")
$process = Start-Process $ffmpeg -ArgumentList $ffmpegArgs -Wait -PassThru -NoNewWindow -RedirectStandardError (Join-Path $OutputDir "ffmpeg_log.txt")

if ($process.ExitCode -ne 0) {
    Write-Error "FFmpeg audio extraction failed. Check ffmpeg_log.txt"
    exit 1
}

Write-Host "  Audio extracted: $audioPath" -ForegroundColor Green

# Step 2: Run Whisper
Write-Host "[2/3] Running Whisper ($Model model)..." -ForegroundColor Yellow

$whisperArgs = @($audioPath, "--model", $Model, "--language", "en", "--output_format", "all", "--output_dir", $OutputDir)
if ($WordTimestamps) {
    $whisperArgs += "--word_timestamps"
    $whisperArgs += "True"
}

$whisperProcess = Start-Process whisper -ArgumentList $whisperArgs -Wait -PassThru -NoNewWindow
if ($whisperProcess.ExitCode -ne 0) {
    Write-Error "Whisper transcription failed."
    exit 1
}

Write-Host "  Transcription complete." -ForegroundColor Green

# Step 3: Generate clean transcript
Write-Host "[3/3] Generating clean transcript..." -ForegroundColor Yellow

$rawTranscript = Join-Path $OutputDir "audio_temp.txt"
$cleanTranscriptPath = Join-Path $OutputDir "transcript_clean.md"

if (Test-Path $rawTranscript) {
    $rawText = Get-Content $rawTranscript -Raw

    # Clean up filler words
    $fillerWords = @("um,", "uh,", "like,", "you know,", "I mean,", "sort of,", "kind of,", "basically,")
    $cleanText = $rawText
    foreach ($filler in $fillerWords) {
        $cleanText = $cleanText -replace "\b$([regex]::Escape($filler))\s*", ""
    }

    # Write clean transcript
    $header = @"
# Transcript: $fileName
**Date:** $(Get-Date -Format 'yyyy-MM-dd')
**Source:** $VideoPath
**Model:** Whisper $Model

---

$cleanText
"@

    $header | Out-File $cleanTranscriptPath -Encoding utf8

    # Copy raw as backup
    Copy-Item $rawTranscript (Join-Path $OutputDir "transcript_raw.txt") -Force

    Write-Host "  Clean transcript: $cleanTranscriptPath" -ForegroundColor Green
}

# Cleanup temp audio
Remove-Item $audioPath -ErrorAction SilentlyContinue
Remove-Item (Join-Path $OutputDir "ffmpeg_log.txt") -ErrorAction SilentlyContinue

Write-Host ""
Write-Host "=== Done ===" -ForegroundColor Green
Write-Host "Raw transcript: $(Join-Path $OutputDir 'transcript_raw.txt')"
Write-Host "Clean transcript: $cleanTranscriptPath"
Write-Host "SRT subtitles: $(Join-Path $OutputDir 'audio_temp.srt')"
