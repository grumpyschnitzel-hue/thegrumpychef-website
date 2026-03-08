---
name: linkedin-carousel-building
description: "Produces LinkedIn carousel posts — slide-by-slide copy AND a branded .pptx file (1080x1080 square) uploadable as a LinkedIn Document post. Triggers when the user says 'LinkedIn carousel', 'build carousel', 'carousel from transcript', 'document post', 'slide deck for LinkedIn', or 'carousel from this post'. Applies The Grumpy Chef brand palette (Navy/Gold/White), Grumpy Trinity voice system, and restaurant operator context. Outputs copy doc + .pptx file."
triggers: ["LinkedIn carousel", "build carousel", "carousel from transcript", "document post", "slide deck for LinkedIn", "carousel from this post", "carousel slides"]
version: 1.0
---

# LinkedIn Carousel Builder

## Objective
Produce a complete LinkedIn carousel — slide-by-slide copy and a branded .pptx file (1080x1080 square) — ready to upload as a LinkedIn Document post. Every carousel teaches restaurant operators something actionable, backed by 20 years of proof and dollar figures.

## When to Use
- "Build me a LinkedIn carousel on [topic]"
- "Turn this transcript into a carousel"
- "Make a document post from this LinkedIn post"
- "Carousel slides for [framework/concept]"
- Any request for visual slide content targeting LinkedIn

## Required Inputs
- **Topic, transcript, or existing post** (required) — the raw material to build from
- **Target audience segment** (optional — defaults to independent restaurant operators)
- **Desired structure** (optional — defaults to best fit based on content)
- **Slide count preference** (optional — defaults to 8-10)
- Minimum viable input: a single topic sentence or pasted transcript

## Reference Files
| File | Load When | Purpose |
|------|-----------|---------|
| `references/brand-palette.md` | Always | Colors, fonts, spacing specs |
| `references/examples.md` | Step 3 (writing) | Approved carousel examples for quality calibration |
| `references/slide-templates.md` | Step 4 (building .pptx) | PptxGenJS code patterns and layout specs |

---

## Brand Palette — Premium Authority

| Element | Value | Usage |
|---------|-------|-------|
| **Navy** | `#0A1628` | Primary slide background |
| **Navy Light** | `#0E1B30` | Alternate background for variety |
| **Gold** | `#D4AF37` | Accent lines, numbers, CTAs, key figures |
| **Gold Dim** | `#B89630` | Secondary accent |
| **White** | `#F8F9FA` | Primary text |
| **White Dim** | `#B8BEC8` | Secondary text, captions |
| **Display Font** | Oswald (Bold/SemiBold) | Headlines, slide titles, numbers |
| **Body Font** | Inter (Regular/Medium) | Body copy, captions |

---

## 7 Slide Types

1. **Hook Slide** — Bold statement, pattern interrupt. One line max. Oswald Bold, large. Gold accent bar.
2. **Problem Slide** — Pain point with specifics. Dollar figures or time costs. White text on navy.
3. **Framework Slide** — Numbered system or steps. Gold numbers, white text. One step per line.
4. **Data/Proof Slide** — Stats, dollar figures, measurable results. Gold for the number, white for context.
5. **Story Slide** — Personal anecdote (collapse, rebuild, Yukon, 5 countries). Short. Raw. Real.
6. **Action Slide** — What to do right now. Numbered or bulleted. Concrete, not motivational.
7. **CTA Slide** — Follow, comment, DM, or link. Gold accent. Clear single action.

---

## 3 Carousel Structures

### Structure A: Teaching
`Hook -> Problem -> Framework (2-4 slides) -> Proof -> Action -> CTA`
Best for: systems, processes, how-to content.

### Structure B: Narrative
`Hook -> Story (2-3 slides) -> Lesson -> System -> CTA`
Best for: personal experience, rebuilding stories, Yukon content.

### Structure C: Debunking
`Hook -> Myth -> Reality -> Data/Proof -> Action -> CTA`
Best for: calling out BS, industry myths, bad advice.

---

## Workflow

### Step 1: Parse Input
Read the input (topic, transcript, or post) and extract:
- Core message (one sentence)
- Key data points (dollar figures, percentages, timeframes)
- Personal experience hooks (which scars apply?)
- Target operator pain point

Classify which **Grumpy Trinity voice** fits:
- **Rebel** — calling out BS, debunking, provocative
- **Creator** — obsessive craft, systems, the right way
- **Sage** — hard-won wisdom, fatherly honesty, restraint

Select 1-2 voices for the carousel.

Select the best **structure** (A, B, or C) based on content type.

> HUMAN CHECK: Present the plan — core message, selected structure, voice(s), estimated slide count. Get approval before writing slides.

### Step 2: Write Slide Copy
Write each slide following these constraints:

- **Max 30 words per slide** (readability on mobile)
- **One idea per slide** (never stack concepts)
- **Hook slide: max 12 words** (pattern interrupt, not a paragraph)
- **Every carousel must include at least one dollar figure or measurable outcome**
- **CTA slide: single clear action** (not three things)

