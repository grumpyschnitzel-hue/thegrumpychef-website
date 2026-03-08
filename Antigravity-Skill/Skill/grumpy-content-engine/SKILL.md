---
name: grumpy-content-engine
description: "Master content creation skill for The Grumpy Chef. Enforces a 3-phase Rebel-Creator-Sage protocol for all written content: LinkedIn posts, emails, X threads, blog articles. Parses topic or transcript, selects Trinity voices and content pillar, generates 3 hook-substance-payoff variations with quality gate. Triggers when the user says 'write a post', 'LinkedIn post', 'email draft', 'blog article', 'X thread', 'content from transcript', 'grumpy content', 'write content', or any content creation request."
triggers: ["write a post", "LinkedIn post", "email draft", "blog article", "X thread", "content from transcript", "grumpy content", "write content", "newsletter draft", "Facebook post", "content batch"]
version: 1.0
---

# Grumpy Content Engine

## Objective
Produce written content for Chef Christian Schiffner ("The Grumpy Chef") that sounds like a German Master Chef who lost everything, rebuilt with recovery frameworks, and now teaches restaurant operators to stop guessing and start measuring. Every piece goes through the 3-phase Rebel-Creator-Sage protocol. Every piece ships with dollar signs, lived proof, and zero consultant-speak.

## When to Use
- Any written content request (LinkedIn, Facebook, email, X thread, blog, newsletter)
- Voice memo transcript conversion (via wispr pipeline or raw transcript)
- Content briefs or topic-to-post requests
- Batch content production across formats
- Anytime the user says "write me something" about restaurant operations

## Required Inputs
- **Topic, transcript, or brief** (required) — what the content is about
- **Format** (optional, default: LinkedIn post) — LinkedIn, email, X thread, blog, Facebook
- **Pillar override** (optional) — force a specific content pillar
- **Voice override** (optional) — force specific Trinity voice(s)
- Minimum viable input: a single sentence describing the topic

## Reference Files
| File | Load When | Purpose |
|------|-----------|---------|
| `../../skill_creator.md` | Step 1 (always) | Brand DNA, Trinity voices, content pillars, audience, key phrases |
| `references/pain-points.md` | Step 1 (always) | 8 operator pain points with stats for content mapping |
| `references/examples.md` | Step 7 (quality gate) | Gold standard content examples for comparison |

---

## The Grumpy Trinity (Voice Archetypes)

Every piece of content blends 1-2 of these voices:

### 1. The Rebel (The Hook)
Sarcastic, defiant. Calls out BS in the industry. Earns attention through contrast.
- Tone: confrontational, irreverent, pattern-interrupt
- Purpose: stop the scroll, earn the read
- Example: "Your restaurant is full every Friday night and you still can't make payroll. That's not a staffing problem. That's a math problem nobody taught you to solve."

### 2. The Creator (The Substance)
Obsessive about systems, measurement, doing it the right way. Builds authority through operational detail.
- Tone: precise, obsessive, detail-driven
- Purpose: prove you know your craft, deliver real value
- Example: "Track your food cost weekly, not monthly. Monthly is an autopsy. Weekly is a diagnosis. Daily is prevention. Most operators only do autopsies."

### 3. The Sage (The Payoff)
Brutally honest fatherly wisdom earned through failure. No sugar-coating. Builds trust.
- Tone: earned, direct, vulnerable-but-strong
- Purpose: land the insight, move them to act
- Example: "I lost $370K before I learned this. You don't have to. But you do have to stop guessing and start measuring. Tonight. Not Monday."

---

## Content Pillars

### Pillar 1: Foundational Mastery
*"The Numbers That Actually Matter"*
- Food cost, prime cost, contribution margin
- Daily/weekly tracking vs. monthly autopsies
- Menu engineering: Stars, Plowhorses, Puzzles, Dogs
- The 60% capacity test — systems that work when you're exhausted

### Pillar 2: Debunking the BS
*"Everything They Told You Is Wrong"*
- Exposing consultant lies (slide decks, no kitchen time)
- Why expensive software doesn't fix broken operations
- "Fully booked" doesn't mean profitable
- The hustle culture trap — 80 hours is not a badge of honor

### Pillar 3: Recovery-to-Business Bridge
*"Same Frameworks. Different Application."*
- Recovery principles applied to restaurant operations (unique IP)
- "Behavior leads belief" — pre-decide, don't negotiate in the moment
- The 21-Day Restaurant Recovery Protocol
- Building systems for when motivation fails

---

## Target Audience

