# floating-label-input

A single text input with a Material-style floating label: at rest the label sits inside the field
at full size; on focus (or once there's a value) it floats up, shrinks, and the field widens
slightly, with a snappy spring-like overshoot.

## Controls

- **Input type** — switch between `text`, `email`, and `password` to check the pattern holds up
  across native input affordances.
- **Border radius** — 0–56px, so the field can go from square corners to fully pill-shaped at its
  56px height.

## Notes

- The spring feel is a hand-rolled `cubic-bezier` overshoot (no animation library, per CLAUDE.md's
  minimal-dependency rule) and respects `prefers-reduced-motion`.
- The label doubles as the input's accessible name (`htmlFor`/`id`), so there's no placeholder.
- Styling is token-only (`border-border`, `text-ink`, `text-muted`, `bg-surface`), so the input
  follows petri's light/dark theme with no per-component branching. The upstream version threaded
  an `isDark` boolean through every component and shipped its own local theme toggle — a shortcut
  from before petri had a real theme system; dropped on the way in.
