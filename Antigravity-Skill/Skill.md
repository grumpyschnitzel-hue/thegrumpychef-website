---
name: skill-engineering
description: "Builds advanced AI agent skills using the Skill Engineering framework. Triggers when the user says 'build a skill', 'create a skill', 'new skill for', 'skill for [task]', 'automate this process', 'make this repeatable', or wants to turn any manual workflow into a reusable agent capability. Outputs a complete skill folder with SKILL.md, reference files, and self-improvement logic."
---

# Skill Engineering — Building Advanced AI Agent Skills

> Skills are not prompts. They are modular folders of instructions, scripts, and resources that allow agents to execute complex, non-deterministic workflows. Treat skill engineering like software engineering for AI agents.

---

## When to Use This Skill

- "Build me a skill for [task]"
- "Create a skill that [does X]"
- "Make this process repeatable"
- "Automate this workflow"
- "Turn this into a skill"
- Any time a manual process has been done 3+ times and should be codified

---

## Phase 1: Strategy (Before Building)

Most people skip this. It makes the biggest difference.

### 1.1 Define the Ideal Process

Before writing anything, map the exact step-by-step process to achieve a high-quality result.

**Ask the user:**
- [ ] What is the specific task this skill should perform?
- [ ] What does a "perfect" output look like? (Get an example if possible)
- [ ] What are the inputs? (minimum viable input vs. full input)
- [ ] What tools/APIs/MCPs does this need to access?
- [ ] Where does human judgment need to intervene?

### 1.2 Gather Knowledge Sources

- [ ] Style guides, brand voice docs, ICP descriptions
- [ ] Business context files (who is this for, what constraints exist)
- [ ] Reference examples of "good" output (this impacts performance the most)
- [ ] Any existing SOPs, checklists, or templates

### 1.3 Define the Failure Modes

Apply inversion: How could this skill produce bad output?

- [ ] What mistakes would a junior person make on this task?
- [ ] What are the edge cases?
- [ ] What does "bad" output look like specifically?

---

## Phase 2: Build the Skill

### 2.1 Folder Structure

Every skill follows this hierarchy:

```
<skill-name>/
  SKILL.md              # Required: Core SOP (the process)
  references/           # Optional: Context files loaded on demand
    style-guide.md
    icp.md
    examples.md
  scripts/              # Optional: Code for API calls, automations
  resources/            # Optional: Templates, assets, images
```

### 2.2 SKILL.md Structure

The core file. Keep it focused on PROCESS ONLY — move all data to reference files.

```markdown
---
name: [gerund-form-name]        # e.g., "writing-cold-outreach"
description: "[3rd person, max 1024 chars. Include trigger phrases.]"
triggers: ["phrase 1", "phrase 2", "phrase 3"]
version: 1.0
---

# [Skill Title]

## Objective
[One sentence: what this skill produces and why it matters.]

## When to Use
- [Trigger condition 1]
- [Trigger condition 2]

## Required Inputs
- [Input 1] (required/optional)
- [Input 2] (required/optional)
- Minimum viable input: [what's the least the user can provide?]

## Reference Files
[List files the agent should load and WHEN to load them]
| File | Load When | Purpose |
|------|-----------|---------|
| `references/style-guide.md` | Always | Voice and tone rules |
| `references/examples.md` | Step 4 (writing) | Quality calibration |
| `references/icp.md` | Step 1 (parsing) | Audience context |

## Workflow

### Step 1: [Parse / Understand]
- [What to do]
- [What to check]

> HUMAN CHECK: [Present summary for approval before proceeding]

### Step 2: [Research / Prepare]
- [What to do]
- [Reference files to load]

### Step 3: [Execute / Build]
- [Core production logic]
- [Templates or patterns to follow]

> HUMAN CHECK: [Present 3-5 variations for selection]

### Step 4: [Quality Gate]
- [ ] [Check 1]
- [ ] [Check 2]
- [ ] [Check 3]

### Step 5: [Output / Deliver]
- [Final format]
- [Where to save or publish]

## Rules
[Predict errors. Write them as explicit rules. Update this section continuously.]
- NEVER [specific thing to avoid]
- ALWAYS [specific thing to ensure]
- IF [edge case], THEN [how to handle it]

## Progressive Updates
[Self-improvement instructions — the skill evolves with use.]
- When the user approves a final output, save it to `references/examples.md`
- When the user flags an error, add a new rule to the Rules section
- When the user corrects voice/tone, update `references/style-guide.md`
- When a tool/MCP fails, create an MCP reference doc in `references/`
```

### 2.3 YAML Frontmatter Rules