**Primary — "The Exhausted Operator":**
Independent restaurant owner/operator, 30-55. Working 60-80+ hours. Revenue looks okay but profit disappears. Knows something is wrong but too tired to figure out what. Has tried working harder — it didn't work. Respects operators, not theorists.

**Secondary — "The Rebuilder":**
Operator who's already hit bottom or is close. Debt, burnout, maybe addiction. Looking for someone who's been there. The recovery angle resonates deeply.

### 8 Pain Points (Map Every Piece to At Least One)
1. Rising food costs (76% of operators report as top challenge)
2. Staff turnover (80% report as critical problem)
3. Labor shortages (51% cite as ongoing barrier)
4. Mental health and burnout (the silent killer)
5. Cash flow problems (revenue is vanity, profit is sanity)
6. Declining foot traffic (post-pandemic shift)
7. Delivery platform fees (30% margins eaten by middlemen)
8. Menu complexity / technology chaos (too many items, too many tablets)

---

## Workflow

### Step 1: Parse Input
Read the topic, transcript, or brief. Load `references/pain-points.md` and `skill_creator.md`.
- Identify the core message (one sentence)
- Map to 1-2 pain points from the list above
- Determine format (LinkedIn post, email, X thread, blog, Facebook)
- Note any specific stories, data points, or frameworks mentioned

### Step 2: Select Voice + Pillar
Choose the content architecture:
- **Trinity voices:** Pick 1-2 (Rebel, Creator, Sage)
- **Pillar:** Pick 1 (Foundational Mastery, Debunking BS, Recovery Bridge)
- **Voice ratios:** Assign approximate weight (e.g., 60% Rebel / 40% Sage)

If the user provided overrides, use those. Otherwise, select based on:
- Teaching a system or framework? Creator-heavy.
- Calling out an industry lie? Rebel-heavy.
- Sharing a personal lesson from failure? Sage-heavy.
- Need maximum scroll-stop? Lead with Rebel, land with Sage.

### Step 3: Identify the Enemy
Every piece of content fights something. Name it:
- The Industrial Food Complex
- Hustle culture / "just work harder"
- Consultant industry (slide decks, no kitchen time)
- Monthly P&L thinking
- Software-as-savior myth
- "Fully booked = profitable" lie
- Motivation culture (inspiration without implementation)
- Guessing instead of measuring

### Step 4: Phase 1 — REBEL (Write the Hook)
Write the opening that earns attention:
- Pattern interrupt — say what nobody else will
- Call out the BS directly
- Create tension between what operators believe and what's actually true
- 1-3 sentences maximum
- Must pass the scroll-stop test: would a tired operator stop for this at 11pm?

### Step 5: Phase 2 — CREATOR (Write the Substance)
Write the body that delivers value:
- Systems, data, frameworks, specific operational detail
- Include dollar figures or measurable outcomes
- Reference specific experience (countries, kitchens, situations)
- Teach the messy HOW, not the clean WHAT
- Format for scannability (short paragraphs, line breaks, fragments)

### Step 6: Phase 3 — SAGE (Write the Payoff)
Write the close that earns trust and drives action:
- Land the insight — the thing they'll remember tomorrow
- Connect to personal experience (the $370K collapse, recovery, rebuild)
- Use recovery language naturally ("behavior leads belief", "pre-decide", "no exceptions")
- End with a clear, direct CTA — no gimmicks
- CTA examples: "Message me if you're done white-knuckling it." / "Run the calculator. See your real numbers. Link in comments." / "One system. This week. That's all I'm asking."

### Step 7: Generate 3 Variations

> **HUMAN CHECK:** Present 3 variations to the user before proceeding.

Produce 3 distinct takes on the same content:
- **Variation A:** Rebel-forward (aggressive hook, confrontational tone)
- **Variation B:** Creator-forward (teaching-heavy, system-focused)
- **Variation C:** Sage-forward (vulnerability-led, wisdom close)

For each variation, show:
- The full draft
- Trinity voice ratio (e.g., "60% Rebel / 40% Sage")
- Which pain point(s) it maps to
- Suggested CTA destination (calculator, assessment, newsletter, DM)

Wait for user selection or direction to combine elements.

### Step 8: Quality Gate

Run the selected draft through these checks:

**Voice Checks:**
- [ ] Would Chris say this after a solo walk in the Black Forest?
- [ ] Short sentences? Fragments? German-direct?
- [ ] Does it lead with failure/vulnerability, not credentials?
- [ ] Recovery language used naturally (not forced)?
- [ ] No consultant-speak? (leverage, synergy, optimize, cutting-edge)

