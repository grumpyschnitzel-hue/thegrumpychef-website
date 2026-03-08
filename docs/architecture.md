# The Grumpy Chef — System Architecture

> Single source of truth for where everything lives and how it connects.
> Last updated: 2026-03-07

---

## Overview

```
Voice Memo / Essay / Idea
        ↓
    Claude Code (content creation + skills)
        ↓
┌─────────────────────────────────────────────┐
│  LinkedIn Post    → log-content → Supabase  │
│  Newsletter       → Kit API    → kit-webhook → Supabase  │
│  Blog Article     → git push   → Netlify    │
│  Skool Teaser     → manual                  │
└─────────────────────────────────────────────┘
        ↓
    Supabase (content database)
        ↓
    Performance Tracking (post_metrics)
        ↓
    Feedback Loop → content_learnings → Next Content
```

---

## 1. Website (Static HTML)

| Detail | Value |
|--------|-------|
| **Local path** | `C:\Users\cschi\Documents\christian_schiffner\work\website\` |
| **Repo** | `github.com/grumpyschnitzel-hue/thegrumpychef-website` |
| **Branch** | `main` |
| **Live URL** | https://thegrumpychef.ca |
| **Alt URL** | https://thegrumpychef.netlify.app |
| **Hosting** | Netlify (auto-deploys on push to main) |
| **Stack** | Pure HTML/CSS/JS — no framework, no build step |

### Key Pages
| Page | File |
|------|------|
| Homepage | `index.html` |
| My Story | `about.html` |
| Services | `services.html` |
| 21-Day Protocol | `framework.html` |
| Calculator | `calculator.html` |
| Assessment | `assessment.html` |
| Life OS Scorecard | `life-os-scorecard.html` |
| Blog Index | `blog/index.html` |
| Blog RSS | `blog/feed.xml` |
| Sitemap | `sitemap.xml` |
| Landing Pages | `lp/*.html` |
| Toolkit | `toolkit/index.html` |

### Deploy Process
```
Edit files → git add → git commit → git push origin main → Netlify auto-deploys
```

---

## 2. Supabase (Database + Edge Functions)

| Detail | Value |
|--------|-------|
| **Project ID** | `cusexfqdhskgsywrqduj` |
| **Region** | `eu-north-1` |
| **Dashboard** | https://supabase.com/dashboard/project/cusexfqdhskgsywrqduj |
| **API URL** | `https://cusexfqdhskgsywrqduj.supabase.co` |
| **Database** | Postgres 17 |

### Tables

| Table | Purpose | Rows (as of 2026-03-07) |
|-------|---------|------------------------|
| `posts` | All social content (LinkedIn, Facebook, etc.) | 11 |
| `post_metrics` | Engagement data per post (24h/48h/7d checks) | 0 |
| `blog_articles` | All blog posts with SEO metadata | 12 |
| `newsletters` | Kit broadcast tracking (auto-logged via webhook) | 0 |
| `content_learnings` | Patterns discovered from content performance | 0 |
| `calculator_leads` | 72-Hour Profit Calculator completions | 27 |
| `assessment_leads` | Menu Profit Score Assessment completions | 0 |
| `waitlist_signups` | Academy waitlist signups | 0 |
| `form_submissions` | Generic form capture (catch-all) | 4 |
| `email_templates` | Email sequence templates | 5 |
| `email_sequence_logs` | Email send/open/click logs | 9 |

### Edge Functions

| Function | URL | Purpose |
|----------|-----|---------|
| `kit-webhook` | `.../functions/v1/kit-webhook?event={event_type}` | Receives Kit webhook events, auto-logs to database |
| `log-content` | `.../functions/v1/log-content` | API for logging posts, metrics, newsletters, learnings |
| `insert-calculator-lead` | `.../functions/v1/insert-calculator-lead` | Calculator form → Supabase |
| `capture-form` | `.../functions/v1/capture-form` | Generic form → Supabase |
| `subscribe-and-tag` | `.../functions/v1/subscribe-and-tag` | Form → Kit subscriber + tag |
| `process-email-sequence` | `.../functions/v1/process-email-sequence` | Processes email sequence sends |

### log-content API Actions

All POST to `https://cusexfqdhskgsywrqduj.supabase.co/functions/v1/log-content`

| Action | Payload | Writes To |
|--------|---------|-----------|
| `log_post` | `{action, platform, content_text, trinity_voice, hook_type, source_ref, ...}` | `posts` |
| `publish_post` | `{action, post_id, post_url}` | `posts` (update) |
| `log_metrics` | `{action, post_id, impressions, reactions, comments, ...}` | `post_metrics` |
| `log_newsletter` | `{action, subject, kit_broadcast_id, recipients, ...}` | `newsletters` |
| `log_learning` | `{action, pattern_type, description, evidence, confidence}` | `content_learnings` |

### kit-webhook Event Types

URL pattern: `.../functions/v1/kit-webhook?event={event_name}`

| Event | What Happens |
|-------|-------------|
| `broadcast.send` | Logs to `newsletters` table |
| `subscriber.subscriber_activate` | Logs to `form_submissions` |
| `subscriber.form_subscribe` | Logs to `form_submissions` with form ID |
| Any other | Logs to `form_submissions` for debugging |

---

## 3. Kit (ConvertKit) — Email Marketing

| Detail | Value |
|--------|-------|
| **Account** | christian@thegrumpychef.ca |
| **Plan** | Creator |
| **API** | v3 (api_secret auth) |
| **MCP Server** | `C:\Users\cschi\kit-mcp-server\` (custom-built) |

### Tags
| Tag | Purpose |
|-----|---------|
| `calculator-lead` | Calculator completion |
| `assessment-lead` | Assessment completion |
| `life-os-lead` | Life OS Scorecard completion |
| `waitlist-lead` | Academy waitlist |
| `discovery-call-request` | Discovery call form |
| `tool-completed-calculator` | Loyalty ladder |
| `tool-completed-assessment` | Loyalty ladder |
| `tool-completed-lifeos` | Loyalty ladder |
| `multi-tool-user` | 2+ tools completed |
| `power-user` | 3+ tools completed |
| `newsletter` | Weekly newsletter subscriber |

### Sequences (Active)
1. 72-Hour Discovery Sequence
2. Profit Recovery Series

### Webhook Target
Kit webhooks → `https://cusexfqdhskgsywrqduj.supabase.co/functions/v1/kit-webhook?event={event}`

---

## 4. Custom MCP Servers (Local)

### Kit MCP
| Detail | Value |
|--------|-------|
| **Path** | `C:\Users\cschi\kit-mcp-server\` |
| **Entry** | `dist/index.js` |
| **Runtime** | Node.js (TypeScript compiled) |
| **Auth** | `KIT_API_KEY` env var (v3 API Secret) |
| **Config** | `~/.claude.json` + `~/.mcp.json` |

**Tools:** `kit_get_account`, `kit_list_subscribers`, `kit_get_subscriber`, `kit_create_subscriber`, `kit_update_subscriber`, `kit_get_subscriber_tags`, `kit_list_tags`, `kit_create_tag`, `kit_add_tag_to_subscriber`, `kit_remove_tag_from_subscriber`, `kit_list_tag_subscribers`, `kit_list_forms`, `kit_add_subscriber_to_form`, `kit_list_sequences`, `kit_add_subscriber_to_sequence`, `kit_list_broadcasts`, `kit_get_broadcast`, `kit_create_broadcast`, `kit_update_broadcast`, `kit_delete_broadcast`, `kit_list_webhooks`, `kit_create_webhook`, `kit_delete_webhook`, `kit_list_custom_fields`

### Gemini MCP
| Detail | Value |
|--------|-------|
| **Path** | `C:\Users\cschi\gemini-mcp-server\` |
| **Entry** | `dist/index.js` |
| **Runtime** | Node.js (TypeScript compiled) |
| **Auth** | `GEMINI_API_KEY` env var |

**Tools:** `gemini_generate`, `gemini_analyze`, `gemini_count_tokens`, `gemini_list_models`

---

## 5. Claude Code Configuration

| File | Purpose |
|------|---------|
| `C:\Users\cschi\.claude.json` | Global Claude Code settings + MCP server configs |
| `C:\Users\cschi\.mcp.json` | User-level MCP server definitions |
| `C:\Users\cschi\CLAUDE.md` | Skill catalog + session primer |
| `C:\Users\cschi\Documents\christian_schiffner\CLAUDE.md` | Brand identity + strategy |
| `C:\Users\cschi\Documents\christian_schiffner\work\website\CLAUDE.md` | Website project rules |

### Auto-Memory
| File | Path |
|------|------|
| **Main memory** | `C:\Users\cschi\.claude\projects\C--Users-cschi-Documents-christian-schiffner-work-website\memory\MEMORY.md` |
| **LinkedIn drafts** | `...\memory\linkedin-posts.md` |

### Skills (Antigravity)
| Skill | Path |
|-------|------|
| All skills | `C:\Users\cschi\Documents\christian_schiffner\work\website\Antigravity-Skill\Skill\` |

---

## 6. Environment Variables (Windows User)

| Variable | Purpose |
|----------|---------|
| `KIT_API_KEY` | Kit v3 API Secret |
| `GEMINI_API_KEY` | Google Gemini API key |

Set via `setx` or Windows → System → Environment Variables.

---

## 7. Third-Party Cloud Services

| Service | Purpose | How We Connect |
|---------|---------|---------------|
| **Netlify** | Website hosting | Git push → auto-deploy |
| **GitHub** | Version control | `grumpyschnitzel-hue/thegrumpychef-website` |
| **Supabase** | Database + edge functions | MCP + direct API |
| **Kit (ConvertKit)** | Email marketing | Custom MCP server |
| **Google Analytics 4** | Traffic analytics | JS snippet (G-F41KYXCEXL) |
| **Google Search Console** | SEO monitoring | HTML verification files |
| **Skool** | Community membership | Manual (no API yet) |

---

## 8. Data Flow Diagrams

### Content Publishing Flow
```
Essay written in blog/*.html
        ↓
Sliced into LinkedIn posts → saved in Supabase (posts table, status=draft)
        ↓
Published on LinkedIn → update status=published, add post_url
        ↓
24h/48h/7d → log metrics to post_metrics
        ↓
Patterns detected → log to content_learnings
```

### Lead Capture Flow
```
Visitor uses Calculator/Assessment/Scorecard
        ↓
Form POSTs to Supabase edge function
        ↓
subscribe-and-tag → Kit (subscriber + tag)
insert-calculator-lead → Supabase (calculator_leads)
        ↓
Kit sequence triggered automatically
```

### Newsletter Flow
```
Draft broadcast in Kit (via Kit MCP)
        ↓
Kit sends broadcast
        ↓
Kit webhook fires → kit-webhook edge function
        ↓
Auto-logged to newsletters table
```

---

## 9. What's NOT Built Yet

| Component | Status | Notes |
|-----------|--------|-------|
| LinkedIn MCP | Not started | API restrictions — hardest piece |
| LinkedIn auto-metrics | Not started | Depends on LinkedIn MCP or manual entry |
| Skool API integration | Not started | Skool has no public API |
| Kit webhook registration | Needs wiring | Edge function ready, webhook not created in Kit yet |
| Content performance dashboard | Not started | Supabase data ready, needs frontend |
| Visual website redesign | Not started | Photos available, pages need overhaul |
| Microsoft Clarity | Configured, not active | Project ID not set |

---

## 10. Quick Reference Commands

### Deploy website
```bash
cd C:\Users\cschi\Documents\christian_schiffner\work\website
git add . && git commit -m "description" && git push origin main
```

### Rebuild Kit MCP
```bash
cd C:\Users\cschi\kit-mcp-server
npm run build
```

### Test edge function
```bash
curl -X POST "https://cusexfqdhskgsywrqduj.supabase.co/functions/v1/log-content" \
  -H "Content-Type: application/json" \
  -d '{"action":"log_post","platform":"linkedin","content_text":"test"}'
```

### Check database
Use Supabase MCP: `execute_sql` with project_id `cusexfqdhskgsywrqduj`
