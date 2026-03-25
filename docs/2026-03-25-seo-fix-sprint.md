# SEO Fix Sprint — March 25, 2026

**Goal:** Take thegrumpychef.ca from SEO 6.5/10 → 8/10 and AEO 8/10 → 9/10
**Estimated time:** 1.5 hours total
**All changes are in:** `work/website/`

---

## Current Scores
- **AEO: 8/10** (schema is strong, blog structure excellent)
- **SEO: 6.5/10** (missing meta descriptions, OG tags, canonicals)

## Target Scores After Sprint
- **AEO: 9/10**
- **SEO: 8/10**

---

## Task 1: Add Meta Descriptions to 7 Pages (20 min)

These pages are missing `<meta name="description">`:

| Page | Suggested Meta Description |
|------|---------------------------|
| `index.html` | "Restaurant profit recovery for independent operators. Free calculator, menu assessment, and the 21-Day Protocol. From a German Master Chef with 20+ years across 5 countries." |
| `about.html` | "Chef Christian Schiffner lost a restaurant and $370K. Rebuilt with recovery frameworks. 20+ years across Germany, Switzerland, Austria, Spain, and Canada. Now helps operators stop the bleed." |
| `calculator.html` | "Find your restaurant's hidden profit leaks in 5 minutes. 9 categories. Free. Built by an operator who found $41,000 in annual waste he didn't know about." |
| `assessment.html` | "Score your menu's profit potential in 3 minutes. 19 questions across 5 categories. Find the 3 quickest wins hiding in your menu right now." |
| `framework.html` | "The 21-Day Restaurant Recovery Protocol. Week 1: Track. Week 2: Discover. Week 3: Drive. Built from recovery frameworks that rebuilt a restaurant from $370K in debt." |
| `services.html` | "Work with The Grumpy Chef. Free tools, $197 Starter Kit, async consulting retainer. Restaurant profit recovery for operators doing $800K-$3M revenue." |
| `kit.html` | "The Grumpy Chef Starter Kit — $197. 8 Excel templates for food cost tracking, menu engineering, daily numbers, and profit recovery. Built by a Master Chef." |

**How:** Add `<meta name="description" content="...">` after `<meta name="viewport">` on each page.

---

## Task 2: Add OG Tags to All Pages (30 min)

Every page needs these 5 tags in `<head>`:

```html
<meta property="og:title" content="[PAGE TITLE]">
<meta property="og:description" content="[SAME AS META DESCRIPTION]">
<meta property="og:type" content="website"> <!-- or "article" for blog posts -->
<meta property="og:url" content="https://thegrumpychef.ca/[PATH]">
<meta property="og:image" content="https://thegrumpychef.ca/images/Kitchen1.jpg">
<meta name="twitter:card" content="summary_large_image">
```

**Pages to update (non-blog — blog posts already have OG):**
1. index.html
2. about.html
3. calculator.html
4. assessment.html
5. framework.html
6. services.html
7. kit.html
8. scorecard.html
9. newsletter.html
10. toolkit/index.html
11. toolkit-bundle.html
12. restaurant-staff-turnover-cost.html
13. life-os-scorecard.html
14. readiness-scorecard.html

**Note:** Blog posts already have OG tags. Only non-blog pages need them.

---

## Task 3: Add Canonical URLs to All Pages (15 min)

Every page needs:
```html
<link rel="canonical" href="https://thegrumpychef.ca/[EXACT PATH]">
```

**Pages to update (same list as Task 2 — blog posts already have canonicals):**
Same 14 non-blog pages listed above.

---

## Task 4: Add FAQ Schema to Calculator + Assessment (15 min)

### calculator.html — Add 3 FAQs:
1. "How does the Profit Leak Calculator work?" → Scans 9 categories of hidden profit leaks. Answer 9 questions. Get an estimated annual leak in dollars and a priority fix list.
2. "Is the Profit Leak Calculator free?" → Yes. No email required. Instant results. Built to give you the diagnosis free — the cure is where the value exchange happens.
3. "How accurate is the profit leak estimate?" → It's a directional estimate based on industry benchmarks and your inputs. Most operators find the actual number is higher than the estimate because the calculator only catches what you can self-report.

### assessment.html — Add 3 FAQs:
1. "What does the Menu Profit Score measure?" → 19 questions across 5 profit categories: pricing strategy, menu mix, food cost control, menu psychology, and operational efficiency. Your score shows where your menu is leaving money on the table.
2. "How long does the assessment take?" → 3 minutes. 19 multiple-choice questions. Instant results with your top 3 quick wins.
3. "Do I need my financial data to take the assessment?" → No. The questions are about your menu practices and decision-making, not your exact numbers. If you want precise numbers, use the Profit Leak Calculator instead.

---

## Task 5: Update robots.txt (2 min)

Add these two bots as explicitly allowed:

```
User-agent: Google-Extended
Allow: /

User-agent: CCBot
Allow: /
```

---

## Verification Checklist (After All Tasks)

- [ ] Every page has `<meta name="description">`
- [ ] Every page has `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- [ ] Every page has `<meta name="twitter:card" content="summary_large_image">`
- [ ] Every page has `<link rel="canonical">`
- [ ] calculator.html has FAQPage schema (3 Qs)
- [ ] assessment.html has FAQPage schema (3 Qs)
- [ ] robots.txt includes Google-Extended and CCBot
- [ ] Test 3 pages in Google Rich Results Test (search.google.com/test/rich-results)
- [ ] Test 1 page share preview on LinkedIn Post Inspector

---

## Deploy

```bash
cd ~/Documents/christian_schiffner/work/website
git add -A
git commit -m "feat: SEO sprint — meta descriptions, OG tags, canonicals, FAQ schema"
git push origin main
```

Push = live on Netlify. No staging.

---

## What This Unlocks

- LinkedIn shares show proper previews (title, description, image) instead of blank cards
- Google SERPs show your meta descriptions instead of auto-generated snippets
- AI engines get richer structured data from calculator + assessment FAQs
- No duplicate content risk from missing canonicals
- **Expected result: SEO 6.5 → 8/10, AEO 8 → 9/10**
