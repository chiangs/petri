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

- **`L` — Rework the code preview to show real implementation code.** The viewer only shows `Component.tsx`, so experiments split into many sub-component files (per `docs/DESIGN.md`) preview as just the top-level composition — not the code a developer needs to re-implement the piece. Surface the actual implementation instead: flatten/inline the sub-components, show every file in the experiment folder, or similar. Approach undecided — "show all files" would be `M`, an import-inlining transform `L`; touches `src/lib/registry.ts` (globs only `Component.tsx` for source today) and the viewer (`ExperimentViewer.tsx` / `CodeBlock.tsx`).

## Experiments

_(none yet)_
