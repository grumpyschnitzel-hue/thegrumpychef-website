# Website Workspace

<!--
TEACHING NOTE: I built the website as static HTML on purpose — no React, no build step.
Push to main = live. This sounds dangerous for a solo operator, but it's actually safer
than a complex deploy pipeline I can't debug at 11pm. The constraint forces discipline:
test locally, use worktrees for risky changes, keep the page count under control.
The ~23 pages are already pushing it — every new page is a maintenance liability.
-->

Static HTML site for thegrumpychef.ca, deployed via Netlify.

## What happens here
- Edit and maintain ~23 HTML pages
- Blog posts (blog/ directory)
- Landing pages (lp/ directory)
- Assessment tool (assessment.html)
- Toolkit download flow (toolkit/ directory)

## What to Load

<!--
TEACHING NOTE: I split this by task because a blog post edit and an assessment bug fix
need completely different context. An agent fixing JavaScript in assessment.html doesn't
need to read brand-voice.md. An agent writing a new blog post doesn't need to read
js/analytics.js. The skip column prevents the agent from "helpfully" loading everything
and burning half the context window on irrelevant files.
-->

| Task | Load These | Skip These |
|------|-----------|------------|
| Edit a page's content/copy | `rules/brand-voice.md`, the page itself, `css/styles.css` | `js/`, `blog/`, `assessment.html`, `toolkit/` |
| Write a new blog post | `rules/brand-voice.md`, `rules/content-rules.md`, `blog/` (for format reference) | `js/`, `assessment.html`, `toolkit/`, `lp/` |
| Fix a bug / JS issue | `js/analytics.js` or the relevant script, the affected page | `rules/brand-voice.md`, `rules/content-rules.md`, `blog/`, `brand/` |
| Update assessment tool | `assessment.html`, `js/`, Supabase + Kit integration docs | `blog/`, `brand/`, `rules/content-rules.md` |
| SEO / AEO improvements | The target page, `sitemap.xml`, `robots.txt` | `js/`, `toolkit/`, `brand/` |
| Landing page edits | The target page in `lp/`, `rules/brand-voice.md`, `css/styles.css` | `blog/`, `assessment.html`, `js/analytics.js` |

## Key files
- index.html -- homepage
- assessment.html -- Profit Leak Assessment (lead capture -> Kit + Supabase)
- about.html -- brand story
- brochure-kit.html -- consulting brochure
- blog/ -- blog posts (static HTML)
- css/ -- stylesheets
- js/ -- client-side scripts
- brand/ -- logo, favicon, brand assets

## Deploy

<!--
TEACHING NOTE: "Push = live" is the most important line in this file.
I put it early and repeat it in the main CLAUDE.md because agents that
don't internalize this will casually push broken code to production.
There is no staging environment. There is no CI gate. The worktree
escape hatch exists for exactly this reason — use it for anything
that touches more than one page or changes JavaScript behavior.
-->

Push to main = live on Netlify instantly. No staging. No build step.
Test locally by opening .html files directly or with a local server.
Use git worktree for risky changes.

## Rules
- No fabricated testimonials or revenue claims (factual-guardrails.md)
- Brand colors: primary-gold #D4AF37, navy #0A1628, cream #F5F5F0
- Edit existing pages, don't create new ones unless necessary (~23 pages already)
- Never commit binary assets (images, PDFs) -- use Google Drive
- All CTA links must include UTM parameters
