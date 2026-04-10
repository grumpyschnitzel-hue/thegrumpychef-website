# Website Overhaul — thegrumpychef.ca
# Master Task List for Claude Code
# Generated: 2026-04-07

---

## Context for Claude Code

This is a static HTML site deployed on Netlify. The source files are HTML/CSS/JS. Every task below is a specific change to a specific file. Execute in tier order — Tier 1 first, then Tier 2, then Tier 3.

**Key decisions already made:**
- The $47 Operator's Toolkit is DEAD. Remove all references everywhere.
- The product ladder is now: Free Tools -> $197 Kit -> 21-Day Protocol (waitlist) -> Consulting (apply)
- There are zero client testimonials. Only founder's own operation results exist. Do not fabricate social proof.
- The consistent product name is "The 21-Day Protocol" — use this everywhere, no variations.
- The 21-Day Protocol waitlist landing page is BUILT. File: `work/website/21-day-protocol-waitlist.html`. Deploy it and link to it from nav + services page + kit page.

---

## TIER 1 — This Week (Highest Impact, Lowest Effort)

### Task 1.1 — Kill All $47 References
**Files:** `index.html`, `services.html`, `kit.html` (check all files)
**What to do:**
- Search the entire codebase for "$47", "Operator's Toolkit", "Toolkit Bundle", and any variation
- Remove the footer link to the $47 product on `index.html`
- Remove any $47 mention from `services.html`
- Remove any $47 reference from the FAQ section on `index.html`
- If there is a standalone page for the $47 product, delete it or redirect to `kit.html`

**Why:** Three audits flagged this. A visitor sees $47 in the footer, then hits $197 on the Kit page. That gap creates distrust and kills conversions. One ladder, one set of prices, no confusion.

---

### Task 1.2 — Rewrite Hero Section (Above the Fold on Homepage)
**File:** `index.html`
**Current copy (approximate):**
> "YOUR RESTAURANT IS LEAKING MONEY. I lost everything and rebuilt from collapse. I show exhausted operators recovery-based systems that find profit leaks without requiring more hustle."

**Replace with:**

**Headline:**
> Your restaurant is generating revenue. The profit is disappearing somewhere you can't see.

**Subheadline:**
> I find it.

**Move the origin story ("I lost everything...") to a dedicated section lower on the page**, after the problem/stats section. The hero is about the visitor's problem, not the founder's backstory. A burned-out operator at 11pm cares about their bleeding first. They'll care about Chris's story after they feel understood.

---

### Task 1.3 — Single CTA Above the Fold
**File:** `index.html`
**Current state:** Two competing CTAs side by side — "Find Your #1 Profit Leak" and "Get Friday Systems Brief"
**Fix:** Remove the newsletter CTA from the hero section. One button only:

> **Find Your #1 Profit Leak ->**

The Friday Systems Brief CTA belongs lower on the page, after the problem section, as a secondary capture for visitors who aren't ready for the calculator yet.

---

### Task 1.4 — Fix Calculator Email Capture Copy
**File:** `calculator.html`
**Current copy:**
> "No spam. No 47-email sequence. Your protocol and that's it."

**Replace with:**
> "Your protocol lands in your inbox. I'll follow up once a week with one tactic. That's it."

**Why:** The current copy actively kills the nurture sequence before it starts. A visitor who opts in expecting zero follow-up will unsubscribe the moment the sequence arrives. The new copy sets honest expectations without promising silence.

---

### Task 1.5 — Fix Calculator Post-Submission State
**File:** `calculator.html`
**Current state:** After email submission, the next visible CTA is "Get the 72-Hour Profit Discovery Kit — $197" with no bridge.
**Fix:** Add a thank-you confirmation block between the form submission and the upsell:

> **Your protocol is on its way.** Check your inbox in the next few minutes.
>
> While you wait — the 72-Hour Profit Discovery Kit gives you the exact tools to execute what the calculator just found. It finds the money.
>
> **[Get the 72-Hour Kit — $197 ->]**

This adds a warm bridge. The jump from $0 to $197 with no transition loses most leads.

---

### Task 1.6 — Move Guarantee Up on Kit Page
**File:** `kit.html`
**Current state:** "The 'Find a Leak' Guarantee" is buried near the bottom, below features and FAQ.
**Fix:** Move the guarantee block to immediately after the FIRST CTA button / price mention. After the buy button, add:

> **The "Find a Leak" Guarantee:** Complete the 72-Hour Discovery. Find a leak worth more than $197/month — or full refund. No questions.

