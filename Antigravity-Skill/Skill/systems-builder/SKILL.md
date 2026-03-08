---
name: systems-building
description: "Turns any manual process into a documented, repeatable system using an interview-driven approach. Works for life, business, or client projects. Two modes: Light (5 questions, 1-page SOP) and Full (15-20 questions, complete operations manual section with metrics, failure modes, and dependency mapping). Triggers when the user says 'build a system', 'systemize this', 'create an SOP', 'document this process', 'make this repeatable', 'operations manual', or 'how do I turn this into a system'. Built on the recovery principle: systems work when motivation fails."
triggers: ["build a system", "systemize this", "create an SOP", "document this process", "make this repeatable", "operations manual", "turn this into a system", "process map", "checklist for", "standard operating procedure"]
version: 1.0
---

# Systems Builder

## Objective
Turn any manual, messy, or inconsistent process into a documented, repeatable system that works even when the operator is tired, distracted, or running at 60% capacity. Interview first, build second. No assumptions.

## When to Use
- A process exists in someone's head but not on paper
- Something keeps breaking because "it depends on who does it"
- You want to delegate a task but can't explain it clearly
- A daily/weekly routine needs structure so it survives bad days
- Building client deliverables that need to be repeatable
- Any time the phrase "I just know how to do it" comes up

## Core Philosophy
1. **Systems work when motivation fails.** Recovery principle. You don't decide to stay sober every morning — the system decides for you. Same with business.
2. **Build for 60% capacity.** The tired, post-double-shift, "I just want to go home" version of you. If the system needs peak performance to work, it's broken.
3. **Pre-decide everything.** Every decision point in the system should be resolved in advance. Eliminate in-the-moment negotiation.
4. **Rigid rules survive chaos, flexible guidelines don't.** "Try to do X" fails. "Always do X, no exceptions" survives.
5. **Behavior leads belief.** Do the system first. Understanding and buy-in come after. Don't wait to feel ready.
6. **Interview before building.** Never assume you understand the process. Ask. Then ask again. The mess is in the details.

## Required Inputs
- Process name or description (required)
- Mode selection: Light or Full (required — ask if not specified)
- Context: life, business, or client project (optional — defaults to business)
- Minimum viable input: "I need a system for [X]"

## Reference Files
| File | Load When | Purpose |
|------|-----------|---------|
| `../../CLAUDE.md` | Always | Website project context, deployment rules |
| `../../../CLAUDE.md` | When building client systems | Brand voice, decision framework, content rules |
| `../../../OPERATIONS.md` | When indexing to operations manual | Current operations manual structure |
| `../../../BRAND.md` | When system is customer-facing | Voice and positioning constraints |

## Modes

### Light Mode (Quick — ~10 min)
**Best for:** Simple routines, daily habits, recurring tasks, single-person processes.

**Interview — 5 Questions:**
1. What is this process? Walk me through it step by step, like I've never done it.
2. How often do you do this, and what triggers it?
3. What goes wrong when you skip it or do it badly?
4. What tools/inputs do you need before starting?
5. How do you know it's done right?

**Output:** 1-page SOP with ordered steps, checklist format, single success metric.

---

### Full Mode (Deep — 30-60 min)
**Best for:** Complex business processes, client deliverables, multi-person workflows, anything with dependencies or handoffs.

**Interview — 15-20 Questions across 7 Dimensions:**

#### Dimension 1: Process Mapping
1. Walk me through this process from trigger to completion. Every step.
2. Which steps are always the same vs. which vary?
3. How long does each step take?
4. Where do you spend the most time? Where do you waste the most time?

#### Dimension 2: Decision Points
5. Where in this process do you have to make a judgment call?
6. What information do you need to make that call?
7. What's the "if this, then that" logic? Can we pre-decide it?

#### Dimension 3: Failure Modes
8. How does this process break? What goes wrong most often?
9. What's the worst thing that can happen if this is done wrong?
10. When was the last time this failed? What happened?

