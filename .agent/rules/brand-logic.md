# Brand Logic — Agent Guardrails

> **GLOBAL RULE — Scars First, Value First, Always.** Before generating ANY customer-facing content: connect it to a specific scar from `credibility-economy/references/chris-credibility-map.md`. If ChatGPT could write it without Chris's 20 years — it's not ready. Lead with free value. Verify all claims against `factual-guardrails.md`. No fabrications. Ever.

All agents working on The Grumpy Chef project MUST follow these rules.

---

## Required References

Before building any UI, page, component, or customer-facing asset:

1. **Read `/brand/brand-constants.md`** — colors, fonts, layout rules, tone markers
2. **Use approved brand photos** from `/images/` (see Photo Rules below)
3. **Follow the design system** defined in CSS custom properties (navy/gold palette)

## Photo Rules

| Photo | File | Usage |
|-------|------|-------|
| Working the line (primary) | `/images/hero-kitchen.jpg` | Homepage hero, About page hero |
| Clean headshot | `/images/headshot-clean.jpg` | CTAs, footer, services, toolkit author |
| Systems/operations shot | `/images/systems-wall.jpg` | Toolkit credibility, framework pages |
| Original brand photo (fallback) | `/images/Kitchen1.jpg` | Blog author photos, fallback for missing images |

> All images use `onerror` fallback to Kitchen1.jpg. Do not generate or substitute AI images without Chris's approval.

## Styling Rules

- Use the CSS variables from `brand-constants.md`. Do not invent new colors.
- Headings: Oswald. Body: Inter. Data/code: JetBrains Mono.
- Mobile-first. Breakpoint at 768px.
- CTA buttons: gold background, navy text, bold.
- Cards: `--navy-card` bg, `--navy-border` border.
- No external CSS frameworks (no Bootstrap, no Tailwind). Inline `<style>` blocks per page.

## Content Rules

- Never mention AI, Claude, or automation in customer-facing output.
- Position everything as "built from 20 years of operator experience."
- **FACTUAL ACCURACY IS MANDATORY. Read `factual-guardrails.md` before creating ANY customer-facing content.** Never fabricate testimonials, dollar figures, subscriber counts, or client results. See `factual-guardrails.md` for the verified facts list and rules.
- Use concrete specifics WHERE VERIFIED DATA EXISTS. When no verified data exists, use framework language or Chris's personal story. A claim with no number is better than a claim with a fake number.
- Voice: German-direct, recovery-informed, short sentences.
- Run the Beer Test: would Chris say this to another operator over a beer?
- Run the Fraud Test: would Chris feel like a fraud if someone called him on this claim?
- Run the 60% Capacity Test: would an exhausted operator at 11pm read this?
- Never use the word "consulting" or "consultant" — we're operators who build systems, not consultants who sell advice.

## Asset Rules

- No AI-generated images without explicit approval.
- Only use verified brand assets from `/images/`.
- GA4 tag (G-F41KYXCEXL) must be present on every new page.
- Schema.org JSON-LD required on every new page.
- OG + Twitter Card meta tags required on every new page.

## Architecture Rules

- Pure static HTML/CSS/JS. No frameworks. No build step. No npm.
- Each page is self-contained (inline styles).
- Forms POST to n8n webhooks, not direct API calls.
- Kit tags applied server-side via n8n, not client-side.

## File References

| What | Where |
|------|-------|
| **Factual guardrails** | **`.agent/rules/factual-guardrails.md` — READ FIRST, OVERRIDES ALL** |
| Brand constants | `/brand/brand-constants.md` |
| Brand photos | `/images/` (hero-kitchen.jpg, headshot-clean.jpg, systems-wall.jpg, Kitchen1.jpg) |
| Content voice | `.agent/rules/voice_vibration.md` |
| Content engine | `.agent/rules/SKILL.md` |
| Hook library | `.agent/rules/hook-library.md` |
| CTA library | `.agent/rules/cta-library.md` |
| Funnel routing | `.agent/rules/content-funnel-map.md` |
| Platform formats | `.agent/rules/platform-templates.md` |
| Quality examples | `.agent/rules/gold-standard-examples.md` |
| Project structure | `/CLAUDE.md` |