The guarantee removes the primary objection to buying. It should be the first thing a visitor sees after the price, not the last.

---

### Task 1.7 — Fix Navigation Labels
**File:** All files with navigation (likely a shared nav component or repeated in each HTML file)

**Changes:**
1. Rename "Discovery Kit" to **"72-Hour Kit"** — the current label next to "Free Tools" implies the Kit is free. One word change eliminates the mismatch.
2. Rename "The Protocol" to **"The 21-Day Protocol"** everywhere it appears — nav, homepage, services page, footer. One name. No variations.
3. Add nav link to the new waitlist page: **"The 21-Day Protocol"** -> `/21-day-protocol.html`

**Search and replace across all files:**
- "The Protocol" -> "The 21-Day Protocol" (in nav only — don't break longer references)
- "The 21-Day Restaurant Recovery Protocol" -> "The 21-Day Protocol"
- "21-Day Recovery Protocol" -> "The 21-Day Protocol"

---

### Task 1.8 — Deploy the 21-Day Protocol Waitlist Page (NEW)
**File:** `work/website/21-day-protocol-waitlist.html`
**What to do:**
1. Copy/rename to `21-day-protocol.html` in the website root (match the site's file structure)
2. Match the site's existing nav/header/footer styles — the draft has standalone styles, these need to be aligned with the site's CSS
3. Wire the email form to Kit (ConvertKit) — create a "21-day-waitlist" tag in Kit and point the form action to the Kit form endpoint
4. Add link from `services.html` — wherever The 21-Day Protocol is mentioned, link to this page
5. Add link from `kit.html` — add a "What comes after the Kit?" section at the bottom linking here
6. Add to site navigation

**The page is ready.** The copy, structure, and sections are complete. It just needs to be integrated with the existing site's styles and deployed.

---

## TIER 2 — Next Week (Medium Effort, High Impact)

### Task 2.1 — Fix Services Page Dead Ends
**File:** `services.html`
**Current state:** Level 3 (Waitlist) and Level 4 (Apply) are dead ends. 80% of visitors hit a wall.
**Fix:** Add a holding CTA below Levels 3 and 4:

> **Not there yet?** Join the Friday Systems Brief — one tactic a week. When you're ready to go further, you'll know.
> **[Get the Friday Systems Brief ->]** (link to newsletter signup)

Also: Level 3 should now link to the 21-Day Protocol waitlist page instead of being a dead end.

**Level 4 (Consulting):** Replace the dead "Apply" button with a Calendly embed or direct link:
> **Ready to go deeper?** Book a 15-minute discovery call. No sales pitch — just your numbers.
> **[Book a 15-Minute Discovery Call ->]** (link to Calendly — [PASTE URL])

This kills the biggest dead end on the site. A burned-out operator at 11pm can book a slot without waiting for email back-and-forth.

---

### Task 2.2 — Add Stats Attribution
**File:** `index.html`
**Current copy:** "76% Can't Control Food Cost," "$5,864 Cost Per Lost Employee," "51% Can't Find Staff" — presented as facts, no sources.
**Fix — pick one approach:**

**Option A (stronger):** Add source attribution in small text under each stat:
> Source: National Restaurant Association, 2024

**Option B (if sources can't be verified):** Reframe the intro:
> "In 20 years across 5 countries, here's what I kept seeing:"

Then the stats become observations from experience, not unattributed claims. On a site with zero client testimonials, unattributed data is a credibility leak.

**[VERIFY: Chris needs to confirm which option. If you have the sources, use Option A. If not, use Option B.]**

---

### Task 2.3 — Add Founder Story Specificity
**File:** `index.html`
**Current state:** "In 2022, I watched it all collapse" — but the recovery arc is vague. No dates, no milestones.
**Fix:** After the line about moving to the Yukon, add one sentence with specific milestones:

> April 2022 was the bottom. By month three I had one system running. By month six, prime costs were controlled for the first time.

**[VERIFY: Chris needs to confirm these dates and milestones are accurate. Do not publish without verification.]**

Specific dates and milestones make the story verifiable. Vague recovery arcs read like marketing.

---

### Task 2.4 — Add "Own Results" Proof Section
**File:** `kit.html` (above the guarantee section)
**Context:** No client testimonials exist. But Chris's own operation numbers are real.
**Fix:** Add a section framed honestly:

> **What this found in my own operation:**
>
> $41K in identified profit leaks across food cost, labour scheduling, and menu pricing. Rebuilt from $370K in debt to controlled prime costs in 6 months. Running in Dawson City, Yukon — 64 North, limited supply chain, extreme constraints.
>
> These are my numbers. Not a client's. Not invented. When the first operators run the Kit, their numbers go here.

**[VERIFY: Chris must confirm the $41K and $370K figures are accurate before publishing.]**

This is more credible than silence. Honest framing of own results beats fake testimonials or empty space.

---

### Task 2.5 — Fix FAQ Pricing Answer
**File:** `index.html`
**Current FAQ copy (approximate):** "Self-serve frameworks and guides range from $200-$2,000."
**Replace with:**

> Free tools cost nothing. The 72-Hour Profit Discovery Kit is $197. The 21-Day Protocol is in development — join the waitlist. For consulting, book a 15-minute discovery call — no pitch, just your numbers.

This matches the actual ladder. No contradictions. No phantom price ranges.

---

### Task 2.6 — Add Next Step After Kit Purchase
**File:** `kit.html`
**Current state:** The Kit page sells $197 and stops. No mention of what comes next.
**Fix:** Add a section at the bottom, after the final CTA:

> **What happens after the Kit?**
>
> The 21-Day Protocol picks up where the 72-Hour Discovery ends. It builds the system so it doesn't come back.
>
> Launching Q3 2026. Get on the waitlist — you'll be first to know.
>
> **[Join the 21-Day Protocol Waitlist ->]** (link to `/21-day-protocol.html`)

This keeps buyers in the funnel instead of dropping them after purchase.

---

### Task 2.7 — Restructure Homepage Scroll Order
**File:** `index.html`
**Current state:** Hero does two jobs (origin story + promise). Stats are unanchored. CTA placement is scattered.
**Fix — restructure the page sections in this order:**

1. **Hero:** Problem headline + single CTA (Find Your #1 Profit Leak ->)
2. **Problem/Stats:** The numbers that kill restaurants (with attribution — see Task 2.2)
3. **Solution intro:** "Systems Over Hustle" — what the approach is, in 2-3 sentences
4. **The Founder Story:** Origin story moves here. Now it has context. Visitor understands the problem first, then cares about who's solving it.
5. **The Ladder:** Free calculator -> $197 Kit -> 21-Day Protocol (waitlist) -> Consulting
6. **Friday Systems Brief signup** (secondary capture — catches people not ready to buy)
7. **FAQ**
8. **Footer**

This follows a proper AIDA structure: Attention (hero) -> Interest (stats/problem) -> Desire (solution + story + proof) -> Action (offers + CTA).

---

## TIER 3 — Within 30 Days (Higher Effort)

### Task 3.1 — Rewrite All CTA Buttons
**Files:** All pages
**Current state:** CTAs are vague — "Apply Now," "Start Free," generic language.
**Fix — every CTA gets specific outcome language:**

| Current | Replace With |
|---------|-------------|
| "Start Free Calculator" | "Find Your #1 Profit Leak — Free" |
| "Apply Now" | "Book a 15-Minute Profit Recovery Call" (link to Calendly — [PASTE URL]) |
| "Start Free" | "Run the Calculator — Takes 5 Minutes" |
| "Get the 72-Hour Profit Discovery Kit — $197" | "Get the 72-Hour Kit — $197" (shorter, cleaner) |
| "Get Friday Systems Brief" | "One Tactic a Week — Free" |

---

### Task 3.2 — Mobile Optimization Pass
**Files:** CSS files, all HTML pages
**What to do:**
- Audit the site on mobile viewport (375px width)
- Ensure single-column layout on all pages
- Hero text must be readable without zooming
- CTA buttons must be full-width on mobile
- Calculator form must be usable on phone
- Stats section should stack vertically, not horizontally

**Why:** The target user is a burned-out restaurant operator checking their phone at 2am after close. If the site doesn't work on a phone, it doesn't work.

---

### Task 3.3 — Build Dedicated /offers Page
**File:** New file — `offers.html`
**What to do:** Create a clean comparison page showing the full ladder:

> **Free** — Profit Leak Calculator + Menu Profit Assessment. Find the problem.
>
> **$197** — 72-Hour Profit Discovery Kit. Fix the problem this weekend.
>
> **Coming Q3 2026** — The 21-Day Protocol. Build the system so the problem doesn't come back.
>
> **By Application** — Consulting. Done-with-you implementation. **[Book a 15-Minute Discovery Call ->]** (Calendly link)

Add this page to the navigation. This gives visitors a single place to understand the full picture.

---

### Task 3.4 — Clean Up "Who Is The Grumpy Chef" FAQ
**File:** `index.html`
**Current state:** Long bio paragraph that reads like a resume.
**Replace with:**

> I've been exactly where you are — 100-hour weeks, $370K in debt, family on the edge. 20 years in kitchens across 5 countries. Kuchenmeister. I rebuilt from collapse in the Yukon using the same systems I now hand to operators. That's it.

Two sentences of credentials. One sentence of relevance. Done.

---

## REJECTED Recommendations (and why)

These appeared in the audits but are wrong for Chris's current stage:

| Recommendation | Source | Why Rejected |
|---|---|---|
| Create $97 "Profit Leak Starter Kit" | Audit 2 | Adds complexity. Chris needs fewer products, not more. |
| Launch $997 "Fast-Start Recovery Package" bundle | Audit 2 | No products to bundle. The 21-Day Protocol doesn't exist yet as a product. |
| Launch paid Inner Circle membership | Audit 2 | No audience. Memberships need 50+ paying members to sustain. Way too early. |
| "$297 Menu Audit" as tripwire | Audit 3 | Chris is pre-first-client. Can't deliver done-for-you services at this price point yet. |
| "Fractional Executive Chef" retainer | Audit 3 | Future play. Needs proven results and client base first. |
| "Join 100+ operators" in copy | Audit 2 | Fabricated number. Violates the brand voice rules. Never invent facts. |
| ~~Replace Contact form with Calendly~~ | Audit 3 | **NOW ADOPTED** — Calendly is live. Integrated into Tasks 2.1, 3.1, 3.3. |
| Add scarcity ("First 50 operators...") | Audit 2 | Manufactured urgency on a pre-launch site reads as desperate. |

---

## What Was Best From Each Audit

**Audit 1 (the 15-item tactical list):** The strongest. Highly specific, correctly prioritized, directly executable. The email capture copy fix and thank-you state fix are the two highest-ROI changes on the entire site.

**Audit 2 (the strategic review):** Good diagnosis of copy weaknesses and AIDA scroll structure. Product ladder analysis is accurate but recommendations overshoot Chris's stage. Customer flow improvements (persistent nav, micro-commitments after free tools) are solid.

**Audit 3 (Gemini):** Shortest and most surface-level. The "Who This Is For" section idea is good. The "Grumpy FAQ" idea (Q: Are you going to yell at my staff?) is strong brand voice and worth stealing.

---

## Execution Order for Claude Code

**Session 1 (30-60 min):** Tasks 1.1, 1.3, 1.4, 1.7 — search-and-replace and small copy changes.

**Session 2 (60-90 min):** Tasks 1.2, 1.5, 1.6 — hero rewrite, calculator post-submission state, guarantee repositioning.

**Session 3 (45-60 min):** Task 1.8 — deploy the 21-Day Protocol waitlist page, wire to Kit, integrate with nav and site styles.

**Session 4 (60-90 min):** Tasks 2.1, 2.5, 2.6 — services page fixes, FAQ rewrite, Kit page next-step section.

**Session 5 (90-120 min):** Tasks 2.4, 2.7 — own-results proof section and homepage scroll restructure.

**Session 6 (60 min):** Tasks 3.1, 3.4 — CTA rewrites and FAQ cleanup across all pages.

**Session 7 (120+ min):** Tasks 3.2, 3.3 — mobile optimization and new offers page.

**Deferred (needs Chris's input first):** Tasks 2.2 (stats attribution) and 2.3 (founder story dates).

---

## Chris's Action Items (Not Claude Code)

1. **Verify the stats sources** — "76% Can't Control Food Cost," "$5,864 Cost Per Lost Employee," "51% Can't Find Staff." Find the original sources or tell me to reframe as observations.
2. **Verify the founder story dates** — When exactly did the collapse happen? When did the first system start working? When were prime costs controlled? Specific months.
3. **Verify the dollar figures** — Is $41K the accurate number for identified profit leaks? Is $370K the accurate debt figure?
4. **Write down your own results** in plain language — what did you find, how much was it, how long did the fix take? This becomes the proof section.
5. **Set up Kit tag** — Create a "21-day-waitlist" tag in ConvertKit before Session 3 so the form can be wired up.
6. **Paste Calendly link** — Needed for Tasks 2.1, 3.1, and 3.3. Every instance of `[PASTE URL]` in this plan gets replaced with your actual Calendly URL.