#### Dimension 4: Dependencies
11. What has to happen BEFORE this process starts?
12. What happens AFTER this process completes? What does it feed into?
13. Who else is involved or affected?

#### Dimension 5: Metrics
14. How do you know this process worked?
15. What does "good" look like vs. "good enough" vs. "failed"?

#### Dimension 6: Frequency & Triggers
16. How often does this run? Daily, weekly, event-triggered?
17. What exactly starts this process?
18. Is there a deadline or time constraint?

#### Dimension 7: Ownership & Delegation
19. Who does this today? Who should do this?
20. Could someone with less experience do this with the right documentation?

> Adapt questions based on answers. Skip what's already been covered. Dig deeper where the person hesitates or says "it depends."

**Output:** Complete operations manual section (see Output Format below).

---

## Workflow

### Step 1: Mode Selection
Ask the user: **Light or Full?**

If they're unsure, use this filter:
- Single person, under 10 steps, no handoffs -> **Light**
- Multiple people, dependencies, or "it's complicated" -> **Full**

### Step 2: Run the Interview
- Ask questions conversationally, not as a wall of text
- Group 3-5 questions at a time
- Listen for gaps, contradictions, and "it depends" answers — those are where the system matters most
- Take notes on implicit steps the person skips over ("oh, and before that I also...")

### Step 3: Confirm Understanding

> HUMAN CHECK: Present a summary of the process as you understand it. List every step, decision point, and dependency. Ask: "Did I miss anything? Is the order right?"

Do NOT proceed to building until the user confirms.

### Step 4: Build the System Document
- Light Mode: 1-page SOP (checklist format)
- Full Mode: Complete operations manual section (see Output Format)

### Step 5: Add Metrics & Failure Modes
For every system, define:
- What "done right" looks like (measurable)
- What breaks first when the system degrades
- Recovery action for each failure mode

### Step 6: Run the 60% Capacity Test
For every step, ask: "Can this be done when the operator is exhausted, distracted, or having a bad day?"

If no:
- Simplify the step
- Add a forcing function (alarm, checklist, physical trigger)
- Split into smaller sub-steps
- Automate or eliminate

### Step 7: Present Final System

> HUMAN CHECK: Present the complete system document. Ask: "Does this match how you want it to work? Anything to add, change, or cut?"

### Step 8: Index (Optional)
If an operations manual exists, add this system to the appropriate section. Update the table of contents.

---

## Output Format — Light Mode

```markdown
# [System Name]
**Owner:** [who]
**Frequency:** [when/how often]
**Trigger:** [what starts this]
**Time:** [how long it takes]

## Steps
1. [ ] [Specific action with details]
2. [ ] [Specific action with details]
3. [ ] [Specific action with details]
...

## Done Right Looks Like
- [Single measurable success criterion]

## If It Breaks
- [Most likely failure] -> [Recovery action]
```

## Output Format — Full Mode

```markdown
# [System Name]
## Purpose: [one sentence — why this system exists]
## Owner: [who runs this]
## Frequency: [when/how often]
## Trigger: [what starts this process]
## Time Estimate: [how long start to finish]

### Steps
1. [ ] Step with specific action and expected output
2. [ ] Step with specific action and expected output
3. [ ] Step with specific action and expected output
...

### Decision Points
- IF [condition] THEN [action]
- IF [condition] THEN [action]
- DEFAULT: [what to do when unsure]

### Metrics
- **Success** = [measurable outcome]
- **Warning** = [early indicator of problems]
- **Failed** = [when to stop and escalate]

### Dependencies
- **Requires:** [inputs, tools, people, prior processes]
- **Feeds Into:** [downstream processes, next steps]

### Dependency Map
[upstream process] -> **[THIS SYSTEM]** -> [downstream process]
                          |
                    [parallel dependency]

### Failure Modes
| What Can Go Wrong | Likelihood | Impact | Recovery Action |
|-------------------|-----------|--------|-----------------|
| [failure] | High/Med/Low | High/Med/Low | [specific fix] |
| [failure] | High/Med/Low | High/Med/Low | [specific fix] |

### 60% Capacity Test
- Can this be done when exhausted? [Yes/No]
- Adjustments for bad days: [what to simplify or skip]
- Non-negotiable steps (never skip these): [list]

### Notes
- [Context, history, lessons learned, edge cases]
```

