---
name: content-manager
type: system
description: "Autonomous content pipeline: raw footage → clean edit → editor handoff → shorts + thumbnails + descriptions → transcript → LinkedIn post + Twitter thread + newsletter. The operator drops footage and polishes final output. Everything in between is automated. Triggers on folder watch or manual 'process footage', 'content pipeline', 'run content manager'."
triggers: ["process footage", "content pipeline", "run content manager", "new footage", "process video", "content from video"]
version: 1.0
status: active
---

# Content Manager System

## Purpose
Turn raw footage into a full content ecosystem — automatically. The operator's only jobs are: **record** and **polish + publish**. Everything between those two steps is the system's job.

## The Pipeline (Visual)

```
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  1. DROP     │───▸│  2. CLEAN    │───▸│  3. EDITOR   │───▸│  4. RECEIVE  │
│  Raw footage │    │  Cut outtakes│    │  Send to     │    │  Get back    │
│  into /inbox │    │  Transcribe  │    │  editor      │    │  final cut   │
└─────────────┘    └──────────────┘    └──────────────┘    └──────────────┘
                                                                  │
                   ┌──────────────────────────────────────────────┘
                   ▼
┌─────────────┐    ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
│  5. CLIP    │───▸│  6. ASSETS   │───▸│  7. REPURPOSE│───▸│  8. PUBLISH  │
│  Cut shorts │    │  Thumbnails  │    │  LinkedIn    │    │  Polish +    │
│  15s/30s/60s│    │  Descriptions│    │  X thread    │    │  schedule    │
└─────────────┘    └──────────────┘    │  Newsletter  │    └──────────────┘
                                       └──────────────┘
```

---

## Folder Structure

```
content-pipeline/
├── 1-inbox/                    # DROP raw footage here (trigger)
│   └── [YYYY-MM-DD]_[topic]/   # One folder per recording session
│       ├── raw_footage.mp4
│       └── notes.txt            # Optional: context, key points, timestamps
│
├── 2-processing/               # System moves files here during work
│   └── [YYYY-MM-DD]_[topic]/
│       ├── raw_footage.mp4
│       ├── transcript_raw.txt   # Full whisper transcript
│       ├── transcript_clean.md  # Cleaned, timestamped transcript
│       ├── outtakes_log.json    # Timestamps of dead air / outtakes
│       └── clean_cut.mp4        # Footage with outtakes removed
│
├── 3-editor/                   # Handoff zone for external editor
│   ├── outbox/                 # Clean cuts waiting for editor
│   │   └── [YYYY-MM-DD]_[topic]/
│   │       ├── clean_cut.mp4
│   │       ├── transcript_clean.md
│   │       └── edit_brief.md    # Instructions for editor
│   └── inbox/                  # Editor drops finished work here
│       └── [YYYY-MM-DD]_[topic]/
│           └── final_cut.mp4
│
├── 4-post-production/          # Clips, thumbnails, descriptions
│   └── [YYYY-MM-DD]_[topic]/
│       ├── final_cut.mp4
│       ├── shorts/
│       │   ├── short_01_15s.mp4
│       │   ├── short_02_30s.mp4
│       │   └── short_03_60s.mp4
│       ├── thumbnails/
│       │   ├── youtube_thumb.png     # 1280x720
│       │   ├── linkedin_thumb.png    # 1200x627
│       │   └── instagram_thumb.png   # 1080x1080
│       └── descriptions/
│           ├── youtube_desc.md
│           ├── linkedin_desc.md
│           └── short_descriptions.md
│
├── 5-content/                  # Repurposed written content
│   └── [YYYY-MM-DD]_[topic]/
│       ├── linkedin_post.md
│       ├── twitter_thread.md
│       ├── newsletter_draft.md
│       ├── blog_article.md      # If topic warrants long-form
│       └── content_brief.md     # Metadata: pillar, voice, pain point, CTA
│
├── 6-publish-queue/            # Final assets ready for human polish
│   └── [YYYY-MM-DD]_[topic]/
│       ├── PUBLISH_CHECKLIST.md  # What's ready, what needs polish
│       ├── video/
│       ├── shorts/
│       ├── thumbnails/
│       ├── written/
│       └── descriptions/
│
└── archive/                    # Completed campaigns moved here
    └── [YYYY-MM-DD]_[topic]/
```

---

## Phase 1: INGEST (Automatic on Drop)

