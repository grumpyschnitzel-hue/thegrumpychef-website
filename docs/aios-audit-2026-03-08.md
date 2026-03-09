# AIOS Audit — The Grumpy Chef
## Task Audit + 24 Assets Map + Automation Priority Plan
**Date:** March 8, 2026 | **Author:** Chris + Claude Code

---

## Reality Check (GA4 — Last 30 Days)

| Metric | Number | Verdict |
|--------|--------|---------|
| Active users | 25 | Almost zero — all likely Chris + bots |
| New users | 25 | No returning visitors |
| All traffic source | 100% direct/none | Zero organic, zero social, zero referral |
| Top page views | Homepage: 27, Calculator: 12, My Story: 12 | Nobody is finding you |
| Bounce rate (homepage) | 52% | Half leave immediately |
| Key events fired | 0 | Nobody is converting |
| Kit subscribers | 14 (12 test, 2 Chris) | Zero real leads |
| Revenue | $0 | Building phase |

**Diagnosis: Total obscurity.** The website exists but nobody knows about it. The #1 problem isn't the website quality — it's that no human being has ever been sent there from LinkedIn, search, or anywhere else.

BUT Chris is right — the website needs to feel "share-worthy" before driving traffic. You don't send people to a page you're not proud of.

---

## Task Audit — 25 Tasks Mapped

### CONTENT & MARKETING (Daily — ~3 hrs)

| # | Task | Freq | Time | Auto% | Automation Method |
|---|------|------|------|-------|-------------------|
| 1 | Write LinkedIn posts | Daily | 30-45m | 80% | Voice memo → Whisper → `wispr-to-linkedin` → review → post |
| 2 | LinkedIn commenting/engagement | Daily | 30-60m | 30% | `linkedin-commenter` drafts. YOU engage. Unipile MCP pulls notifications |
| 3 | Blog writing | 2x/week | 2-3h ea | 70% | `blog-pipeline`: topic → SEO article → HTML. You provide story/scar |
| 4 | Email newsletter (Kit) | Every 2 days | 30m | 75% | `wispr-to-email` + `social-publisher`. Repurpose blog/LinkedIn |
| 5 | Content research/trending | Daily AM | 20m | 90% | `discovery-engine` → `/morning`. Needs cron job |
| 6 | Framework creation + recording | Daily (walks) | 30-60m | 10% | YOUR IP. Whisper Flow transcribes automatically |
| 7 | Carousel/visual content | As needed | 30m | 85% | `linkedin-carousel-builder`, `pptx-carousel` |

### BUSINESS DEVELOPMENT (Daily — ~1 hr)

| # | Task | Freq | Time | Auto% | Automation Method |
|---|------|------|------|-------|-------------------|
| 8 | Outreach to restaurant owners | Daily | 30m | 60% | `cold-outreach` drafts DMs. You send manually |
| 9 | Discovery call follow-ups | As needed | 15m | 50% | `nurture-cadence` flags stale connections |
| 10 | Partnership research | Weekly | 30m | 70% | `research` skill + web search |

### WEBSITE & SEO (Daily morning — ~30 min)

| # | Task | Freq | Time | Auto% | Automation Method |
|---|------|------|------|-------|-------------------|
| 11 | SEO monitoring (GSC) | Daily | 10m | 90% | Daily brief via Antigravity dashboard |
| 12 | Analytics review (GA4) | Daily | 10m | 90% | Daily brief via Antigravity dashboard |
| 13 | Website updates/storytelling | Weekly | 1-2h | 40% | Claude Code edits, Antigravity previews |
| 14 | Kit subscriber management | Weekly | 15m | 80% | Kit MCP already connected |

### COMMUNITY — SKOOL (New — ~30 min/day)

| # | Task | Freq | Time | Auto% | Automation Method |
|---|------|------|------|-------|-------------------|
| 15 | Skool community management | Daily | 20m | 20% | YOU engage. Repurpose blog posts as content |
| 16 | Integrate free tools into Skool | One-time | 2h | 50% | Link calculator/assessment/scorecard |
| 17 | Community growth plan | One-time | 1h | 60% | `marketing-orchestrator` + `offer-ecosystem` |

