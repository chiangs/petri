# skeleton-loader

A lean loading-placeholder primitive. Two components — `Skeleton` (box / circle) and
`SkeletonText` (a stack of bars with a short last line) — share one CSS class whose
highlight band sweeps across on a `1.2s linear infinite` loop. `CardSkeleton` composes
them to trace `DemoCard`, and a toggle flips between the two.

## Controls

- **Border radius** — 0–16px, applied to the bars and blocks (not the circle avatar).

## Notes

### Best-practice note — single theme-agnostic gradient

The sweep is one `linear-gradient(90deg, transparent, rgba(140,140,140,.18),
transparent)` over a `var(--border)` fill. A mid-grey translucent band reads as a sheen
over both the dark and the light `--border` tone, so the same gradient works in both
themes with no per-theme vars and no `color-mix`. A production system would more likely
define `--skeleton-base` / `--skeleton-shine` tokens per theme for exact control of the
contrast — this prototype keeps it to a single rule instead.

### Accessibility

Individual bars are `aria-hidden` — the `CardSkeleton` wrapper carries
`role="status"` + `aria-label` so assistive tech hears "loading", not a run of empty
boxes. `prefers-reduced-motion` drops the sweep and pulses opacity instead (handled
purely in `styles.css`).

### Dynamic-skeleton directions not built

The brief explored making skeletons vary by component / content / page. This experiment
ships only the **composition** angle. Other approaches, for later:

- **Content-aware sizing** — size bars from the real strings (`width: ${text.length}ch`,
  line count from `charCount / charsPerLine`) when the data is present but something
  else is still loading.
- **Seeded per-item variation** — derive each list row's widths + stagger delay from a
  seed keyed to its id, so a feed looks organic but stays stable across re-renders.
- **Route / preset registry** — `SKELETON_PRESETS: Record<'article' | 'feed' |
  'profile', ReactNode>` chosen by the hash route.
- **CSS-only `.is-loading` class** — put one class on the real container and let scoped
  CSS turn rendered copy into bars; zero per-element markup, at the cost of fragility
  with nested markup.
