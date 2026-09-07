# CLAUDE.md

Project memory for AI agents. Follow these conventions.

## Purpose

A **client-side-only** design prototyping sandbox. Designers clone it to rapidly prototype ideas
(simple components, complex components, full layouts / navigation flows) while directing you.

## Stack

Vite + React + TypeScript + Tailwind CSS **v4** (via `@tailwindcss/vite`). Routing is hash-based
(`#<slug>`) — no router library.

- Design tokens live in `src/index.css`: an `@theme inline` block maps token utilities
  (`bg-bg`, `text-ink`, `text-muted`, `border-border`, `bg-brand-500`, `rounded-card`) onto
  themeable CSS vars. There is **no** `tailwind.config.js` and there should not be one.
- Dark theme is the default; a persisted light/dark toggle lives in the sidebar footer.
- `@/` is an alias for `src/`.
- `cn()` in `src/lib/cn.ts` merges classes (clsx + tailwind-merge).

## Experiments

- **Before creating any files, branch first**: `git checkout -b exp/<slug>` off current `main`.
  Never create or commit a new experiment's files while sitting on `main` — see Branching below.
- Live in `src/experiments/components/<slug>/` or `src/experiments/layouts/<slug>/`.
- Each folder has a `Component.tsx` (default-exports the component), a `meta.ts` (default-exports
  an `ExperimentMeta`), and a short `README.md` describing intent.
- They are **auto-discovered** by `src/lib/registry.ts` via `import.meta.glob`.
  **Never hand-edit the registry** to add an experiment — just create the folder.
- `src/experiments/_template/` is the copy-me starter — it sits outside `components/` and
  `layouts/`, so the globs skip it. Do not register or route it.

### Live controls

- **Before building an experiment with tunable settings** (durations, sizes, blur radii, counts,
  colors, easings, toggles…), **ask the designer which to expose as on-screen controls** and their
  range / default / step. Controls let them iterate on the feel without re-prompting you. If the
  answer is "none", skip them.
- Control components live in a **`controls/` subfolder** inside the experiment
  (`<slug>/controls/GlassControls.tsx`, …). They are scaffolding, **not** part of the piece — keeping
  them separate keeps promotion a clean folder move.
- `Component.tsx` owns the control state (`useState`) and passes values down to both the piece and
  the controls; the controls stay presentational (value + `onChange` props).

## Design rules

**ALWAYS follow `docs/DESIGN.md`** when generating or editing experiments: 4px spacing scale,
required hover + `focus-visible` states, non-interactive disabled states, WCAG AA contrast,
token-first styling, cross-browser rendering (current Chrome / Firefox / Safari — flag anything
uncertain for further research), simple readable code a developer can re-implement in production (no
needless abstraction, indirection, or dependencies), declarative JSX (compute all values **and conditional
renders** above the `return` — no `&&` or ternary branches in the JSX tree), one component per file
(sub-components get their own file), `variant` / `size` / `state` prop naming, and reaching for
`useReducer` once a component needs 4+ `useState` hooks (`controls/` state counts).

## Styling

Prefer token utilities (`bg-brand-500`, `text-ink`, `rounded-card`, `border-border`) over hardcoded
hex/rem. Use `cn()` for conditional classes.

## Promotion

Pieces approved for further development move to `src/dev-ready/components/` or
`src/dev-ready/layouts/`, made generic and props-driven (no mock data). Keep `main` runnable at all
times. Leave `Component.tsx`, `meta.ts`, `controls/`, and any showcase-only backdrop/mock behind —
only the piece itself is promoted.

The experiment's `README.md` itself is left behind with the rest of the scaffolding — but any
**Browser note**, **Accessibility note**, or **Best-practice note** headings in it (see
`docs/DESIGN.md`) document a real, still-relevant gap or deviation and must not be silently
dropped. Carry each one forward as a short comment on the affected code in the promoted file(s).

Promotion happens on its own branch `promote/<slug>` cut from current `main` (not the `exp/<slug>`
branch, which is usually already merged); commits use `promote(<slug>): <what changed>`.

### When a designer says "I want to promote `<experiment>`"

1. **Read the whole experiment first** — `Component.tsx`, `meta.ts`, every sub-component,
   `controls/`, and `README.md` — so you know the piece, its current props, and which values are tunable (live
   controls or otherwise: durations, sizes, counts, colors, easings, toggles…).
2. **Ask the designer how much to promote** before moving anything:
   - **Props-driven** — every tunable value becomes a component prop, with the approved value as its
     default. The `controls/` UI still stays behind; the prop surface is what replaces it.
   - **As-is** — the approved values are baked in as constants; the promoted component takes only the
     genuinely dynamic inputs (data arrays, `children`, event handlers).
   - Also confirm: leave a thin demo experiment behind (imports the promoted component so the gallery
     still shows it — set `promoted: true` in its `meta.ts` so the gallery card marks it as
     promoted), or delete the experiment folder?
3. Then do the move on `promote/<slug>`: relocate the piece (plus co-located sub-components / `.ts`
   helpers) to `src/dev-ready/components/` or `.../layouts/`, drop mock data / `meta.ts` / `controls/` /
   showcase backdrop, check the result against `docs/DESIGN.md`, keep `main` runnable.
4. Carry forward any Browser note / Accessibility note / Best-practice note from the experiment's
   `README.md` as a short comment on the affected code — the README itself doesn't move, but a
   documented gap or deviation shouldn't disappear with it.

## Skills

Repo-specific workflows live as slash-command skills in `.claude/skills/` (`commit`,
`new-experiment`, `promote`, `accessibility-review`, …) — each folder's `SKILL.md` documents when
it triggers. **Whenever a new skill folder is added, also add a one-line summary of it to
`README.md`'s skills section** so designers can see what's available without opening
`.claude/skills/`.

## Constraints

- Do **not** add servers, backends, databases, API routes, or heavy dependencies. Keep it minimal.
- Everything runs in the browser.

## Branching

- `main` is always known-good.
- One short-lived branch per exploration: `exp/<slug>`, created off `main`. **Create and switch to
  this branch before writing any files for a new experiment** — check `git branch --show-current`
  first if unsure; never leave new experiment files sitting uncommitted on `main`.
- Commit convention: `exp(<slug>): <what changed>`.
- Promoting an experiment to `src/dev-ready/` gets its own branch `promote/<slug>` off `main`,
  commits `promote(<slug>): <what changed>`.
- No `develop` / `release` / `hotfix` branches.