### Trigger
New folder appears in `1-inbox/` with at least one `.mp4` file.

### Steps

1. **Detect new footage**
   - Watch `1-inbox/` for new directories
   - Validate: contains at least one video file (`.mp4`, `.mov`, `.mkv`)
   - Read `notes.txt` if present (context for later content generation)

2. **Create processing folder**
   - Move footage to `2-processing/[YYYY-MM-DD]_[topic]/`
   - Create subfolder structure

3. **Transcribe**
   - Run Whisper (local or API) on raw footage
   - Output: `transcript_raw.txt` (full unedited)
   - Generate `transcript_clean.md` with:
     - Timestamps every 30 seconds
     - Speaker labels (if multiple speakers)
     - Removed filler words (um, uh, like, you know)
     - Paragraph breaks at topic shifts

4. **Detect outtakes**
   - Analyze audio for:
     - Dead air > 3 seconds
     - Repeated takes ("let me start that over", "hold on", "wait")
     - Explicit markers ("cut", "outtake", "redo")
     - Audio spikes/drops indicating equipment issues
   - Generate `outtakes_log.json`:
     ```json
     {
       "outtakes": [
         {"start": "00:02:14", "end": "00:02:31", "reason": "dead_air", "confidence": 0.95},
         {"start": "00:05:42", "end": "00:06:01", "reason": "restart_phrase", "confidence": 0.88}
       ]
     }
     ```

5. **Create clean cut**
   - Use FFmpeg to remove outtake segments
   - Crossfade transitions at cut points (0.5s)
   - Output: `clean_cut.mp4`
   - Log total time saved

### Tools
```powershell
# Transcription (Whisper)
whisper raw_footage.mp4 --model medium --language en --output_format txt --output_dir ./

# Outtake removal (FFmpeg)
# Generated dynamically from outtakes_log.json
ffmpeg -i raw_footage.mp4 -filter_complex "[0:v]trim=0:134,setpts=PTS-STARTPTS[v0];..." -map "[vout]" -map "[aout]" clean_cut.mp4
```

---

## Phase 2: EDITOR HANDOFF

### Steps

6. **Generate edit brief**
   - Create `edit_brief.md`:
     ```markdown
     # Edit Brief: [Topic]
     Date recorded: [date]
     Raw duration: [time]
     Clean cut duration: [time]
     Outtakes removed: [count] segments ([total time])

     ## Content Overview
     [1-2 sentence summary from transcript]

     ## Key Moments (timestamps in clean_cut.mp4)
     - [00:00] Opening hook
     - [01:30] Main framework introduction
     - [04:15] Story/example
     - [07:20] CTA/close

     ## Edit Notes
     - [Any notes from notes.txt]
     - Style: Professional but raw. Not over-produced.
     - Brand colors: Navy (#0A1628), Gold (#D4AF37), White
     - Lower thirds: Oswald Bold, navy background, gold accent
     - Music: Minimal. No stock motivational. Subtle instrumental only during B-roll.

     ## Shorts to Extract (suggestions)
     - [timestamp range] — "[quote or topic]" — suggested 60s
     - [timestamp range] — "[quote or topic]" — suggested 30s
     - [timestamp range] — "[quote or topic]" — suggested 15s

     ## Deliverables Expected
     - [ ] final_cut.mp4 (full edited video)
     - [ ] Suggested shorts clips (if editor does this)
     ```

7. **Move to editor outbox**
   - Copy `clean_cut.mp4`, `transcript_clean.md`, `edit_brief.md` to `3-editor/outbox/[topic]/`
   - Notify (email/Slack/Discord — configurable)

8. **Wait for editor return**
   - Watch `3-editor/inbox/` for completed folder
   - Validate: contains `final_cut.mp4`
   - Move to `4-post-production/[topic]/` when received

---

## Phase 3: POST-PRODUCTION (Automatic on Editor Return)

### Trigger
`final_cut.mp4` appears in `3-editor/inbox/[topic]/`.

### Steps

