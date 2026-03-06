# CLAUDE.md — thegrumpychef.ca Website

## Project Overview

**The Grumpy Chef** — Restaurant profit recovery website for Christian Schiffner.
Static HTML site hosted on Netlify. No framework, no CMS, no build process.

- **Live URL:** https://thegrumpychef.ca (also thegrumpychef.netlify.app)
- **Repo:** github.com/grumpyschnitzel-hue/thegrumpychef-website
- **Branch:** main
- **Hosting:** Netlify (auto-deploys from GitHub push)
- **Domain registrar:** Separate from Netlify (custom domain forwarding)

---

## Architecture

**Pure static HTML/CSS/JS.** No React, no Next.js, no static site generator, no npm, no build step.
Files deploy exactly as they exist in the repo.

### Directory Structure
```
/
  index.html              # Homepage
  about.html              # My Story
  services.html           # Service tiers
  framework.html          # 21-Day Recovery Protocol
  calculator.html         # 72-Hour Profit Discovery Calculator (interactive JS tool)
  assessment.html         # Menu Profit Score Assessment (interactive JS quiz)
  life-os-scorecard.html  # Operator Life OS Scorecard (interactive JS tool)
  scorecard.html          # Restaurant Profit Leak Scorecard
  academy.html            # Academy page
  kit.html                # 72-Hour Profit Discovery Kit ($197 product)
  kit-access.html         # Kit access/login
  toolkit-bundle.html     # Toolkit bundle sales page
  newsletter.html         # Newsletter signup
  restaurant-staff-turnover-cost.html  # Staff turnover calculator

  discovery-kit-*.html    # 5 Discovery Kit tool pages (diagnosis, exposure, measurement, protocol, response)

  blog/
    index.html            # Blog listing page
    _template.html        # Blog post template (copy for new posts)
    feed.xml              # RSS feed (RSS 2.0 + Atom)
    *.html                # 11 blog articles (SEO content)

  lp/
    calculator.html       # Landing page — Calculator
    assessment.html       # Landing page — Assessment
    discovery.html        # Landing page — Discovery Call
    academy.html          # Landing page — Academy
    life-os.html          # Landing page — Life OS Scorecard
    utm-builder.html      # Internal UTM builder tool
    thank-you-*.html      # 5 thank-you pages (post-conversion)

  toolkit/
    index.html            # Toolkit landing page
    thank-you.html        # Post-purchase thank-you
    files/                # 8 downloadable Excel spreadsheets (.xlsx)

  js/
    analytics.js          # Shared analytics (GA4 + Microsoft Clarity + UTM capture + custom events)
    ab-test.js            # Client-side A/B testing (localStorage-based, GA4 events)

  images/
    Kitchen1.jpg          # Primary brand photo (Chef Christian in kitchen)

  sitemap.xml             # XML sitemap (manually maintained)
  google*.html            # Google Search Console verification files (2)
## CUSTOM SKILLS & AUTOMATIONS
- **Location**: `./Antigravity-Skill/`
- **Primary Tool**: Use `skill_creator.md` to codify any repeatable manual process into a permanent skill.
- **Protocol**: Before starting a task, check this folder to see if a specialized skill already exists.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Markup** | Hand-coded HTML5 (no templating engine) |
| **Styling** | Inline `<style>` blocks per page, CSS custom properties, Flexbox/Grid, mobile-first responsive (breakpoint: 768px) |
| **JavaScript** | Vanilla JS — no framework, no dependencies |
| **Fonts** | Google Fonts — Oswald (display), Inter (body), JetBrains Mono (mono) |
| **Analytics** | Google Analytics 4 (G-F41KYXCEXL), Microsoft Clarity (configured, pending activation) |
| **SEO** | Schema.org JSON-LD, Open Graph, Twitter Cards, XML sitemap, RSS feed, canonical URLs |
| **Hosting** | Netlify (static deploy from GitHub) |
| **Version Control** | Git + GitHub |
| **Email** | Kit (ConvertKit) — subscriber management, sequences, automations |
| **Webhooks** | n8n Cloud — form submissions, tool completions |

### Design System (CSS Variables)
```css
--navy: #0A1628;        /* Primary dark background */
--navy-light: #0E1B30;
--navy-card: #111E35;
--navy-border: #1A2D4D;
--gold: #D4AF37;        /* Accent, CTAs, earned wisdom */
--gold-dim: #B89630;
--white: #F8F9FA;       /* Text */
--white-dim: #B8BEC8;   /* Secondary text */
--gray: #4A5568;
```

---

## Key Conventions

### HTML Structure
- Every page is self-contained (inline styles, no shared CSS file)
- Every page includes GA4 snippet in `<head>` (hardcoded, not via analytics.js on most pages)
- Every page includes Schema.org JSON-LD structured data
- Every page includes OG + Twitter Card meta tags
- Every page includes `<link rel="canonical">`
- Mobile nav uses `.nav-toggle` class with vanilla JS hamburger menu

### Blog Posts
- Copy `blog/_template.html` for new posts
- Update `blog/index.html` listing manually
- Update `blog/feed.xml` manually
- Update `sitemap.xml` manually
- Each post needs: Article/BlogPosting schema, FAQPage schema, OG tags, canonical URL

### Interactive Tools (Calculator, Assessment, Life OS, Staff Turnover)
- All logic is vanilla JavaScript in inline `<script>` blocks
- Results calculate client-side — no server calls
- Email capture forms POST to n8n webhooks
- Kit tags applied via webhook automations (not client-side Kit API)

### A/B Testing (js/ab-test.js)
- Client-side headline/CTA variant testing
- localStorage-based persistent assignment
- Fires GA4 custom events for tracking
- One test per page at a time

---

## Structured Data (Schema.org JSON-LD)

### Homepage (`index.html`) — Full `@graph`:
1. **ProfessionalService** — business entity, service types, price range
2. **Person** — Christian Schiffner, Kuchenmeister credential, work location
3. **Organization** — The Grumpy Chef, logo, founder ref
4. **WebSite** — name, url, publisher ref
5. **Service** — 21-Day Restaurant Recovery Protocol
6. **FAQPage** — 7 operator questions

### Tool Pages (calculator, assessment, life-os):
- **WebApplication** schema (name, category, author, offers)

### Blog Posts:
- **Article/BlogPosting** schema (author, datePublished, image)
- **FAQPage** schema (per-post FAQ section)

---

## Deployment

1. Edit files locally
2. `git add . && git commit -m "description"`
3. `git push origin main`
4. Netlify auto-deploys (no build command — serves files as-is)

No build step. No environment variables. No `.env` files.

---

## Third-Party Integrations

| Service | Purpose | Integration Method |
|---------|---------|-------------------|
| **Google Analytics 4** | Traffic analytics | `<script>` tag (G-F41KYXCEXL) |
| **Google Search Console** | SEO monitoring | HTML verification files |
| **Microsoft Clarity** | Heatmaps/session recording | Via `js/analytics.js` (pending activation) |
| **Kit (ConvertKit)** | Email subscribers, sequences, tags | n8n webhook → Kit API |
| **n8n Cloud** | Webhook automation | Form POST endpoints |
| **Substack** | Newsletter | External link (substack.com/@thegrumpychef) |
| **LinkedIn** | Primary social channel | External link |
| **Google Fonts** | Typography | `<link>` tag (fonts.googleapis.com) |

---

## Kit Tags (Email Automation)

| Tag | Purpose |
|-----|---------|
| `calculator-lead` | 72-Hour Profit Discovery Calculator completion |
| `assessment-lead` | Menu Profit Score Assessment completion |
| `life-os-lead` | Operator Life OS Scorecard completion |
| `waitlist-lead` | Academy waitlist signup |
| `discovery-call-request` | Discovery call form submission |
| `tool-completed-calculator` | Loyalty ladder tracking |
| `tool-completed-assessment` | Loyalty ladder tracking |
| `tool-completed-lifeos` | Loyalty ladder tracking |
| `multi-tool-user` | 2+ tools completed |
| `power-user` | 3+ tools completed |

---

## Content Rules

1. **Never mention AI** as a selling point in any customer-facing page
2. Position tools as "built from 20 years of operator experience"
3. Every claim includes dollar signs and concrete ROI projections
4. Voice: German-direct, recovery language, short sentences, no corporate BS
5. Lead with failure/vulnerability, not credentials
6. Apply the 60% capacity test — would a tired operator actually use this?
7. CTA language: direct, no gimmicks ("Message me if you're done white-knuckling it")

---

## Downloadable Toolkit (toolkit/files/)

8 Excel spreadsheets:
1. Recipe Costing & Plate Cost Calculator
2. Weekly Prime Cost Tracker
3. Menu Engineering Matrix
4. Par Level & Order Calculator
5. Waste Tracking Log
6. Delivery Profitability Calculator
7. Menu Psychology Audit Checklist
8. Vendor Price Comparison Tracker

---

## Known Gaps / Planned Work

- **Microsoft Clarity** — configured in analytics.js but project ID not yet set
- **analytics.js** — prepared but not yet included on most pages (GA4 is hardcoded inline instead)
- **Blog scaling** — currently manual HTML; consider 11ty/Hugo if growing past ~15 articles
- **No shared CSS file** — each page has inline styles (deliberate simplicity, but means style changes require multi-file edits)
- **No favicon** — not detected in source
- **Single image** — only Kitchen1.jpg in images/ (no other assets)

---

## Related Projects

| Project | Location | Relationship |
|---------|----------|-------------|
| Menu Engineering App | `../menu-engineering/` | Next.js + TypeScript app, will deploy to Vercel separately |
| Knowledge Base | `../../` (`christian_schiffner/`) | Brand docs, frameworks, content system |
| Parent CLAUDE.md | `../../CLAUDE.md` | Master identity + satellite files (BRAND.md, TECH_STACK.md, OPERATIONS.md) |

---

## Build Rules (from parent CLAUDE.md)

1. **Read before editing.** Never modify a file you haven't read first.
2. **One feature at a time.** Build → Test → Verify live.
3. **Anti-slop checks.** Every output must provide actionable, measurable value.
4. **Privacy.** Never expose internal strategy, AI usage, pricing logic, or competitive positioning in customer-facing code.
5. **Git discipline.** Commit with descriptive messages. Push to main triggers deploy.
6. **No over-engineering.** This is a static site. Keep it simple. No npm, no bundlers, no unnecessary abstractions.

---

## Custom Skills

| Skill | Location | Purpose |
|-------|----------|---------|
| **Brand DNA & Content Skill** | [`skill_creator.md`](Antigravity-Skill/skill_creator.md) | Full Brand DNA, Grumpy Trinity voice system, content pillars, audience definition, platform strategy, product ecosystem |
| **LinkedIn Commenter** | [`linkedin-commenter.md`](../Antigravity-Skill/Skill/linkedin-commenter.md) | LinkedIn engagement system — comment replies, connection evaluation, DM responses, post boost advisory, proactive strategy (5 modes) |
| **LinkedIn Carousel Builder** | [`linkedin-carousel-builder.md`](../Antigravity-Skill/Skill/linkedin-carousel-builder.md) | Carousel production — slide copy + PPTX generation, Premium Authority brand palette, 7 slide types, 3 structures, posting workflow |
| **Grumpy Content Engine** | [`SKILL.md`](../Antigravity-Skill/Skill/grumpy-content-engine/SKILL.md) | 3-phase Rebel→Creator→Sage content protocol — LinkedIn posts, emails, X threads, blog posts. References pain-points research + strategy tables |
| **Systems Builder** | [`SKILL.md`](../Antigravity-Skill/Skill/systems-builder/SKILL.md) | Interview-driven SOP/checklist/metrics builder. Light + Full modes, operations manual, dependency mapping. For life, business, or client systems |

**Usage:**
- Before producing ANY content, read `Antigravity-Skill/skill_creator.md` and apply the Rebel-Creator-Sage logic.
- For ANY LinkedIn interaction (comments, DMs, connection requests, boost decisions), read `linkedin-commenter.md` and follow the appropriate mode.
- For carousel/document post requests, read `linkedin-carousel-builder.md` — produces slide copy + .pptx file.
- For written content (posts, emails, threads, blog articles), trigger `grumpy-content-engine/SKILL.md` — enforces the 3-phase Grumpy Protocol.
- For systemizing anything (SOPs, processes, routines), trigger `systems-builder/SKILL.md` — interview → build → index in operations manual.


---

## Brand Voice — The Grumpy Trinity (Rebel-Creator-Sage)

All content production uses the **Grumpy Trinity** — three voice archetypes that blend together:

1. **The Rebel (Hook)** — Sarcastic, defiant. Calls out BS. Earns attention.
2. **The Creator (Substance)** — Obsessive about craft, detail, doing it the right way. Builds authority.
3. **The Sage (Payoff)** — Brutally honest, fatherly wisdom. No sugar-coating. Builds trust.

**How to apply:**
- Pick **1-2 voices** per piece of content
- Assign to one of **3 pillars**: Foundational Mastery, Debunking BS, or Systematic Excellence
- Identify the **enemy** being fought (Industrial Food Complex, fake food, pretentiousness, bad advice)
- Full framework details in [`Antigravity-Skill/skill_creator.md`](Antigravity-Skill/skill_creator.md)