---

## Dependency Mapping

For Full Mode systems, always map:

1. **Upstream dependencies** — what must complete before this system runs
2. **Downstream consumers** — what relies on this system's output
3. **Parallel dependencies** — what runs alongside and shares resources
4. **External dependencies** — tools, people, services outside your control

Present as a simple text diagram in the output. Flag any single points of failure.

---

## Quality Gate Checklist

Before delivering any system document, verify:

- [ ] Every step is a specific action (not "handle the thing" — what exactly?)
- [ ] Every step passes the 60% capacity test
- [ ] All decision points are pre-decided with IF/THEN logic
- [ ] At least one success metric is measurable (number, time, yes/no)
- [ ] Failure modes are listed with recovery actions
- [ ] Dependencies are mapped (what comes before, what comes after)
- [ ] Owner is identified for every step (if multi-person)
- [ ] A new person could follow this without verbal explanation
- [ ] No step requires "use your judgment" without criteria for that judgment
- [ ] The system has been confirmed by the user (HUMAN CHECK passed)

---

## Rules

1. **Never build without interviewing first.** No assumptions. No "I think I know what you mean." Ask.
2. **Every step must be a verb.** "Inventory" is not a step. "Count inventory in walk-in cooler" is.
3. **Pre-decide all judgment calls.** If a step says "decide whether to..." — add the criteria for that decision. Turn it into IF/THEN.
4. **60% capacity is the minimum bar.** If a step requires peak focus, creativity, or energy — flag it and simplify.
5. **One owner per step.** "The team handles it" means nobody handles it. Name the person.
6. **Metrics must be observable.** "Quality improved" is not a metric. "Plate returns dropped below 2% per service" is.
7. **Include the ugly parts.** The steps people skip, the workarounds, the "technically we should but..." — those go in the document. Systems fail at the parts people hide.
8. **Confirm before building.** Always hit the HUMAN CHECK before writing the final document. Rebuilding a wrong system wastes more time than pausing to confirm.

---

## Progressive Updates

As systems are used in the real world, update them:

| Trigger | Action |
|---------|--------|
| System fails or breaks | Add failure mode + recovery action to the document |
| New edge case discovered | Add to Decision Points or Notes |
| Step is consistently skipped | Evaluate: eliminate, simplify, or enforce |
| Owner changes | Update Owner field, review if delegation-ready |
| Process speeds up with practice | Update Time Estimate |
| Dependencies change | Update Dependency Map and flag downstream impacts |
| Quarterly review | Re-run 60% capacity test, prune dead steps, update metrics |

Keep a version number or "Last Updated" date at the top of every system document.

---

## Examples of Good vs. Bad System Steps

| Bad | Good |
|-----|------|
| "Check food cost" | "Pull yesterday's sales from POS. Divide total food purchases by total food revenue. Record percentage in weekly tracker." |
| "Prep for service" | "At 2:00 PM: check mise en place list on clipboard. Count each item. Prep anything below par level. Initial the list when done." |
| "Handle complaints" | "IF guest complaint about food quality THEN: apologize, remove item from bill, offer replacement, log in incident book with date and dish name." |
| "Do inventory" | "Every Sunday at 6 AM: count walk-in items using par sheet. Enter counts in spreadsheet column B. Flag anything below 50% par in red." |

---

## Integration with Other Skills

| Scenario | Skill to Combine With |
|----------|-----------------------|
| System includes customer-facing content | `credibility-economy` — run the credibility filter |
| System needs to be published/shared | `antigravity-claude-bridge` — plan then build |
| System involves a repeatable content workflow | `grumpy-content-engine` — align with content protocol |
| System feeds into a product or offer | Reference `OPERATIONS.md` product tiers |
