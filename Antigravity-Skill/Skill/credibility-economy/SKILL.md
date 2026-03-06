---
name: credibility-positioning
description: "Applies Credibility Economy principles to content, offers, and positioning. Triggers when the user says 'credibility check', 'scars vs studies', 'high signal', 'trust filter', 'is this credible', 'credibility audit', or wants to ensure any output leads with proof instead of promises. Filters content through the scars-over-studies lens and validates positioning against trust recession dynamics."
triggers: ["credibility check", "scars vs studies", "high signal", "trust filter", "credibility audit", "is this credible", "run the credibility lens"]
version: 1.0
---

# Credibility Economy Positioning

## Objective
Filter any content, offer, or positioning decision through the Credibility Economy lens — ensuring it leads with scars (lived proof), delivers high signal (precision over entertainment), and builds compounding trust instead of chasing attention.

## When to Use
- Before publishing any content (posts, emails, pages)
- When designing or refining an offer/product
- When evaluating positioning against competitors
- When content feels "off" but you can't pinpoint why
- As a final quality gate alongside the existing voice checks

## Required Inputs
- Content draft, offer concept, or positioning statement (required)
- Target audience context (optional — defaults to independent restaurant operators)
- Minimum viable input: a single paragraph or headline to evaluate

## Reference Files
| File | Load When | Purpose |
|------|-----------|---------|
| `references/frameworks.md` | Always | Core Credibility Economy frameworks |
| `references/chris-credibility-map.md` | Step 2 (mapping) | Chris's specific scars mapped to credibility assets |

## Workflow

### Step 1: Classify the Content
Read the draft/concept and classify it:

- **Studies content** = teaching the "what" (information anyone can Google or ask AI)
- **Scars content** = teaching the "how" from lived experience (earned insight)

Ask: "Could ChatGPT write this without Chris's 20 years?" If yes — it's studies. Rewrite.

### Step 2: Map to Chris's Scars
Load `references/chris-credibility-map.md`. Connect the content to specific proof points:

- Which specific scar does this draw from?
- What dollar figure or measurable outcome backs this up?
- What time trap does this help the reader skip?

If the content doesn't connect to at least one scar — it's generic. Fix it.

> HUMAN CHECK: Present the scar-to-content mapping. Confirm the right proof points are attached.

### Step 3: Signal Check
Evaluate the content on the High Signal / High Noise spectrum:

| Check | High Signal | High Noise |
|-------|------------|------------|
| Audience | Specific operators with specific problem | "Everyone in restaurants" |
| Depth | Teaches the messy HOW | Explains the clean WHAT |
| Proof | Dollar figures, specific outcomes, named experiences | Vague claims, motivation |
| Tone | Quiet confidence, restraint | Loud, hype, urgency theater |
| CTA | "Here's the system. Use it." | "ACT NOW! LIMITED TIME!" |

Score: count High Signal checks. Minimum 4/5 to proceed.

### Step 4: Trust Recession Filter
Run these checks against the content:

- [ ] Does it make promises without proof? (Cut or add proof)
- [ ] Does it use lifestyle signaling? (Cut entirely)
- [ ] Does it sound like it's trying to convince? (Rewrite with restraint)
- [ ] Would a skeptical operator trust this at 11pm after a double? (The 60% test)
- [ ] Does it feel like a consultant's pitch or an operator's advice? (Must be operator)

### Step 5: Credibility Compounding Check
Ask: does this piece BUILD on previous credibility or start from zero?

- References a specific system Chris has taught before? Good.
- Connects to a tool/framework the audience already knows? Good.
- Stands alone with no connection to the body of work? Weak — add a bridge.

> HUMAN CHECK: Present the filtered version with signal score and trust recession results.

### Step 6: Output
Deliver:
1. Original vs. filtered version (side by side if significant changes)
2. Signal score (X/5)
3. Trust recession flags (if any)
4. Specific scar(s) referenced
5. One sentence: why this builds credibility instead of just getting attention

## Rules
- NEVER let "studies" content ship without attaching it to a specific scar
- NEVER use hype language, urgency theater, or lifestyle signaling
- ALWAYS include at least one dollar figure or measurable outcome per piece
- ALWAYS connect content to a specific experience from Chris's 20 years
- IF content scores below 4/5 on signal check, THEN rewrite before shipping
- IF content could be written by AI without Chris's context, THEN it's not credible — add scars
- IF the content sounds like it's selling, THEN rewrite with restraint — credibility doesn't need to convince
- NEVER use the word "authentic" — show it, don't label it

## Progressive Updates
- When a piece of content performs well (high engagement from operators) — save to `references/high-signal-winners.md`
- When content gets ignored or feels flat — analyze whether it was studies vs scars, add finding to Rules
- When Chris shares a new scar/story — add to `references/chris-credibility-map.md`
- When a new competitor emerges using the old attention playbook — note in Rules as proof the framework works