- **name**: Gerund form, lowercase, hyphens only. Max 64 chars. No "claude" or "anthropic."
- **description**: Third person. Include trigger keywords. Max 1024 chars.
- **triggers**: Array of phrases that activate this skill.
- **version**: Increment on significant updates.

---

## Phase 3: Write It Right

### Writing Principles

- **Concise**: The agent is smart. Don't explain basics. Focus on unique logic.
- **Progressive Disclosure**: SKILL.md stays under 500 lines. Detailed data goes in reference files.
- **Forward slashes**: Always `/` for paths, never `\`.
- **Degrees of Freedom**:
  - Bullet points → high freedom (heuristics, judgment calls)
  - Code blocks → medium freedom (templates, patterns)
  - Specific commands → low freedom (fragile operations that must be exact)

### Human-in-the-Loop Design

Treat the skill's interaction like UX design:

- **Checkpoints**: Insert `> HUMAN CHECK:` at decision points where judgment matters
- **Multiple options**: Ask the agent to present 3-5 variations instead of one
- **Feedback fields**: Use checklists the user can mark up
- **Never auto-ship**: Final output always requires user approval before publishing

### Context Management (Progressive Disclosure)

Three levels — only load what's needed:

| Level | What's Stored | When It Loads |
|-------|--------------|---------------|
| **Metadata** | Name + description only | Always in agent memory |
| **SOP** | SKILL.md process steps | When the skill is triggered |
| **References** | Style guides, examples, ICP docs | When a specific step calls for them |

This allows one agent to manage hundreds of skills without context overload.

---

## Phase 4: Make It Self-Improving

A skill is never finished. Best skills require 4-5 iterations of real use.

### 4.1 Progressive Updates

Include this section in every SKILL.md:

```markdown
## Progressive Updates
- When I approve a final output → save to `references/examples.md` as new gold standard
- When I flag an error → add a permanent rule to the Rules section
- When I correct voice/tone → update `references/style-guide.md`
- When a tool/MCP fails → create `references/[tool]-guide.md` after manual walkthrough
```

### 4.2 Failure Diagnosis

When output is wrong, diagnose and fix at the right level:

| Problem | Fix |
|---------|-----|
| Wrong steps / missed a stage | Update SKILL.md workflow |
| Low quality output / wrong tone | Update or create a reference file |
| Recurring specific error | Add a rule to the Rules section |
| Tool/API struggles | Guide manually once, then create MCP reference doc |
| Skill doesn't trigger | Update triggers array and description keywords |

### 4.3 Example Library Growth

The approved examples library is the most powerful self-improvement mechanism:

1. Agent produces output
2. User reviews and approves (or corrects)
3. Approved output is saved to `references/examples.md`
4. Next run, agent calibrates against growing library of "good"
5. Quality compounds over time

---

## Phase 5: Quality Checklist

Before delivering any new skill, verify:

### Structure
- [ ] SKILL.md has valid YAML frontmatter (name, description, triggers, version)
- [ ] SKILL.md is under 500 lines (detailed data in reference files)
- [ ] Folder structure follows the standard hierarchy
- [ ] All paths use forward slashes

### Process
- [ ] Clear objective (one sentence)
- [ ] Defined minimum viable input
- [ ] Step-by-step workflow with numbered steps
- [ ] At least one HUMAN CHECK checkpoint
- [ ] Quality gate with specific checklist items
- [ ] Expected output format defined

### Self-Improvement
- [ ] Progressive Updates section included
- [ ] Rules section exists (even if starting empty)
- [ ] Reference files linked with load-timing specified
- [ ] At least one example of "good" output included

### Edge Cases
- [ ] Error handling for missing inputs
- [ ] Fallback behavior defined
- [ ] Rules predict at least 3 common failure modes

---

## Skills vs Systems vs Plugins

### Skills vs Systems

| | Skills | Systems |
|---|--------|---------|
| **Human involvement** | Human-in-the-loop. User triggers and approves. | Fully autonomous. Runs without intervention. |
| **Frequency** | On-demand, "as and when needed" | Same task, every day, on schedule |
| **Evolution** | Improves over time (progressive updates, new rules) | Fixed process, rarely changes |
| **Best for** | Creative work, judgment calls, evolving processes | Data scraping, backups, monitoring, notifications |
| **Examples** | Content production, skill engineering, credibility filter | Morning news digest, knowledge base refresh, daily analytics |

**Rule:** If the process requires judgment or might change → build a Skill. If it does the exact same thing every day with no variation → build a System.

### Skills vs Plugins

| Feature | Skills | Plugins |
|---------|--------|---------|
| Unit | Single process/task | Bundle of skills + tools |
| Components | SKILL.md + reference files | Skills, commands, agent teams, connectors |
| Complexity | Focused and specific | Multi-step workflow orchestration |
| Best for | Individual tasks, personal productivity | Team distribution, department toolkits |
| Distribution | Single folder, zip, or GitHub | Versionable packages across accounts |

Build skills first. Bundle into plugins when you have 3+ related skills that work together.

---

## Skill Difficulty Levels

| Level | Type | What It Does | Example |
|:-----:|------|-------------|---------|
| **1** | Basic Task Automation | Single script, one input → one output | URL shortener, file renamer, format converter |
| **2** | Branded Document Generation | Uses brand assets + templates, deterministic output | PDF invoices, branded reports, HTML pages |
| **3** | Research & Digest Systems | Multi-source scraping, signal vs noise filtering | Morning briefing, competitor monitoring, trend detection |
| **4** | Content Repurposing + Voice Matching | Multi-format output from single input, calibrated to creator voice | Transcript → LinkedIn + email + carousel + video script |

**Where Chris's system currently sits:** Levels 1-3 fully built. Level 4 partially built (content batch skill exists, voice calibration via gold standard examples). Next evolution: vector database for voice matching at scale.

---

## Quick Start

When the user says "build me a skill for [X]":

1. Run Phase 1 questions (strategy)
2. Define the folder structure
3. Write SKILL.md following the template
4. Create initial reference files
5. Run the Quality Checklist
6. Present the complete skill for review
7. Iterate based on feedback (expect 4-5 rounds)

---

## The Codify-After-Success Rule

**NEVER build a skill from theory. Build it from a task you've already done successfully.**

The correct workflow:
1. Do the task manually (or with AI assistance) — spar back and forth until the output is right
2. Once the result is approved, THEN codify into a skill using this framework
3. The skill captures what WORKED, not what might work

Skills built from theory require 4-5 iterations to become useful. Skills built from a successful task are useful on run #1.

---

## Creating MCP Reference Documents

When an agent struggles with a tool/API:

1. Guide the agent manually through the correct steps
2. Once successful, ask: "Create an MCP reference document for how to perform [task] in [tool]"
3. Save as `references/[tool]-guide.md` in the skill folder
4. The skill now knows how to use that tool autonomously

---

## Voice Calibration Architecture

### Current: Gold Standard Examples (Level 3)
- 8 approved posts with performance data in `gold-standard-examples.md`
- Content skills calibrate voice against these examples
- Strength: includes WHAT WORKS (performance data), not just what sounds right
- Limitation: small sample size, manual selection

### Future: Vector Database Voice Matching (Level 4)
- Load ALL approved posts into a Pinecone (or similar) vector database
- Content skills query the database for tone/style matching
- The AI references historical content to match exact voice patterns
- Enables: "write this in the style of my top-performing posts" with mathematical precision
- Trigger to build: when Chris has 20-30 approved posts with performance data

### Why Both Matter
- Vector DB matches VOICE (how Chris sounds)
- Gold standard examples match PERFORMANCE (what the audience responds to)
- The combination = content that sounds like Chris AND performs like his best posts
- 99% of creators use one or the other. Using both is the competitive edge.

---

## Skill Catalog Management

Every time a new skill is built and approved:

1. Update the CLAUDE.md file with the new skill entry (name, location, trigger, purpose)
2. Update the relevant agent routing (if the skill belongs to a specific agent domain)
3. Verify the skill doesn't duplicate an existing capability — merge if overlap exists

The CLAUDE.md file is the "rolodex" — it ensures every future session knows what skills exist and when to use them. A skill that isn't cataloged is a skill that won't get triggered.

---

## Rules

- NEVER create a skill without running Phase 1 strategy questions first
- NEVER put detailed data (examples, style guides, ICP context) directly in SKILL.md — use reference files
- NEVER build a skill from theory — codify after a successful manual execution
- ALWAYS include at least one HUMAN CHECK in the workflow
- ALWAYS include a Progressive Updates section
- ALWAYS include a Rules section (even if initially empty)
- ALWAYS present multiple output options at decision points
- ALWAYS update CLAUDE.md catalog after building a new skill
- IF the user provides an example of "good" output, save it immediately to references/examples.md
- IF the user corrects output, update the relevant reference file AND add a rule
- IF a skill exceeds 500 lines, split into SKILL.md + ADVANCED.md (one level deep only)
- IF a task runs the same way every day with no variation, build it as a System, not a Skill
- IF a skill has 20+ approved examples, consider upgrading to vector database voice matching
