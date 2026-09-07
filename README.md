# petri

A library of frontend experiments — components, interactions, layouts — each
rendered as a live preview alongside its source code, Storybook-style.

## Adding an experiment

Create a new folder under `src/experiments/components/<slug>/` (a standalone
component) or `src/experiments/layouts/<slug>/` (a layout / navigation flow) with:

- `Component.tsx` — default-exports the component to preview
- `meta.ts` — default-exports `{ title, description?, tags?, complexity?, promoted? }`
- `README.md` — a sentence or two of intent

Copy `src/experiments/_template/` as a starter. It's picked up automatically at
`#<slug>`; no registration needed. Follow `docs/DESIGN.md`.

## Development

```
npm install
npm run dev
npm run build
```

## Skills

Repo-specific workflows, run as slash commands (see `.claude/skills/`):

- **new-experiment** — branches `exp/<slug>`, scaffolds from `_template`, asks about live
  controls, builds against `docs/DESIGN.md`.
- **promote** — moves an approved experiment's piece to `src/dev-ready/` on a `promote/<slug>`
  branch.
- **accessibility-review** — checks an experiment's semantic HTML and WCAG A/AA against
  `docs/DESIGN.md`, reports findings only.
- **commit** — writes Conventional Commit messages and shows them for approval before committing.
