# Content Funnel Map: Topic > Destination > Goal

> **Purpose:** Every piece of content has one job. This file maps what content drives where, what it captures, and what success looks like at each stage.
> **Not in this file:** Email nurture sequences (see `email-sequences.md`), hooks (`hook-library.md`), CTAs (`cta-library.md`), platform specs (`platform-templates.md`).
> **Rule:** No content gets published without a routing assignment from this file. One topic. One destination. One CTA. No exceptions.

---

## The Funnel (3 Stages)

| Stage | Reader's State | Content Job | Destination Type |
|-------|---------------|------------|-----------------|
| **Awareness** | "I have this pain but haven't named it" | Make them feel seen. Name the problem. Build trust. | Newsletter/Substack, About page |
| **Consideration** | "This person understands it and has a system" | Prove the method. Show the mechanism. Deliver a free win. | Calculator, Assessment, Optimizer, Academy Waitlist |
| **Conversion** | "I'm ready to try the tools or talk to this person" | Remove friction. Show proof. Make the next step obvious. | Discovery Call, paid offers |

---

## The 7 Destinations

| # | Destination | URL | What It Captures | Tag in Kit |
|---|------------|-----|-----------------|-----------|
| 1 | 72-Hour Profit Discovery Calculator | thegrumpychef.netlify.app | Email, calculator results | `calculator-lead` (15797829) |
| 2 | Menu Profit Score Assessment | thegrumpychef.netlify.app/assessment | Email, quiz score, missed opportunities | `assessment-lead` (15797830) |
| 3 | Menu Engineering Optimizer | thegrumpychef.netlify.app/optimizer | Email (gated at description generator), menu item data | `menu-optimizer-user` |
| 4 | Academy Waitlist | thegrumpychef.netlify.app/academy | Email, founding member interest | `waitlist-lead` (15797831) |
| 5 | Newsletter / Substack | Substack subscribe page | Email | Substack managed |
| 6 | Discovery Call | Booking page / DM reply | Email, call request, qualifying info | `discovery-call-request` (15875865) |
| 7 | Operator Life OS Scorecard | thegrumpychef.netlify.app/life-os | Email, 5 system scores, weakest system | `life-os-lead` (16379184) |

**Post-entry nurture:** Each destination triggers an automated email sequence. See `email-sequences.md` for full sequences and timing.

---

## Master Routing Table

This is the core of the file. Every content topic maps to one primary funnel stage, one destination, and one goal.

