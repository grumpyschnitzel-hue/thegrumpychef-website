# Website Workspace

Static HTML site for thegrumpychef.ca, deployed via Netlify.

## What happens here
- Edit and maintain ~23 HTML pages
- Blog posts (blog/ directory)
- Landing pages (lp/ directory)
- Assessment tool (assessment.html)
- Toolkit download flow (toolkit/ directory)

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
Push to main = live on Netlify instantly. No staging. No build step.
Test locally by opening .html files directly or with a local server.
Use git worktree for risky changes.

## Rules
- No fabricated testimonials or revenue claims (factual-guardrails.md)
- Brand colors: primary-gold #D4AF37, navy #0A1628, cream #F5F5F0
- Edit existing pages, don't create new ones unless necessary (~23 pages already)
- Never commit binary assets (images, PDFs) -- use Google Drive
- All CTA links must include UTM parameters
