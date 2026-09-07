# src/dev-ready/components/

**Promoted, production-candidate shared components.** Starts empty.

When an experiment in `src/experiments/components/<slug>/` is approved for further development, its
reusable component moves here — made generic and props-driven, with no mock data or demo-only
scaffolding (`Component.tsx`, `meta.ts`, and `controls/` are left behind). This is the clean,
bounded starting point you hand to a developer.

Keep this separate from `src/experiments/**`, which is exploratory / throwaway work. See
`CLAUDE.md` → Promotion and the `promote` skill.
