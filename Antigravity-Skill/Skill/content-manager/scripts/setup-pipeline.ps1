# setup-pipeline.ps1
param([string]$BasePath = "C:\Users\cschi\Documents\content-pipeline")
Write-Host "=== Content Pipeline Setup ===" -ForegroundColor Cyan
$folders = @("1-inbox","2-processing","3-editor\outbox","3-editor\inbox","4-post-production","5-content","6-publish-queue","archive")
foreach ($f in $folders) {
    $p = Join-Path $BasePath $f
    if (-not (Test-Path $p)) { New-Item -ItemType Directory -Path $p -Force | Out-Null; Write-Host "  Created: $f" -ForegroundColor Green }
    else { Write-Host "  Exists:  $f" -ForegroundColor DarkGray }
}
Write-Host ""
Write-Host "[2/3] Checking tools..." -ForegroundColor Yellow
$allGood = $true
$tools = @("ffmpeg","ffprobe","whisper")
foreach ($t in $tools) {
    if (Get-Command $t -ErrorAction SilentlyContinue) { Write-Host "  [OK] $t" -ForegroundColor Green }
    else { Write-Host "  [MISSING] $t" -ForegroundColor Red; $allGood = $false }
}
Write-Host ""
$readmePath = Join-Path $BasePath "README.md"
"# Content Pipeline" | Out-File $readmePath -Encoding utf8
"Drop raw footage into 1-inbox and use the scripts." | Out-File $readmePath -Append
"Full documentation: Antigravity-Skill/Skill/content-manager/SYSTEM.md" | Out-File $readmePath -Append
Write-Host "=== Setup Complete ===" -ForegroundColor Green
if ($allGood) { Write-Host "Ready to go!" -ForegroundColor Green }
else { Write-Host "Install missing tools first." -ForegroundColor Yellow }