**Content Checks:**
- [ ] At least one dollar figure or concrete ROI projection?
- [ ] Maps to at least one of the 8 pain points?
- [ ] Specific experience referenced (country, kitchen, situation)?
- [ ] CTA is clear and direct — no gimmicks?
- [ ] Passes the 60% capacity test — would an exhausted operator act on this?

**Brand Checks:**
- [ ] AI never mentioned as a selling point?
- [ ] Tools positioned as "built from 20 years of experience"?
- [ ] Content mix respected (50% value / 30% engagement / 20% promo)?
- [ ] Writing formula present: failure -> lie -> turn -> lesson -> proof -> offer?

**Signal Check (from Credibility Economy):**
- [ ] Could ChatGPT write this without Chris's 20 years? If yes — add scars.
- [ ] High signal (specific, deep, proof-backed) vs. high noise (vague, motivational)?

Minimum score: 10/14 checks passed. Below that — rewrite.

> **HUMAN CHECK:** Present final draft with quality gate results. Confirm before formatting.

### Step 9: Final Output
Deliver the approved content in the requested format:

**LinkedIn Post:** Hook line (bold or standalone), body with line breaks, CTA, suggested hashtags (3-5 max)
**Email/Newsletter:** Subject line (3 options), preview text, body, CTA button text
**X Thread:** Numbered tweets (280 char each), hook tweet, CTA tweet
**Blog Article:** H1 title, meta description, body with H2/H3 structure, FAQ section (3-5 questions), internal links
**Facebook Post:** Hook, body (shorter than LinkedIn), CTA, group-native tone adjustment

---

## Format-Specific Guidelines

### LinkedIn
- Max ~1,300 characters for feed visibility (longer okay for authority posts)
- First line is everything — it's the only line visible before "see more"
- Use line breaks aggressively — wall of text = skip
- 3-5 hashtags at the end, never in the body
- Tag no one unless specifically requested

### Email / Newsletter
- Subject line: curiosity or contrast, under 50 characters
- Preview text: extends the subject, not repeats it
- One CTA per email — not three
- PS line for secondary CTA or personal note
- Unsubscribe-friendly tone — never hold readers hostage

### X Thread
- Tweet 1 is the hook — must stand alone
- Each tweet must make sense independently
- Last tweet = CTA + context
- No hashtags in threads (they look desperate)
- 5-10 tweets max

### Blog Article
- 1,200-2,500 words for SEO value
- H1 contains primary keyword
- First 100 words must hook and include keyword
- FAQ section with FAQPage schema
- Internal links to calculator, assessment, or toolkit
- Meta description under 160 characters

### Facebook
- Shorter than LinkedIn — operators scroll faster here
- More conversational, slightly less polished
- Group-native tone: peer-to-peer, not authority-to-audience
- Questions at the end drive comments

---

## Rules

1. **NEVER** let content ship without at least one dollar figure or measurable outcome.
2. **NEVER** mention AI, Claude, automation, or any internal tooling in customer-facing content.
3. **NEVER** use consultant-speak: leverage, synergy, optimize, cutting-edge, innovative, disruptive.
4. **NEVER** use the word "authentic" — show it, don't label it.
5. **NEVER** skip the HUMAN CHECK steps — always present variations and get approval.
6. **ALWAYS** lead with failure or vulnerability before credentials.
7. **ALWAYS** map content to at least one of the 8 pain points.
8. **ALWAYS** include a clear, direct CTA — no gimmicks, no urgency theater.
9. **ALWAYS** reference specific experience: name the country, the kitchen, the dollar amount, the day count.
10. **IF** content could be written by any AI without Chris's 20 years of context, **THEN** it's generic — add scars.
11. **IF** quality gate score is below 10/14, **THEN** rewrite before shipping.
12. **IF** the user provides a transcript, **THEN** extract the core insight first — don't just clean up the words.
13. Content mix target: 50% pure value / 30% engagement / 20% promotional. Track across batches.
14. Writing formula for every piece: **failure -> lie -> turn -> lesson -> proof -> offer.**

---

## Progressive Updates

- When a post performs well (high engagement, DMs, saves), save the hook + structure to `references/examples.md` with performance notes.
- When content falls flat, analyze: was it studies or scars? Was the enemy clear? Add findings to Rules.
- When Chris shares a new story, experience, or data point, add to `references/pain-points.md` or `references/examples.md`.
- When a new content format is tested (carousel, video script, poll), add format-specific guidelines above.
- When platform algorithm changes affect reach, update Format-Specific Guidelines with new constraints.
- Track which pain points get the most engagement — adjust content mix accordingly.
- Track which Trinity voice ratio performs best per platform — refine Step 2 defaults.