### ADMIN & OPERATIONS (~30 min/day)

| # | Task | Freq | Time | Auto% | Automation Method |
|---|------|------|------|-------|-------------------|
| 18 | Email management (Gmail) | Daily | 15m | 40% | Gmail MCP reads/drafts. You approve |
| 19 | Stripe setup + branding | One-time | 1h | 0% | Manual — brand checkout pages |
| 20 | Planning what to do next | Daily | 15m | 70% | `exec-dashboard` + execution-state.json |
| 21 | Claude/Antigravity session prep | Per session | 10m | 80% | CLAUDE.md + MEMORY.md handle this |
| 22 | Antigravity ↔ Claude Code workflow | Ongoing | Var | 50% | `antigravity-claude-bridge` skill |

### IP CAPTURE (Daily — ~45 min)

| # | Task | Freq | Time | Auto% | Automation Method |
|---|------|------|------|-------|-------------------|
| 23 | Voice memo capture (walks) | Daily | 15-30m | 0% | This IS the work. Whisper Flow transcribes |
| 24 | Process transcripts into content | Daily | 30m | 85% | `content-batch` → 5 formats from 1 transcript |
| 25 | Content consumption (learning) | Daily | 60m | 0% | Not automatable. Budget it deliberately |

### TOTALS

| Category | Tasks | Daily Time | Automatable |
|----------|-------|-----------|-------------|
| Content & Marketing | 7 | ~3 hrs | 63% |
| Business Development | 3 | ~1 hr | 60% |
| Website & SEO | 4 | ~30 min | 75% |
| Community (Skool) | 3 | ~30 min | 43% |
| Admin & Operations | 5 | ~30 min | 48% |
| IP Capture | 3 | ~1.5 hrs | 28% |

**Total: 25 tasks | ~7 hrs/day | Overall automation potential: ~55%**
**Current available: 10 hrs/day | Target: 2-4 hrs/day**
**Gap to close: 6-8 hrs → 2-4 hrs (need to automate or eliminate ~4 hrs)**

---

## 24 Assets Map — Daniel Priestley Framework

### Scoring: 0 = Nothing | 1 = Idea/Setup | 2 = Partial | 3 = Built Not Polished | 4 = Working | 5 = Optimized

