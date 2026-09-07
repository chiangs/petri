---
name: promote
description: Use whenever the designer says "I want to promote <experiment>". Reads the whole experiment, asks how much to promote before moving anything, then relocates the piece to src/dev-ready/ on its own promote/<slug> branch.
---

# Promote

## When to use

The designer says "I want to promote `<experiment>`" (or equivalent).

## Steps

1. **Read the whole experiment first** — `Component.tsx`, `meta.ts`, every sub-component,
   `controls/`, and `README.md`. Know the piece, its current props, and every tunable
   value (live controls or otherwise: durations, sizes, counts, colors, easings,
   toggles…) before proposing anything.

2. **Ask the designer how much to promote, before moving anything:**
   - **Props-driven** — every tunable value becomes a component prop, with the
     approved value as its default. (The `controls/` UI still stays behind — the prop
     surface is what replaces it.)
   - **As-is** — the approved values are baked in as constants; the promoted component
     takes only the genuinely dynamic inputs (data arrays, `children`, event handlers).
   - Also confirm: leave a thin demo experiment behind (imports the promoted component
     so the gallery still shows it — set `promoted: true` in its `meta.ts` so the
     gallery card marks it as promoted), or delete the experiment folder entirely?

3. **Branch:** `git checkout -b promote/<slug>` off current `main` — **not** the
   `exp/<slug>` branch, which is usually already merged.

4. **Move the piece:** relocate it plus any co-located sub-components / `.ts` helpers
   to `src/dev-ready/components/` or `src/dev-ready/layouts/`. Drop mock data,
   `meta.ts`, the `controls/` folder, and any showcase-only backdrop — only the
   piece itself is promoted.

5. **Apply the chosen promotion level** (props-driven vs. as-is) from step 2.

6. **Carry forward any Browser note / Accessibility note / Best-practice note** headings
   from the experiment's `README.md` (see `docs/DESIGN.md`) as a short comment on the
   affected code in the promoted file(s). The README itself is left behind with the rest
   of the scaffolding — but a documented gap or deviation is still true in production and
   must not silently disappear with it.

7. **Check the result against `docs/DESIGN.md`** (states, contrast, tokens, semantic
   HTML/accessibility, declarative JSX, one-component-per-file, `copy` object, naming) —
   run the `accessibility-review` skill for the accessibility pass — promoted code is
   what a developer re-implements in production.

8. **Keep `main` runnable at all times** — if the demo experiment is being deleted,
   make sure nothing else still imports it; if it's kept as a thin demo, confirm it
   only imports the now-promoted component and still renders.

9. **Commit** using the `commit` skill's conventions — `promote(<slug>): <what changed>`.