| Content Topic | Funnel Stage | Primary Destination | CTA Goal | Secondary Destination |
|--------------|-------------|--------------------|---------|--------------------|
| **Food cost / margin posts** | Consideration | 72-Hour Calculator | Email capture + diagnosis | Menu Optimizer (if they want item-level data) |
| **Menu engineering / pricing posts** | Consideration | Menu Profit Score Assessment | Email capture + score + quick wins | Menu Optimizer (natural next step) |
| **Menu item analysis / Stars & Dogs posts** | Consideration | Menu Engineering Optimizer | Email capture + matrix classification | Calculator (if they haven't run it yet) |
| **Burnout / recovery / lifestyle posts** | Awareness | Newsletter / Substack | Subscribe + trust | Operator Life OS Scorecard |
| **Personal systems / life balance / operator health posts** | Consideration | Operator Life OS Scorecard | Email capture + 5-system score + weakest system | Newsletter (if they haven't subscribed) |
| **Framework / systems posts** | Consideration | Academy Waitlist | Email capture + demand signal | Calculator (prove the framework with their data) |
| **Transformation story / case study posts** | Conversion | Discovery Call | Book a call | Calculator (pre-call prep) |

### How to Read This Table

1. You write a post about food costs > it routes to the Calculator
2. You write a post about your burnout story > it routes to the Newsletter
3. You write a case study about a client's transformation > it routes to the Discovery Call
4. **Never stack destinations.** Pick the primary. The secondary is for operators who've already used the primary.

---

## Detailed Routing: Content > Destination > What Happens

### Route 1: Food Cost Posts > 72-Hour Calculator > Email

**Funnel stage:** Consideration
**Role:** Mid-funnel proof that you understand their biggest bleeding wound — margin and food cost.

**Content examples:**
- "5 hidden ways your kitchen leaks margin every week"
- "Why your food cost spreadsheet is lying to you"
- "A $48 steak at 38% food cost vs a $16 salad at 25% — which makes more money?"
- Quick breakdowns of contribution margin vs food cost %

**CTA pattern:** "Run the free calculator and see your real numbers in 3 minutes > [link]"

**What the destination captures:**
- Email address
- Calculator results (8 leak categories scored)
- Webhook fires to n8n > Kit tags subscriber as `calculator-lead`

**What happens after:**
- 5-email nurture sequence fires (see `email-sequences.md`)
- Sequence moves them toward Menu Assessment > Menu Optimizer > Discovery Call

**Success metric:** Calculator completion rate > 60%, email capture rate > 15%

---

### Route 2: Menu Posts > Menu Profit Score Assessment > Email

**Funnel stage:** Consideration
**Role:** Mid-funnel, framed around growth (menu optimization, profit design) instead of pure cost pain.

**Content examples:**
- "The 3 menu items quietly killing your profit"
- "Your menu is a map — most operators can't read it"
- "Stars, Plowhorses, Puzzles, Dogs — which ones are on your menu?"
- Before/after menu teardowns

**CTA pattern:** "Score your menu in 3 minutes — free assessment > [link]"

**What the destination captures:**
- Email address
- Quiz score + missed opportunities + quick wins
- Webhook fires to n8n > Kit tags subscriber as `assessment-lead`

**What happens after:**
- 5-email assessment nurture sequence fires
- Sequence bridges to Menu Optimizer > Discovery Call

**Success metric:** Assessment completion rate > 50%, email capture rate > 12%

---

### Route 3: Menu Item Analysis Posts > Menu Engineering Optimizer > Email

**Funnel stage:** Consideration
**Role:** Deep mid-funnel for operators who want item-level data. The "do this next" engine after the Assessment.

**Content examples:**
- "I cut 4 Dogs from my menu and freed 6 hours of prep/week"
- "How to classify every dish on your menu in one afternoon"
- "The Menu Engineering Matrix — it's from 1982 and almost no operator uses it"
- Item-level contribution margin breakdowns

**CTA pattern:** "Classify your menu items free — see your Stars and Dogs in 3 minutes > [link]"

**What the destination captures:**
- Menu item data (name, price, food cost, sales volume)
- Email (gated at AI description generator feature)
- Webhook fires to n8n > Kit tags subscriber as `menu-optimizer-user`

**What happens after:**
- 4-email optimizer nurture sequence fires (see `email-sequences.md`)
- Sequence delivers quadrant-specific action steps, bridges to Discovery Call

**Success metric:** Tool completion rate (enter data > see matrix) > 60%, email capture > 15%

---

### Route 4: Burnout / Recovery Posts > Newsletter / Substack > Trust

**Funnel stage:** Awareness
**Role:** Top-of-funnel emotional connection and identity positioning — "He's been where I am."

**Content examples:**
- "How I went from $370K CAD in debt to rebuilding from a cabin in the Yukon"
- "My daughter drew our family. I wasn't in it."
- "The night I fell asleep standing up during Friday service"
- Recovery language content: "behavior leads belief," "one day at a time"

**CTA pattern:** "I write about this every week — subscribe free > [link]" or soft DM invitation

**What the destination captures:**
- Email via Substack subscribe
- Low-friction entry into ecosystem

**What happens after:**
- Weekly newsletter builds parasocial trust
- Newsletter content periodically routes to Calculator, Assessment, or Optimizer
- Warmest subscribers eventually see Discovery Call offers

**Success metric:** Subscribe rate from social CTAs > 3%, newsletter open rate > 35%

---

### Route 5: Framework / Systems Posts > Academy Waitlist > Demand

**Funnel stage:** Consideration (high-intent)
**Role:** Pure mid-funnel for system-minded operators. "Here is the system behind all my content."

**Content examples:**
- "The 21-Day Restaurant Recovery Protocol — how it works"
- "The 4 systems every independent restaurant needs to survive"
- "My Restaurant OS: what I wish I had 10 years ago"
- Framework breakdowns showing the methodology

**CTA pattern:** "Join the Academy waitlist — founding member pricing when doors open > [link]"

**What the destination captures:**
- Email + founding member interest signal
- Webhook fires to n8n > Kit tags subscriber as `waitlist-lead`

**What happens after:**
- 3-email waitlist confirmation sequence fires
- Warm them with behind-the-scenes, case studies, early-bird offers
- This becomes the launch list for courses, cohorts, and future products

**Success metric:** Waitlist signup rate from framework posts > 5%, email open rate > 40%

---

### Route 6: Transformation Story / Case Study > Discovery Call > Call Booked

**Funnel stage:** Conversion
**Role:** Bottom-of-funnel social proof. "Here's someone like you who crossed the bridge."

**Content examples:**
- "How one operator found $2,400/month in hidden margin in 3 dishes"
- "From 80-hour weeks to Sundays off — the 90-day story"
- Deep-dive case studies with before/after numbers
- Video testimonials or screen shares

**CTA pattern:** "If you see yourself in this story — DM me DISCOVERY" or "Book a 30-minute call > [link]"

**What the destination captures:**
- Email + call request
- Qualifying info (revenue, seats, biggest problem)
- Webhook fires to n8n > Kit tags subscriber as `discovery-call-request`

**What happens after:**
- 1-email confirmation fires immediately
- Chris follows up within 24 hours to schedule
- Call structure: diagnose > tailored plan > clear offer

**Qualification friction (intentional):** Short qualifying questions (revenue, seats, biggest problem) filter tire-kickers before the call.

**Success metric:** Call booking rate from case study content > 2%, call show-up rate > 80%, close rate > 40%

---

### Route 7: Personal Systems / Operator Health Posts > Operator Life OS Scorecard > Email

**Funnel stage:** Consideration (personal entry point)
**Role:** Mid-funnel entry targeting personal pain (burnout, exhaustion, broken relationships) instead of business pain (food cost, staffing). Different door, same house.

**Content examples:**
- "Your restaurant can't outperform your personal operating system"
- "I was sleeping 5 hours and making $370K CAD in bad decisions"
- "The recovery principle that saved my marriage and my restaurant"
- "5 systems every burnt-out operator is missing"
- Personal systems content: sleep, boundaries, date nights, financial separation, goal setting

**CTA pattern:** "Score your personal operating system in 5 minutes — free diagnostic > [link]"

**What the destination captures:**
- Email address + name + restaurant name + phone (optional)
- All 5 system scores (Goals, Time, Health, Relationships, Money — each 0-10)
- Total score (0-50) with zone (Red/Yellow/Green/Operator Mode)
- #1 weakest system identified
- Webhook fires to n8n > Kit tags subscriber as `life-os-lead`

**What happens after:**
- 5-email Life OS nurture sequence fires (see `email-sequences.md`)
- Sequence bridges them toward Menu Assessment (restaurant tools) or Discovery Call (high-intent)
- Different entry point, same funnel destination: Assessment > Discovery Call

**Success metric:** Scorecard completion rate > 60%, email capture rate > 15%

**Why this matters:** This is the only entry point in the funnel that targets the operator's personal pain. Every other destination targets business metrics. Operators who enter through personal pain (burnout, no sleep, broken relationships) are often higher-intent — they've hit a wall that food cost calculators can't fix.

---

## The 3 Routing Rules

### Rule 1: Each Post Gets a Tag and a CTA

Before publishing, assign:
- **Topic** (Food Cost / Menu / Menu Items / Burnout / Framework / Transformation)
- **Stage** (Awareness / Consideration / Conversion)
- **Destination** (Calculator / Assessment / Optimizer / Newsletter / Waitlist / Discovery Call)
- **CTA** (pulled from `cta-library.md`)

If you can't assign all four, the post isn't ready.

### Rule 2: Platform Intent Decides CTA Aggressiveness

| Platform Context | CTA Strength | Destinations |
|-----------------|-------------|-------------|
| Cold social (Reels, tweets, Substack Notes) | Light | Newsletter, Calculator, Assessment |
| Warm social (LinkedIn, carousels, FB Groups) | Medium | Calculator, Assessment, Optimizer, Waitlist |
| Email / DMs / warm retargeting | Strong | Waitlist, Discovery Call |

Never push Discovery Call CTAs on cold social. That's what email and DMs are for.

### Rule 3: Data Decides the Next 30 Days

Monthly, check: which topic > which destination > which revenue.
Double down on the 1-2 routes with the best pipeline impact.
Kill or rework routes that don't convert.

---

## The Natural Progression Path

Most operators move through destinations in this order. Content should nudge them forward, not skip steps.

```
Newsletter (trust) > Calculator (diagnosis) > Assessment (score) > Optimizer (action) > Discovery Call (implementation)
```

**Personal pain entry path:**
```
Life OS Scorecard (personal diagnosis) > Assessment (restaurant diagnosis) > Discovery Call (implementation)
```

**Alternative entry points exist.** An operator might find you through a food cost post and go straight to the Calculator. Or they might enter through a burnout post and take the Life OS Scorecard first. That's fine — the email sequences handle the nurture from any entry point.

**The key rule:** Never push an operator to a later-stage destination before they've engaged with an earlier one, unless they signal high intent (DM, reply, direct request).

---

## Funnel KPI Benchmarks

Target ranges for each stage. "OK" means functioning. "Strong" means optimize other stages first.

### Awareness Stage

| KPI | OK Range | Strong Target |
|-----|----------|--------------|
| Social CTR (impressions > clicks) | 0.5-1.5% | 1.5-3% |
| Engagement rate (likes+comments+saves / reach) | 1-3% | 5%+ |
| Video watch completion (Reels/Shorts) | 25-35% to 75% mark | 40-50%+ |
| Newsletter subscribe rate from social CTAs | 1-2% | 3%+ |
| Newsletter open rate | 20-30% | 35-45% |

### Consideration Stage

| KPI | OK Range | Strong Target |
|-----|----------|--------------|
| Landing page conversion (visitor > opt-in) | 2-5% | 5-15% |
| Calculator completion rate | 40-50% | 60%+ |
| Assessment completion rate | 35-45% | 50%+ |
| Optimizer completion rate (data entry > matrix view) | 40-50% | 60%+ |
| Email nurture click rate | 2-5% | 5-10% |
| Lead > qualified lead (engaged with tool + opened 3+ emails) | ~30% | 40-50% |

### Conversion Stage

| KPI | OK Range | Strong Target |
|-----|----------|--------------|
| Qualified lead > call booked | 10-20% | 20-35% |
| Call show-up rate | 60-70% | 80%+ |
| Call > client (close rate) | 20-30% | 40-50%+ |
| Waitlist > purchase (when Academy launches) | 10-15% | 20-30% |

### Revenue Attribution

| KPI | What It Measures |
|-----|-----------------|
| Revenue per entry path | Which route (Calculator, Assessment, Newsletter, etc.) produces the most paying clients |
| Time to conversion | Days from first touch to Discovery Call booking |
| Content-to-call ratio | How many pieces of content does it take to produce one booked call |

---

## Monthly Funnel Health Check

Run this on the 1st of every month. Takes 30 minutes. Prevents funnel decay.

### Step 1: Pull the Numbers

For each route, record:

| Route | Impressions | Clicks | Opt-ins | Qualified | Calls | Clients | Revenue |
|-------|------------|--------|---------|-----------|-------|---------|---------|
| Food Cost > Calculator | | | | | | | |
| Menu > Assessment | | | | | | | |
| Menu Items > Optimizer | | | | | | | |
| Burnout > Newsletter | | | | | | | |
| Framework > Waitlist | | | | | | | |
| Transformation > Call | | | | | | | |
| Personal Systems > Life OS Scorecard | | | | | | | |

### Step 2: Find the Bottleneck

Compare each stage to the benchmarks above. Find the ONE stage that is furthest below target.

**Priority logic:**
1. If conversion (calls > clients) is low > fix call structure or qualification
2. If consideration (opt-ins > calls) is low > fix nurture sequences or tool experience
3. If awareness (impressions > clicks) is low > fix hooks and content topics

Fix the lowest stage first. One bottleneck at a time.

### Step 3: Diagnose the Cause

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| High impressions, low clicks | Weak hooks or wrong audience | Test new hook types from `hook-library.md` |
| Good clicks, low opt-ins | Landing page friction or weak value promise | Simplify the page: who it's for, what they get, one button |
| Good opt-ins, low engagement | Nurture sequence isn't landing | Review `email-sequences.md`, test subject lines |
| Good engagement, no calls | Missing bridge content or weak conversion CTAs | Add more transformation/case study content routing to calls |
| Calls booked, low close rate | Wrong people getting through OR weak call structure | Tighten qualifying questions, add pre-call case study email |

### Step 4: Set One Experiment for the Month

Pick ONE fix. Define:
- **What you're changing** (e.g., "new hook type on food cost posts")
- **What you're measuring** (e.g., "CTR from food cost posts to Calculator")
- **How long you're testing** (e.g., "4 weeks, 8 posts")
- **What success looks like** (e.g., "CTR moves from 1.2% to 2%+")

One experiment per month. Not three. Not five. One.

### Step 5: Update the Routing

Based on results:
- **Double down** on routes that beat benchmarks
- **Rework** routes that are below OK range
- **Kill** content topics that consistently don't drive any destination

---

## UTM Tagging Convention

For tracking which content drives which destination, use this naming convention:

```
utm_source = [platform]
utm_medium = [content-type]
utm_campaign = [topic]_[stage]_[destination]
```

**Examples:**
- `utm_source=linkedin&utm_medium=text-post&utm_campaign=foodcost_C_calculator`
- `utm_source=instagram&utm_medium=reel&utm_campaign=burnout_A_newsletter`
- `utm_source=email&utm_medium=nurture&utm_campaign=menu_C_optimizer`

This lets you trace: which platform > which content type > which topic > which destination > which revenue.

---

## How SKILL.md Uses This File

1. **Content is assigned a topic** > This file maps the topic to a funnel stage and destination
2. **CTA is selected** > From `cta-library.md`, matching the destination and awareness stage
3. **Hook is selected** > From `hook-library.md`, matching the pain point and awareness stage
4. **Platform format is applied** > From `platform-templates.md`
5. **Post is published with UTM tag** > Following the convention above
6. **Monthly health check reviews performance** > Routing adjustments made based on data
