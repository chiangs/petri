---
name: backlog
description: Use whenever the designer shares an idea for later rather than to build now — "add X to the backlog", "note this idea", "/backlog", or describes a feature/experiment idea and says to park it. Appends it to BACKLOG.md under the right category with a complexity estimate, keeping the file sorted. Does not branch or build.
---

# Backlog

## When to use

The designer has an idea they want recorded, not built right now — "add a ... to the
backlog", "park this", "note it for later", `/backlog <idea>`, or they describe an
idea and make clear it's not for this session.

If they want it built now, use `new-feature` (app) or `new-experiment` (experiment)
instead — don't just add to the backlog and stop.

## Steps

1. **Categorise** the idea:
   - **App** — the sandbox shell: sidebar, experiment viewer, theme toggle, registry /
     auto-discovery, design tokens, build config, `docs/`, `.claude/skills/`. Anything
     outside `src/experiments/` and `src/dev-ready/`.
   - **Experiments** — a component, interaction, or layout to prototype in
     `src/experiments/`.

2. **Estimate complexity** — rough size, not priority:
   - **`S`** — an afternoon, one or two files, no open questions.
   - **`M`** — a few files, or one real design decision to settle first.
   - **`L`** — cross-cutting, a new dependency or pattern, or several unknowns.

   If the designer gave a hint about scope, use it. If genuinely unsure between two
   levels, pick the higher one and say so.

3. **Append to `BACKLOG.md`** under that category's heading, in the file's item format:

   ```
   - **`<S|M|L>` — <Title>.** <One or two sentences of intent.> <Any open question or
     constraint the designer mentioned.>
   ```

   Keep each category ordered `S` → `M` → `L` (insert in the right spot; equal
   complexity goes to the end of its run). Remove the `_(none yet)_` placeholder if
   you're adding the first item to a category.

4. **Don't branch, don't scaffold, don't build.** This skill only edits `BACKLOG.md`.

5. **Commit** only if the designer asks — via the `commit` skill, `docs(backlog): ...`.

## Removing items

When a backlog item gets picked up (a `feat/` or `exp/` branch is cut for it), delete
its line from `BACKLOG.md` in that branch's first commit so the backlog reflects only
what's still untouched.
