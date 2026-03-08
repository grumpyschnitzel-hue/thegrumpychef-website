---
name: antigravity-claude-bridge
description: "Coordinates Antigravity (planner/designer) and Claude Code (executor/builder) into a unified workflow. Triggers when the user says 'plan and build', 'Antigravity task', 'bridge workflow', 'plan in Antigravity build in Claude', 'sync tools', or wants to run the full plan-to-ship loop across both tools."
triggers: ["plan and build", "Antigravity task", "bridge workflow", "sync tools", "plan then execute", "coordinate tools"]
version: 1.0
---

# Antigravity + Claude Code Bridge

## Objective
Turn Antigravity planning output into Claude Code execution — one seamless loop from idea to shipped code, with clear handoff protocol between tools.

## When to Use
- Starting a new feature or task that benefits from planning first
- Moving an Antigravity plan/roadmap into implementation
- Any time you want structured plan -> execute -> verify -> sync workflow
- When you need Antigravity's Gemini research + Claude Code's file editing power

## Tool Roles

| Tool | Strengths | Use For |
|------|-----------|---------|
| **Antigravity** | Multi-model access (Gemini + Claude), browser preview, visual design, research, planning | Planning, research, design review, roadmap management, task tracking |
| **Claude Code** | Deep file editing, git workflow, CLI execution, multi-file refactors, testing | Implementation, code changes, running tests, git commits, deployments |

## Required Inputs
- Task description or Antigravity plan output (required)
- Acceptance criteria (required — even if rough)
- Target files/area of codebase (optional — Claude Code can discover)
- Minimum viable input: a single task sentence

## Workflow

### Phase 1: Plan in Antigravity

Open the repo in Antigravity. Use this prompt template:

```
Plan the implementation of: [FEATURE/TASK]

For this codebase (static HTML site, no build step, vanilla JS).

Give me:
1. Task breakdown with acceptance criteria per task
2. Files that need to change (and why)
3. Risk assessment — what could break?
4. Suggested order of implementation

Save as a numbered task list I can hand to my execution agent.
```

Copy the output. Save to `docs/plans/[feature-name].md` if you want a record.

### Phase 2: Hand Off to Claude Code

Open terminal in the same repo. Launch Claude Code. Paste this template:

```
You are my implementation agent.

TASK FROM PLANNING AGENT:
---
[PASTE ANTIGRAVITY PLAN HERE]
---

RULES:
- Propose your implementation plan FIRST. List files you will touch and why.
- Wait for my approval before editing any files.
- Work through tasks ONE AT A TIME in the order given.
- After each task: show the diff, confirm it works, then move to next.
- Run any relevant tests after each change.
- Flag if the plan seems wrong or incomplete — you can push back.

Start with Task 1.
```

> HUMAN CHECK: Review Claude Code's proposed plan. Adjust before approving execution.

### Phase 3: Execute in Claude Code

Once approved, Claude Code implements task by task:
- Edits files (using Edit tool, not sed)
- Runs tests/linters via Bash
- Shows diffs at each step
- Pauses for confirmation on risky changes (new files, deletions, config changes)

After all tasks complete:
- Review final git diff
- Commit with descriptive message
- Push if ready

### Phase 4: Sync Back to Antigravity

Return to Antigravity and:
- Mark completed tasks done
- Ask: "Review the changes in this repo since last commit. Update the roadmap to reflect current state."
- If new tasks emerged during implementation, capture them in the plan

### Phase 5: Verify (Either Tool)

- Antigravity: browser preview, visual check, design review
- Claude Code: run test suite, lint, check links, validate HTML

> HUMAN CHECK: Final review before considering the feature shipped.

## Handoff File Protocol

For complex features, use a shared handoff file both tools can read:

```
docs/handoff/[feature-name].md
```

Format:
```markdown
# [Feature Name]
Status: planning | in-progress | review | done

## Plan (from Antigravity)
[Numbered task list with acceptance criteria]

## Implementation Notes (from Claude Code)
[Decisions made during implementation, deviations from plan]

## Open Questions
[Anything that needs human decision]
```

Both tools read this file at the start of their session for context.

## Quick Commands

### In Antigravity
- "Plan [feature] for my static site" -> generates task list
- "Review what changed since last sync" -> reads git log, updates roadmap
- "Research [topic] and draft a plan" -> Gemini-powered research + plan

### In Claude Code
- Paste the handoff template (Phase 2 above)
- "Continue from where we left off" -> reads handoff file
- "What's left on the plan?" -> reads handoff file, shows remaining tasks

## Rules

- NEVER let either tool auto-ship without human review
- ALWAYS plan before executing — even for "quick" changes (5 min planning saves 30 min rework)
- ALWAYS update the handoff file when switching between tools
- IF the plan changes during execution, update the handoff file before switching back to Antigravity
- IF Claude Code flags a problem with the plan, pause execution and resolve in Antigravity first
- IF a task is ambiguous, ask the human — don't guess across tool boundaries
- NEVER store API keys, tokens, or secrets in handoff files

## Anti-Patterns (What NOT to Do)

- Don't use Antigravity for multi-file code edits (Claude Code is faster and safer)
- Don't use Claude Code for visual design review (Antigravity has browser preview)
- Don't run both tools on the same file simultaneously (git conflicts)
- Don't skip the planning phase ("just build it" leads to rework)
- Don't context-switch between tools mid-task (finish the task, then switch)

## Progressive Updates
- When a workflow succeeds end-to-end, note what worked in `references/workflow-wins.md`
- When a handoff fails or causes confusion, add a rule above
- When new tool capabilities are discovered, update the Tool Roles table