| # | Asset | Score | Status | What Exists | Priority Action |
|---|-------|-------|--------|-------------|-----------------|
| 1 | Pitch & Presenting | 1/5 | BUILD | No pitch deck | Create keynote deck from 21-Day Protocol |
| 2 | Publishing & Content | 3/5 | PARTIAL | 12 blog posts, LinkedIn starting, Kit + Substack | Establish weekly rhythm: 1 essay → slice into 3-5 posts |
| 3 | Products (digital) | 3/5 | PARTIAL | Toolkit $47, Discovery Kit $197, Stripe ready | Protocol Kit $997 not built yet. Don't build — validate first |
| 4 | Profile & Personal Brand | 2/5 | BUILD | Website live, voice documented, photos added | Website redesign + LinkedIn profile optimization |
| 5 | Partnerships & JVs | 0/5 | MISSING | Nothing | Identify 3 complementary creators. BIGGEST untapped channel |
| 6 | PR & Media | 0/5 | MISSING | Nothing | Grows through LinkedIn authority. Later priority |
| 7 | IP — Frameworks | 3/5 | PARTIAL | 21-Day Protocol, Track/Discover/Drive, Grumpy Trinity | Package for audience (not just internal docs) |
| 8 | IP — Process | 2/5 | PARTIAL | 72-Hour Audit, calculator methodology | Document as sellable system |
| 9 | IP — Data/Research | 1/5 | LOW | GA4 + GSC connected via Antigravity | Publish industry benchmarks/insights. Unique data = authority |
| 10 | Community/Tribe | 1/5 | SETUP | Skool exists (paid, empty, no branding) | Brand it, seed with blog content + tools, invite first members |
| 11 | Culture & Values | 3/5 | PARTIAL | Brand voice, Grumpy Trinity, pillars documented | Create customer-facing manifesto |
| 12 | Lead Magnet | 4/5 | DONE | Calculator, Assessment, Scorecard, Life OS — all live | Need TRAFFIC. Tools exist, eyeballs don't |
| 13 | Nurture Sequence | 1/5 | LOW | 2 sequences (one has 0% click rate) | Fix Profit Recovery clicks. Set up weekly broadcast |
| 14 | Sales Process | 0/5 | MISSING | No documented flow | Build: lead → qualify → call → close |
| 15 | Referral System | 0/5 | MISSING | Nothing | Need clients first. Later |
| 16 | JV Pipeline | 0/5 | MISSING | Nothing | Same as #5 — partnerships |
| 17 | Recurring Revenue | 1/5 | SETUP | Skool $97/mo set up | Zero paying members |
| 18 | High-Ticket Offer | 2/5 | DEFINED | 1:1 ($15K) and Cohort ($2,500) designed | Not validated. Interview operators first |
| 19 | Book/Guide/Long-form IP | 1/5 | LOW | 1 essay (Systems Over Hustle) | Write 1 essay/week → compile into guide over 3-6 months |
| 20 | Scorecard/Assessment | 4/5 | DONE | Menu Profit Score + Life OS + Calculator live | Working. Need traffic |
| 21 | Events (live/virtual) | 0/5 | MISSING | Nothing | Cohort planned but not launched |
| 22 | Technology/Software | 2/5 | IN DEV | Menu Engineering App (Next.js, not deployed) | Deploy to Vercel as differentiator |
| 23 | Market Data/Insights | 1/5 | LOW | Some via Antigravity + GA4/GSC | Publish a benchmark report. Proprietary data = authority |
| 24 | Brand Assets | 4/5 | DONE | Colors, fonts, voice, photos, CSS | Strong. Visual overhaul in progress |

### 24 Assets Scorecard

