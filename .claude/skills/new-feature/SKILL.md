---
name: new-feature
description: Use whenever the user asks to add or change something in the sandbox app itself — the sidebar, experiment viewer, theme toggle, registry/discovery, design tokens, build config, docs, or skills — as opposed to building an experiment. Branches feat/<feature-name> off main first, then builds against docs/DESIGN.md and the existing app-shell conventions.
---

# New app feature

## When to use

The user wants to change the **sandbox app itself**, not build an experiment — e.g.
"add search to the sidebar", "show tags on the gallery cards", "add a keyboard shortcut
to switch experiments", "tweak the viewer layout", a new design token, a build-config
change, a docs update, or a new skill.

Anything *outside* `src/experiments/` and `src/dev-ready/` is app-feature work. If the
request is "build an X component/layout", use `new-experiment` instead.

## Steps

1. **Branch first, before creating any files.** `git checkout -b feat/<feature-name>` off
   current `main` (check `git branch --show-current` if unsure). Never build app changes
   directly on `main` — see `CLAUDE.md` → Branching.

2. **Build against `docs/DESIGN.md`** for any UI you add or touch: visible hover **and**
   `focus-visible` states on every interactive element, non-interactive disabled states,
   semantic HTML over div-soup, WCAG Level A as a hard minimum and AA as the target,
   declarative JSX (computation and conditional renders hoisted above `return`), one
   component per file, a `copy` object for user-facing strings, and `variant`/`size`/
   `state` prop naming.

3. **Match the existing app-shell conventions.** The shell in `src/App.tsx`,
   `src/app-components/`, and `src/App.css` predates the token utilities and uses plain
   `className` strings against `App.css` — follow that, don't introduce `bg-brand-500` /
   `cn()` styling into the shell. Design tokens themselves live in `src/index.css`.

4. **Keep the Constraints** (`CLAUDE.md` → Constraints): client-side only, no backend, no
   databases, no heavy dependencies. Never add a dependency for what a few lines of plain
   code would do.

5. **Keep `main` runnable.** Don't break experiment auto-discovery — `src/lib/registry.ts`
   discovers experiments via `import.meta.glob` and must never be hand-edited to list one.
   Run `npm run build` before committing.

6. **If you added a new skill folder**, add a one-line summary to `README.md`'s skills
   section (`CLAUDE.md` requires this).

7. **Commit** using the `commit` skill's conventions — the fitting Conventional Commits
   type per commit, scoped to the feature where it fits: `feat(<feature-name>): <what
   changed>`. A bug fix on the branch is still `fix(...)`.
