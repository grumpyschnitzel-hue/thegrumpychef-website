# Brand Constants — The Grumpy Chef

Central reference for all agents building UI, content, or assets for thegrumpychef.ca.

---

## Color Palette (CSS Custom Properties)

```css
/* Primary */
--navy: #0A1628;          /* Dark background */
--navy-light: #0E1B30;    /* Card/section backgrounds */
--navy-card: #111E35;     /* Elevated card surfaces */
--navy-border: #1A2D4D;   /* Borders, dividers */

/* Accent */
--gold: #D4AF37;          /* CTAs, highlights, earned wisdom */
--gold-dim: #B89630;      /* Hover states, secondary accent */

/* Text */
--white: #F8F9FA;         /* Primary text */
--white-dim: #B8BEC8;     /* Secondary/muted text */
--gray: #4A5568;          /* Tertiary text, captions */
```

## Typography

| Role | Font | Weight | Usage |
|------|------|--------|-------|
| Display / Headings | Oswald | 600, 700 | H1-H3, hero text, section titles |
| Body / UI | Inter | 400, 500, 600 | Paragraphs, buttons, nav, form labels |
| Mono / Data | JetBrains Mono | 400 | Code snippets, calculator outputs, data tables |

**Google Fonts import:**
```html
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@600;700&family=Inter:wght@400;500;600&family=JetBrains+Mono&display=swap" rel="stylesheet">
```

## Brand Photo

| Asset | Path | Usage |
|-------|------|-------|
| Primary brand photo | `/images/Kitchen1.jpg` | Hero sections, about pages, social previews, OG image |

> Only verified brand photo. Do not generate or substitute AI images without Chris's approval.

## Layout & Responsive

- **Mobile-first** responsive design
- **Primary breakpoint:** 768px
- **Max content width:** ~1200px (varies by page)
- **Card pattern:** `--navy-card` background, `--navy-border` border, slight border-radius
- **CTA buttons:** `--gold` background, `--navy` text, bold Inter, rounded corners

## Tone Markers (for UI copy)

- German-direct. No fluff.
- Short sentences. Fragments okay.
- Lead with failure, not credentials.
- Dollar signs and concrete numbers in every claim.
- Never mention AI in customer-facing UI.
- Recovery language where natural ("pre-decide", "no exceptions", "behavior leads belief").

## Analytics IDs

| Service | ID |
|---------|-----|
| Google Analytics 4 | G-F41KYXCEXL |
| Microsoft Clarity | (pending activation) |

## External Links

| Destination | URL |
|-------------|-----|
| Website | https://thegrumpychef.ca |
| Substack | https://substack.com/@thegrumpychef |
| LinkedIn | (linked from site nav) |