For each slide, specify:
1. Slide number and type (e.g., "Slide 1 — Hook")
2. Headline text (Oswald)
3. Body text if any (Inter)
4. Accent element (gold number, gold bar, gold stat)
5. Any layout notes

### Step 3: Quality Gate — Slide Copy

Run this checklist before presenting slides:

- [ ] **Slide count**: 7-12 slides total (fewer = incomplete, more = loses attention)
- [ ] **Word count**: No slide exceeds 30 words. Hook slide under 12 words.
- [ ] **Dollar signs**: At least one concrete dollar figure or ROI number in the carousel
- [ ] **CTA present**: Final slide has a clear, single call to action
- [ ] **Brand voice**: Passes the "Would Chris say this after a forest walk?" test
- [ ] **No AI mention**: Zero references to AI, automation, or tools in customer-facing copy
- [ ] **Scar attached**: At least one slide connects to Chris's lived experience
- [ ] **One idea per slide**: No slide tries to teach two things
- [ ] **Mobile readable**: Short lines, no walls of text, scannable
- [ ] **Structure followed**: Slides match the selected structure (A, B, or C)

> HUMAN CHECK: Present all slides in order. User approves, requests edits, or rejects. Do NOT proceed to .pptx until copy is approved.

### Step 4: Generate .pptx File

Build the .pptx using PptxGenJS (Node.js) or provide exact specs for manual creation.

**Slide specs:**
- Dimensions: 1080x1080px (10" x 10" at 108 DPI, or use `{ width: 10, height: 10 }`)
- Background: `#0A1628` (navy) — default for all slides
- Margins: 0.8" on all sides
- Headlines: Oswald Bold, 36-44pt, `#F8F9FA`
- Body text: Inter Regular, 20-24pt, `#F8F9FA`
- Secondary text: Inter Regular, 16-18pt, `#B8BEC8`
- Gold accent numbers: Oswald Bold, 60-80pt, `#D4AF37`
- Gold accent bar: 4px horizontal line, `#D4AF37`, top or bottom of slide
- CTA slide: Gold background (`#D4AF37`), navy text (`#0A1628`)

**PptxGenJS approach (preferred):**
```javascript
const pptxgen = require("pptxgenjs");
const pres = new pptxgen();
pres.defineLayout({ name: "SQUARE", width: 10, height: 10 });
pres.layout = "SQUARE";

// Per slide:
const slide = pres.addSlide();
slide.background = { color: "0A1628" };
slide.addText("Headline", {
  x: 0.8, y: 3.0, w: 8.4, h: 2.0,
  fontFace: "Oswald", fontSize: 44, bold: true,
  color: "F8F9FA", align: "left"
});
```

If PptxGenJS is unavailable, output a detailed spec sheet the user can build manually or in Canva.

### Step 5: Output Delivery

Deliver two artifacts:

1. **Copy Document** — All slides in order with text, type labels, and layout notes
2. **.pptx File** — Branded presentation file, ready to upload to LinkedIn as Document post

Include posting notes:
- Upload as "Document" on LinkedIn (not image carousel)
- First slide is the thumbnail — it must hook
- Add a companion text post (2-3 sentences max) with the carousel
- Suggested companion post copy (optional — offer to write it)

---

## Rules

1. NEVER exceed 30 words on any single slide. If it doesn't fit in 30 words, split into two slides.
2. NEVER publish a carousel without at least one dollar figure or concrete measurable outcome.
3. NEVER mention AI, automation, Claude, or any tools in carousel copy. Position everything as "built from 20 years of operator experience."
4. NEVER skip the HUMAN CHECK after slide copy. The .pptx is expensive to rebuild — get copy approval first.
5. NEVER use more than 2 fonts (Oswald + Inter). No decorative fonts. No script fonts.
6. ALWAYS use the Premium Authority palette. No off-brand colors. No gradients except subtle navy variations.
7. ALWAYS make the hook slide brutally short (under 12 words). It is the thumbnail. It must stop the scroll.
8. ALWAYS end with a CTA slide. Every carousel earns the right to ask for something.
9. IF the input is a transcript, THEN extract the single strongest idea — do not try to cover everything.
10. IF the carousel exceeds 12 slides, THEN cut. Tighter is always better. Ask: "Which slide teaches nothing new?"
11. IF no personal experience connects to the topic, THEN use industry data instead — but flag this as weaker content.
12. IF the user provides an existing LinkedIn post, THEN expand it into a carousel — do not just repeat the same text on slides.

---

## Progressive Updates

- When a carousel performs well (high impressions, saves, or comments), save the slide copy to `references/examples.md` with performance data
- When a carousel underperforms, analyze: Was the hook weak? Too many slides? No clear CTA? Add finding to Rules
- When the user corrects slide copy or voice, update `references/examples.md` with the correction
- When a new .pptx layout or design pattern works well, save the PptxGenJS code to `references/slide-templates.md`
- When Chris shares a new story or scar, note it for future Story Slides
- When LinkedIn changes Document post specs or behavior, update Step 4 dimensions and posting notes
