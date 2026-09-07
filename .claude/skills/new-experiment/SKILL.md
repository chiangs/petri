---
name: new-experiment
description: Use whenever the user asks to start/create a new experiment (component or layout). Branches exp/<slug> off main first, scaffolds from _template, asks about live controls before building anything tunable, builds against docs/DESIGN.md, and writes the README.
---

# New experiment

## When to use

The user asks to build a new experiment idea — "let's create a new X component/layout",
"prototype an X", etc.

## Steps

1. **Branch first, before creating any files.** `git checkout -b exp/<slug>` off current
   `main` (check `git branch --show-current` if unsure). Never create or commit new
   experiment files while sitting on `main` — see `CLAUDE.md` → Branching.

2. **Scaffold from the template.** Copy `src/experiments/_template/` into
   `src/experiments/components/<slug>/` (a standalone component/piece) or
   `src/experiments/layouts/<slug>/` (a full layout or navigation flow) — kebab-case
   `<slug>` becomes the URL hash `#<slug>`. Update `meta.ts` (`title`,
   `description`, `complexity`, `tags`). **Never hand-edit `src/lib/registry.ts`**
   — the folder is auto-discovered via `import.meta.glob`.

3. **Ask about live controls before building anything tunable.** If the idea has
   settings worth adjusting live (durations, sizes, blur radii, counts, colors,
   easings, toggles…), ask the designer which of those should become on-screen
   controls, and each one's range / default / step. If the answer is "none", skip
   controls entirely. When there are controls:
   - Put them in a `controls/` subfolder (`<slug>/controls/...`) — scaffolding, not
     part of the piece, so promotion later is a clean folder move.
   - `Component.tsx` owns the `useState` for each value and passes `value` +
     `onChange` down to both the piece and the controls; controls stay presentational.

4. **Build against `docs/DESIGN.md`:** 4px spacing scale (no arbitrary pixel values),
   visible hover **and** `focus-visible` states on every interactive element,
   non-interactive disabled states, semantic HTML over div-soup (native `button`/`a`/
   headings/landmarks before ARIA) with WCAG Level A as a hard minimum and AA as the
   target, token-first styling (`bg-brand-500`, `text-ink`, `rounded-card`,
   `border-border`, via `cn()` — never hand-concatenated classes), cross-browser support
   for current Chrome/Firefox/Safari (flag anything uncertain rather than assume it
   works), declarative JSX (all computation, list-building, and conditional renders
   hoisted above `return` as named `const`s — no inline `.map()`, `&&`, or ternary
   branches in the tree), one component per file, a `copy` object for every user-facing
   string, and `variant`/`size`/`state` prop naming.

5. **Write the README.md:** one or two sentences of intent. Add a **Browser note**
   heading if anything cross-browser-risky was used or flagged in step 4. Add an
   **Accessibility note** heading if a Level AA gap ships anyway (see `docs/DESIGN.md` →
   Accessibility → Scope carve-outs) — e.g. a novel interaction with no accessible
   equivalent yet.

6. **Commit** using the `commit` skill's conventions — `exp(<slug>): <what changed>`.
