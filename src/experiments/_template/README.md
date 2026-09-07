# _template

The copy-me starter for a new experiment. Works for a component **or** a layout.

## Workflow

1. Decide: is your idea a **component** or a **layout**?
2. Copy this folder into `src/experiments/components/<slug>/` or
   `src/experiments/layouts/<slug>/` and rename it to your kebab-case slug.
3. Fill in `meta.ts`, then build your idea in `Component.tsx`. Follow `docs/DESIGN.md`.
4. Save and open the app — your experiment shows up in the sidebar under its category
   at `#<slug>`.

See the root `README.md` for the full picture, including the promotion workflow for
experiments that get approved for further development.

`_template/` is never registered or routed — it lives outside `components/` and `layouts/`,
so the auto-discovery globs in `src/lib/registry.ts` skip it. Leave it here.
