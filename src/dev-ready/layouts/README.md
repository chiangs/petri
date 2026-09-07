# src/dev-ready/layouts/

**Promoted, production-candidate layout shells.** Starts empty.

When a layout experiment in `src/experiments/layouts/<slug>/` is approved for further development,
its reusable shell moves here — made generic and props/children-driven, with no demo-only
scaffolding (`Component.tsx`, `meta.ts`, and `controls/` are left behind).

Keep this separate from `src/experiments/**`, which is exploratory / throwaway work. See
`CLAUDE.md` → Promotion and the `promote` skill.
