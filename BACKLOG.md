# Backlog

Ideas not yet started. Build-ready items leave here and become a branch via the
`new-feature` skill (app) or `new-experiment` skill (experiments).

**Categories:** `App` — the sandbox shell (sidebar, viewer, theme, registry, tokens,
build, docs, skills). `Experiments` — pieces to prototype in `src/experiments/`.

**Complexity:** rough size, not priority. `S` — an afternoon, one or two files, no
open questions. `M` — a few files or one real design decision to make first. `L` —
cross-cutting, new dependency/pattern, or several unknowns to resolve.

Within each category, items are ordered `S` → `M` → `L`.

---

## App

- **`S` — Back-to-main-site button.** Petri deploys to a subdomain; a button (in the
  sidebar) takes the user back to the parent site. Target URL should be configurable
  (env var / constant), not hardcoded.

- **`M` — About / intro to Petri.** Explain what Petri is to a first-time reader.
  Open question: a default view shown when no experiment is selected, or a dismissable
  popup/modal? Decide before building.

- **`M` — Animate the light/dark theme toggle.** The theme switch is currently an
  instant swap. Transition the colour change (CSS transitions on the themed vars, or
  the View Transitions API). Watch for first-paint flash and transitions firing on
  page load.

## Experiments

_(none yet)_