| Category | Assets | Avg | Status |
|----------|--------|-----|--------|
| **Strong (4+)** | Lead Magnets (#12), Scorecard (#20), Brand (#24) | 4.0 | LEVERAGE — drive traffic to these |
| **Partial (2-3)** | Publishing (#2), Products (#3), Frameworks (#7), Process (#8), Culture (#11) | 2.6 | POLISH — make customer-facing |
| **Weak (0-1)** | Pitch (#1), Partnerships (#5), PR (#6), Data (#9), Community (#10), Nurture (#13), Sales (#14), Referrals (#15), JVs (#16), Recurring (#17), High-ticket (#18), Book (#19), Events (#21), Tech (#22), Market Data (#23) | 0.7 | BUILD — these generate revenue |

**Overall: 34/120 (28%)**

### The Pattern
Strong back-end (brand docs, skills, tools) but almost no front-end assets that generate revenue:
- No pitch → can't present
- No sales process → can't close
- No partnerships → can't leverage audiences
- No events → can't demonstrate expertise live
- No working nurture → leads leak out
- Strongest assets (lead magnets, scorecards) sit behind an obscurity wall

---

## AIOS Layer Gap Analysis

### Layer 1: CONTEXT — 90% Done
- CLAUDE.md files (2 primary + 8 satellite rule files)
- Brand DNA fully documented
- Memory system active
- **Gap:** None critical

### Layer 2: DATA — 60% Done
- GA4 active, Kit MCP connected, n8n webhooks mapped
- **Gaps:** No Stripe data integration, no link tracking, no centralized data store (Supabase configured but unused)

### Layer 3: INTELLIGENCE — 20% Done (BIGGEST GAP)
- discovery-engine skill exists but requires manual trigger
- **Gaps:** No daily brief automation, no cron jobs, no communication capture (Slack/Telegram), no meeting recorder, LinkedIn MCP dormant

### Layer 4: AUTOMATE — 70% Skills Built / 10% Actually Automated
- 40+ skills built
- **Gaps:** No task audit (NOW DONE — this document), no cron jobs, no execution-state.json, skills aren't chained into workflows

### Layer 5: BUILD — Active but Scattered
- Website live, Menu App in dev, Whisper Flow working
- **Gaps:** Website needs redesign for confidence, Skool empty, no product validated

---

## Priority Action Plan — Sequenced

### PHASE 1: Foundation (This Week — Days 1-3)
**Goal: Make the website share-worthy so you can start driving LinkedIn traffic**

| # | Action | Asset Impact | Time |
|---|--------|-------------|------|
| 1a | Website homepage redesign — clear value prop, better hero, tighter story | Profile (#4) | 3-4 hrs |
| 1b | Fix "Storey" typo → "Story" on homepage | Profile (#4) | 2 min |
| 1c | Brand Stripe checkout pages | Products (#3) | 1 hr |
| 1d | Publish Systems Over Hustle essay (blog index, sitemap, feed.xml) | Publishing (#2), Book (#19) | 30 min |
| 1e | Recreate execution-state.json | Automate Layer | 30 min |

### PHASE 2: Content Engine (Days 4-7)
**Goal: Establish the weekly rhythm that compounds**

| # | Action | Asset Impact | Time |
|---|--------|-------------|------|
| 2a | Write + publish essay #2 | Publishing (#2), Book (#19) | 3 hrs |
| 2b | Slice essays into 3-5 LinkedIn posts each | Publishing (#2) | 1 hr |
| 2c | Send first Kit newsletter broadcast | Nurture (#13) | 30 min |
| 2d | Fix Profit Recovery sequence 0% click rate | Nurture (#13) | 1 hr |
| 2e | Set up `/morning` daily brief (manual for now) | Intelligence Layer | 15 min/day |

### PHASE 3: Community + Engagement (Week 2)
**Goal: Give people somewhere to go beyond the website**

| # | Action | Asset Impact | Time |
|---|--------|-------------|------|
| 3a | Brand Skool community (name, description, cover, about) | Community (#10) | 2 hrs |
| 3b | Seed Skool with blog posts + tool links | Community (#10), Lead Magnets (#12) | 2 hrs |
| 3c | Start daily LinkedIn commenting (30-60 min) | Profile (#4) | Daily |
| 3d | Activate Unipile LinkedIn MCP | Intelligence Layer | 1 hr |
| 3e | Create customer-facing manifesto/values page | Culture (#11) | 2 hrs |

### PHASE 4: Outreach + Partnerships (Week 3-4)
**Goal: Get in front of other people's audiences**

| # | Action | Asset Impact | Time |
|---|--------|-------------|------|
| 4a | Identify 3 complementary creators | Partnerships (#5), JVs (#16) | 2 hrs |
| 4b | Start daily outreach to restaurant owners | Profile (#4) | 30 min/day |
| 4c | Interview 5 operators for offer validation | High-ticket (#18) | 5 hrs total |
| 4d | Document sales process from interviews | Sales Process (#14) | 2 hrs |

### PHASE 5: Automation + Scale (Week 4+)
**Goal: Reduce daily hours from 7 to 3-4**

| # | Action | Asset Impact | Time |
|---|--------|-------------|------|
| 5a | Set up first cron job (morning brief → email) | Intelligence Layer | 2 hrs |
| 5b | Chain wispr → content-batch → review workflow | Automate Layer | 2 hrs |
| 5c | Deploy Menu Engineering App to Vercel | Technology (#22) | 2 hrs |
| 5d | Create pitch deck from 21-Day Protocol | Pitch (#1) | 3 hrs |
| 5e | Connect Stripe to Antigravity data layer | Data Layer | 1 hr |

---

## Chris's Key Blockers (Addressed)

### "I'm not comfortable sharing the website link on LinkedIn"
**Valid.** The homepage has good bones (story, tools, protocol) but needs:
- Tighter hero headline that instantly communicates value
- Remove or polish sections that feel unfinished
- Fix the "Storey" typo
- Ensure mobile experience is clean
**This is Phase 1 — do it before anything else.**

### "Skool has nothing in it"
**Expected.** Don't wait until it's perfect:
1. Brand it (name, description, cover image from your real photos)
2. Seed with 3-5 blog posts as community posts
3. Link your free tools (calculator, assessment, scorecard)
4. Invite from LinkedIn posts: "Free community for operators rebuilding"

### "I want to grow aggressively on LinkedIn"
The growth lever is **commenting**, not posting. The formula:
- 1 post/day (voice memo → wispr-to-linkedin → review → post)
- 30-60 min commenting on OTHER people's posts (restaurant, hospitality, small business)
- Respond to every comment on your posts within 2 hours
- This is 80% manual. The 20% automation comes from content drafting skills.

### "Stripe needs to look branded"
Quick win. Stripe allows custom branding (logo, colors, description). 1-hour task.

---

## Schedule Template (8 AM Start)

| Time | Task | Type |
|------|------|------|
| 8:00 | Morning brief (`/morning`) — research + analytics + SEO | Automatable (90%) |
| 8:20 | Review + approve LinkedIn post (drafted from yesterday's voice memo) | Semi-auto (80%) |
| 8:30 | LinkedIn commenting on other people's posts | MANUAL (30 min) |
| 9:00 | Respond to comments on your posts + DMs | MANUAL (15 min) |
| 9:15 | Write/edit long-form content (blog essay or framework) | MANUAL (core work) |
| 10:30 | Outreach — cold DMs to restaurant owners | Semi-auto (60%) |
| 11:00 | Admin — email, Kit, planning | Semi-auto (50%) |
| 11:30 | Walk + voice memo (IP capture + tomorrow's content source) | MANUAL (core work) |
| 12:00 | Done (4 hrs) — or continue with website/Skool/product work |

**Manual core (non-negotiable): ~2.5 hrs** (commenting, writing, outreach, voice memos)
**Automatable support: ~1.5 hrs** (morning brief, post drafting, email, analytics)
**Total: 4 hrs/day once automation is running**

---

## Files Referenced

| File | Purpose |
|------|---------|
| `MEMORY.md` | Session memory — update after each session |
| `index.html` | Homepage — Phase 1 redesign target |
| `blog/systems-over-hustle.html` | Unpublished essay — Phase 1 publish |
| `execution-state.json` | Missing — recreate in Phase 1 |
| Skool: chris-the-grumpy-chef-2354 | Empty community — Phase 3 brand + seed |

---

*This document is the AIOS master plan. Update it as phases complete.*

---

## Session Log — March 8, 2026

### Completed
- AIOS gap analysis across all 5 layers
- Task audit: 25 tasks mapped, ~7 hrs/day, 55% automation potential
- 24 Assets scored: 34/120 (28%)
- Website content review — identified fabricated content from Antigravity
- Removed: 3 fake testimonials, "$41K" claims, "400+ operators", unvalidated pricing
- Homepage headline changed to "YOUR RESTAURANT IS LEAKING MONEY"
- Built factual-guardrails.md — master truth file overriding all rules
- Credibility Economy established as governing philosophy (free value first)
- Fixed root cause: "every claim needs dollar figure" rule removed/conditioned across all files
- Fixed $180K → $370K across 18 skill files (30 replacements)
- Added verification conditions to 6 Antigravity skills (10 edits)
- Marked 9 unverified CTA examples
- Fixed skill_creator.md pricing (unvalidated prices labeled)
- Added guardrails reference to 5 quality gates
- Essay duplicate section removed
- Phase 1 mostly complete (nav fixes + deploy remaining)

### Remaining (Phase 1)
- Fix navigation consistency (calculator + assessment have no nav)
- Fix broken links (academy.html, relative calculator link)
- Review/remove testimonials.html
- Commit + push to GitHub → deploy to Netlify
- Brand Stripe checkout (manual)

### Next Session
- Phase 2: Content Engine (essay #2, LinkedIn posts, Kit broadcast)
- Consider: Skool branding, LinkedIn commenting strategy