9. **Clip into shorts**
   - Use transcript timestamps + edit brief suggestions to identify clip-worthy segments
   - Selection criteria:
     - Strong opening line (hook in first 3 seconds)
     - Self-contained idea (makes sense without context)
     - Emotional peak (story climax, strong statement, laugh)
     - Under target duration with clean start/end
   - Generate 3-5 shorts:
     - At least one 15-second (TikTok/Reels hook)
     - At least one 30-second (LinkedIn/Reels)
     - At least one 60-second (YouTube Shorts/LinkedIn)
   - FFmpeg commands:
     ```powershell
     # Extract short with fade in/out
     ffmpeg -i final_cut.mp4 -ss 00:04:15 -t 60 -vf "fade=in:0:15,fade=out:st=57:d=3" -af "afade=in:0:0.5,afade=out:st=57:d=3" short_01_60s.mp4
     ```

10. **Generate thumbnails**
    - Extract 3-5 candidate frames from video (high-energy moments)
    - Generate thumbnail variations using image AI:
      - YouTube: 1280x720 — face + text overlay + brand colors
      - LinkedIn: 1200x627 — professional, gold accent, Oswald Bold title
      - Instagram: 1080x1080 — square crop, bold text, navy/gold palette
    - Thumbnail design rules:
      - Face visible (human connection)
      - Max 6 words on thumbnail
      - High contrast (readable at mobile size)
      - Brand palette: Navy (#0A1628), Gold (#D4AF37), White (#FFFFFF)
      - Font: Oswald Bold for headlines
    - Save to `4-post-production/[topic]/thumbnails/`

11. **Write descriptions**
    - **YouTube description:**
      - Hook line (first 2 sentences visible above fold)
      - Chapter timestamps
      - One CTA (calculator, assessment, or newsletter)
      - 3-5 relevant tags
      - Standard footer (links, socials)
    - **LinkedIn description:**
      - Teaser that drives curiosity
      - One key takeaway from the video
      - CTA to watch / engage
    - **Short descriptions:**
      - Per-short: 1-2 line caption + 3 hashtags
      - Hook must work without seeing the video (scroll-stop text)

---

## Phase 4: REPURPOSE (Transcript → Multi-Platform Content)

### Steps

12. **Extract core insight**
    - Read `transcript_clean.md`
    - Identify the single most valuable insight (one sentence)
    - Map to pain points (from Grumpy Content Engine)
    - Determine content pillar (Foundational Mastery / Debunking BS / Recovery Bridge)

13. **Trigger Grumpy Content Engine**
    - Input: cleaned transcript + identified insight + pain point mapping
    - Request formats:
      - **LinkedIn post** (primary)
      - **X thread** (5-10 tweets)
      - **Newsletter draft** (email format)
      - **Blog article** (if topic depth warrants it — 1,200+ words)
    - Each piece goes through the full 3-phase Rebel→Creator→Sage protocol
    - Each piece gets 3 variations (Rebel-forward, Creator-forward, Sage-forward)

    > HUMAN CHECK: Present all content variations. User picks and polishes.

14. **Generate content brief**
    - Create `content_brief.md`:
      ```markdown
      # Content Brief: [Topic]
      Source: [video title/date]
      Core insight: [one sentence]
      Pain point(s): [from the 8]
      Content pillar: [which one]
      Trinity voice: [primary blend]
      CTA destination: [calculator/assessment/newsletter/DM]

      ## Assets Produced
      - [ ] LinkedIn post (3 variations)
      - [ ] X thread (3 variations)
      - [ ] Newsletter draft (3 variations)
      - [ ] Blog article (if applicable)
      - [ ] YouTube description
      - [ ] Short descriptions
      - [ ] Thumbnails (3 sizes)
      - [ ] Shorts (3-5 clips)

      ## Scheduling Suggestion
      Day 1: Full video publish (YouTube/LinkedIn)
      Day 2: LinkedIn post
      Day 3: X thread + first short
      Day 5: Newsletter
      Day 7: Second short + blog (if applicable)
      ```

---

## Phase 5: PUBLISH QUEUE

### Steps

15. **Assemble publish package**
    - Move all final assets to `6-publish-queue/[topic]/`
    - Organize into subfolders: `video/`, `shorts/`, `thumbnails/`, `written/`, `descriptions/`

16. **Generate publish checklist**
    - Create `PUBLISH_CHECKLIST.md`:
      ```markdown
      # Publish Checklist: [Topic]
      Created: [date]
      Source video: [duration] recorded on [date]

      ## Video Assets
      - [ ] Final cut reviewed and approved
      - [ ] YouTube thumbnail selected
      - [ ] YouTube description finalized
      - [ ] YouTube tags added
      - [ ] LinkedIn video thumbnail selected
      - [ ] Upload to YouTube
      - [ ] Upload to LinkedIn (native)

      ## Shorts
      - [ ] Short 1 ([duration]): [topic/hook] — reviewed
      - [ ] Short 2 ([duration]): [topic/hook] — reviewed
      - [ ] Short 3 ([duration]): [topic/hook] — reviewed
      - [ ] Descriptions finalized for each
      - [ ] Upload schedule set (Day 3, Day 7)

      ## Written Content
      - [ ] LinkedIn post — variation selected, polished
      - [ ] X thread — variation selected, polished
      - [ ] Newsletter — variation selected, polished
      - [ ] Blog article — reviewed (if applicable)

      ## Quality Checks
      > ⚠️ BEFORE THIS CHECKLIST: Verify all claims against `.agent/rules/factual-guardrails.md`. That file overrides all other rules. No fabricated dollar figures, testimonials, or social proof.
      - [ ] All content passes Grumpy Content Engine quality gate
      - [ ] No AI mentioned in customer-facing content
      - [ ] At least one concrete specific per written piece — VERIFIED dollar figure (check `.agent/rules/factual-guardrails.md`), time saved, frequency, or process detail. No invented numbers.
      - [ ] CTAs point to correct destination
      - [ ] Brand voice confirmed (Black Forest walk test)

      ## Schedule
      - [ ] Day 1: Full video → YouTube + LinkedIn
      - [ ] Day 2: LinkedIn post
      - [ ] Day 3: X thread + Short 1
      - [ ] Day 5: Newsletter
      - [ ] Day 7: Short 2 + Blog (if applicable)
      ```

17. **Notify operator**
    - "Content package ready for [topic]. [X] assets in publish queue. Review and polish."
    - Link to `6-publish-queue/[topic]/PUBLISH_CHECKLIST.md`

---

## Phase 6: ARCHIVE (After Publish)

18. **Move completed campaign to archive**
    - After all checklist items are checked, move the entire folder tree to `archive/[topic]/`
    - Log performance data when available (add to `performance_log.md` in archive)

---

## External Tool Requirements

| Tool | Purpose | Install |
|------|---------|---------|
| **FFmpeg** | Video cutting, shorts extraction, crossfades | `winget install Gyan.FFmpeg` or [ffmpeg.org](https://ffmpeg.org) |
| **Whisper** | Audio transcription (local) | `pip install openai-whisper` |
| **Whisper API** | Cloud transcription (faster, costs $) | OpenAI API key |
| **PptxGenJS** | Thumbnail generation (carousel reuse) | `npm install pptxgenjs` |
| **Image AI** | Thumbnail generation | Antigravity built-in `generate_image` |

### Optional Integrations
| Service | Purpose | How |
|---------|---------|-----|
| **Google Drive / Dropbox** | Editor handoff folder sync | Sync `3-editor/` to shared cloud folder |
| **Slack / Discord** | Notifications at each phase | Webhook on folder watch triggers |
| **Buffer / Hootsuite** | Scheduling published content | API integration or manual |
| **Kit (ConvertKit)** | Newsletter delivery | Export newsletter draft → Kit |

---

## Automation Scripts

### Folder Watcher (PowerShell)
```powershell
# content-pipeline-watcher.ps1
# Watches 1-inbox/ for new folders and triggers Phase 1

$watchPath = "C:\Users\cschi\Documents\content-pipeline\1-inbox"
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $watchPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $path = $Event.SourceEventArgs.FullPath
    $changeType = $Event.SourceEventArgs.ChangeType
    Write-Host "[$(Get-Date)] New footage detected: $path ($changeType)"
    # Trigger Phase 1: Ingest
    # claude -p "Process new footage at $path using the content-manager system"
}

Register-ObjectEvent $watcher "Created" -Action $action

Write-Host "Content Pipeline Watcher active. Monitoring $watchPath..."
Write-Host "Press Ctrl+C to stop."

while ($true) { Start-Sleep -Seconds 5 }
```

### Editor Return Watcher (PowerShell)
```powershell
# editor-return-watcher.ps1
# Watches 3-editor/inbox/ for returned edits and triggers Phase 3

$watchPath = "C:\Users\cschi\Documents\content-pipeline\3-editor\inbox"
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $watchPath
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$action = {
    $path = $Event.SourceEventArgs.FullPath
    if ($path -match "final_cut\.mp4$") {
        Write-Host "[$(Get-Date)] Editor returned final cut: $path"
        # Trigger Phase 3: Post-Production
        # claude -p "Process editor return at $path using the content-manager system"
    }
}

Register-ObjectEvent $watcher "Created" -Action $action

Write-Host "Editor Return Watcher active. Monitoring $watchPath..."
while ($true) { Start-Sleep -Seconds 5 }
```

### Transcription Script (PowerShell)
```powershell
# transcribe.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$VideoPath,
    [string]$OutputDir = (Split-Path $VideoPath),
    [string]$Model = "medium"
)

Write-Host "Transcribing: $VideoPath"
Write-Host "Model: $Model"

# Extract audio first (faster for Whisper)
$audioPath = Join-Path $OutputDir "audio_temp.wav"
ffmpeg -i $VideoPath -vn -acodec pcm_s16le -ar 16000 -ac 1 $audioPath -y

# Run Whisper
whisper $audioPath --model $Model --language en --output_format all --output_dir $OutputDir

# Cleanup
Remove-Item $audioPath -ErrorAction SilentlyContinue

Write-Host "Transcription complete. Output in $OutputDir"
```

### Outtake Detection Script (PowerShell)
```powershell
# detect-outtakes.ps1
param(
    [Parameter(Mandatory=$true)]
    [string]$TranscriptPath,
    [string]$AudioPath,
    [string]$OutputPath
)

# Parse transcript for restart phrases
$restartPhrases = @(
    "let me start over",
    "hold on",
    "wait wait",
    "cut",
    "redo",
    "one more time",
    "let me try that again",
    "sorry",
    "actually no"
)

$transcript = Get-Content $TranscriptPath -Raw
$outtakes = @()

foreach ($phrase in $restartPhrases) {
    # Find timestamps near restart phrases in transcript
    if ($transcript -match $phrase) {
        Write-Host "Found restart phrase: $phrase"
        # Detailed timestamp extraction requires whisper --word_timestamps
        # This is a simplified detection — full version parses word-level timestamps
    }
}

# Detect silence using FFmpeg
$silenceOutput = ffmpeg -i $AudioPath -af "silencedetect=noise=-30dB:d=3" -f null - 2>&1
$silenceMatches = $silenceOutput | Select-String "silence_start|silence_end"

foreach ($match in $silenceMatches) {
    if ($match -match "silence_start: (\d+\.?\d*)") {
        $start = $Matches[1]
    }
    if ($match -match "silence_end: (\d+\.?\d*)") {
        $end = $Matches[1]
        $outtakes += @{
            start = [TimeSpan]::FromSeconds([double]$start).ToString("hh\:mm\:ss")
            end = [TimeSpan]::FromSeconds([double]$end).ToString("hh\:mm\:ss")
            reason = "dead_air"
            confidence = 0.95
        }
    }
}

# Output
$result = @{ outtakes = $outtakes } | ConvertTo-Json -Depth 3
$result | Out-File $OutputPath -Encoding utf8
Write-Host "Outtakes log saved to $OutputPath"
Write-Host "Found $($outtakes.Count) outtake segments"
```

---

## Decision Points

| Situation | Decision |
|-----------|----------|
| Video is under 2 minutes | Skip editor handoff → straight to post-production |
| No clear shorts-worthy moments | Generate at least 1 short from the strongest statement |
| Transcript is too short for blog | Skip blog article, focus on LinkedIn + X + newsletter |
| Editor doesn't return within 72 hours | Send reminder notification |
| Multiple topics in one recording | Split into separate pipeline runs per topic |
| Audio quality is poor | Flag for re-record. Don't waste editor time on bad source. |
| Notes.txt contradicts transcript | Trust notes.txt for intent, transcript for content |

---

## Metrics

| Metric | Target | Track In |
|--------|--------|----------|
| Inbox-to-publish time | < 5 days (excluding editor turnaround) | `performance_log.md` |
| Content pieces per video | 6-10 (video + shorts + written) | `content_brief.md` |
| Human touch time | < 60 min per video (polish + publish only) | Self-report |
| Content quality gate pass rate | > 80% first-try | Grumpy Content Engine quality gate |
| Shorts extracted per video | 3-5 | `4-post-production/` |

---

## Failure Modes

| What Can Go Wrong | Likelihood | Impact | Recovery |
|-------------------|-----------|--------|----------|
| Whisper transcription garbled | Medium | High | Re-run with `large` model. If still bad → manual transcript. |
| FFmpeg cuts at wrong timestamp | Medium | Medium | Review `outtakes_log.json`. Manual timestamp adjustment. |
| Editor loses files | Low | High | Everything stays in `2-processing/` as backup. Re-send. |
| Content engine produces generic output | Medium | Medium | Add more context from `notes.txt`. Increase scar density. |
| Folder watcher crashes | Low | Low | Restart watcher. Process any backlog in `1-inbox/`. |
| Disk space fills up | Low | High | Archive completed campaigns. Compress raw footage after 30 days. |

---

## 60% Capacity Test

The operator at 60% capacity (exhausted post-service, 11pm) can:
- ✅ Drop footage in a folder
- ✅ Write 2-3 sentences in notes.txt
- ✅ Review content variations (yes/no decisions, not creation)
- ✅ Check boxes on publish checklist
- ❌ NOT expected to: edit video, write posts, build thumbnails, format descriptions

**That's the point.** The system does the 80% grind. The operator does the 20% polish.

---

## Rules

1. **NEVER auto-publish.** Everything goes to publish queue for human review. No exceptions.
2. **NEVER skip transcription.** Transcript is the source for ALL downstream content. Quality here = quality everywhere.
3. **ALWAYS keep raw footage in `2-processing/` until campaign is archived.** It's the backup for everything.
4. **ALWAYS generate at least 3 content variations per format.** The operator picks — don't make them create.
5. **IF audio quality < usable THEN stop pipeline and flag for re-record.** Bad source = bad everything.
6. **IF video < 2 min THEN skip editor handoff.** Not worth the round-trip time.
7. **IF transcript contains multiple distinct topics THEN split into separate pipeline runs.** One topic per campaign.
8. **ALWAYS map every piece of written content to at least one pain point.** No orphan content.
9. **NEVER mention AI in any customer-facing output.** Position as "20 years of operator experience."
10. **ALWAYS include concrete specifics in written content** — VERIFIED dollar figures (check `.agent/rules/factual-guardrails.md`), time saved, frequency, or process details. No invented numbers. No feel-good fluff without specifics.

---

## Integration Map

```
                    ┌─────────────────────────┐
                    │     CONTENT MANAGER      │
                    │       (This System)       │
                    └─────────┬───────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
┌─────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│ Grumpy Content  │  │ LinkedIn Carousel│  │ Credibility      │
│ Engine          │  │ Builder          │  │ Economy          │
│ (text content)  │  │ (thumbnails)     │  │ (quality filter) │
└─────────────────┘  └──────────────────┘  └──────────────────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              ▼
                    ┌─────────────────────────┐
                    │   PUBLISH QUEUE          │
                    │   Human: polish + ship   │
                    └─────────────────────────┘
```

---

## Progressive Updates

| Trigger | Action |
|---------|--------|
| Content from a video performs well | Save the topic/structure to `references/winning-formats.md` |
| A short goes viral | Note the clip selection criteria that worked. Update Step 9 selection logic. |
| Editor gives feedback on edit briefs | Update edit brief template in Phase 2 |
| New platform added (e.g., Threads) | Add format to Phase 4 and publish checklist |
| Transcription model improves | Update Whisper model parameter in scripts |
| New pain point emerges from audience | Update Grumpy Content Engine pain point list |
| Content engine quality gate pass rate drops | Increase reference examples, add rules |

---

## Quick Start (First Run)

1. **Create folder structure:**
   ```powershell
   $base = "C:\Users\cschi\Documents\content-pipeline"
   @("1-inbox","2-processing","3-editor\outbox","3-editor\inbox","4-post-production","5-content","6-publish-queue","archive") | ForEach-Object { New-Item -ItemType Directory -Path "$base\$_" -Force }
   ```

2. **Install tools:**
   ```powershell
   winget install Gyan.FFmpeg
   pip install openai-whisper
   ```

3. **Drop test footage:**
   - Create `1-inbox/2026-03-06_test-run/`
   - Add any short video clip
   - Add `notes.txt` with: "Test run. Topic: food cost tracking. Key point: weekly not monthly."

4. **Run manually first:**
   - Walk through each phase by hand
   - Verify transcript quality, outtake detection, content output
   - THEN enable folder watchers for automation

5. **Tell your editor:**
   - Share the `3-editor/` folder (Google Drive/Dropbox sync recommended)
   - Send them the edit brief template so they know what to expect
