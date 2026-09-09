# Draggable dashboard

A data dashboard whose differentiator is layout freedom: every widget drags
freely anywhere on the canvas and can be resized from its bottom-right corner,
both **optionally** snapping to a grid (drag and drop, resize step). Built with
`@dnd-kit/core` (`useDraggable`) plus `@dnd-kit/modifiers` (`createSnapModifier`,
`restrictToParentElement`); resize is a plain pointer-capture handle
(`ResizeHandle`) driving the same `{x,y,w,h}` layout model.

**Steps 1–3 of a multi-step build.** So far: the enterprise-app shell (nav rail
with logo, top bar with user avatar) around the drag/snap canvas, plus
corner-resize. Widgets are being filled in one at a time — Widget A is the
one-big-metric tile (`MetricWidget`: an oversized mint→periwinkle gradient
number over a caption); Widget B is a decorative node constellation
(`NodeGraphWidget` / `GraphNode`: a static hand-placed SVG, no data behind it,
hidden from assistive tech); Widget C is a ranked horizontal-bar list
(`BarListWidget` / `BarListRow`: themeable track, off-token gradient fill, each
value also shown as text); D–E are still labelled placeholder cards.
`WidgetContent` maps a widget id to its body. Still to come: the remaining
widgets (table, activity feed, charts), overlap handling, and layout
persistence.

The shell (`DashboardShell`, `NavSidebar`, `TopBar`, …) is the piece; the nav
selection is visual only (highlight + top-bar title follow the click, the canvas
content is unchanged). The top-bar search (`TopBarSearch`) is likewise
non-functional — a pill field centered in the bar with a static "Search for..."
placeholder, always visible, that widens on focus and narrows on blur (spring
easing borrowed from the floating-label-input experiment). It filters nothing.
Live controls (`controls/`) stay above the shell and are scaffolding — snap
toggle, grid size, grid overlay, reset layout.

## Accessibility note

Free-canvas positioning has no established fully-accessible pattern. Each widget
has a real `<button>` drag handle, and dnd-kit's `KeyboardSensor` makes it
keyboard-operable (focus the handle, Space to pick up, arrow keys to move, Space
to drop) with dnd-kit's default screen-reader announcements. Gaps that remain:
the keyboard step is dnd-kit's default 25px rather than the current grid size,
corner resize is pointer-only with no keyboard equivalent yet, and there is no
explicit "reset this widget" affordance for keyboard users beyond the global
Reset layout button. Tracked for a later step.

The oversized top-bar page title is a decorative watermark — a near-invisible
`-webkit-text-stroke` outline in `--color-border`, far below AA text contrast.
It stays a real `<h2>` in the DOM for assistive tech, and the current page is
also indicated by the active nav item (`aria-current="page"`), so the low
contrast loses no information.

## Best-practice note

Widgets are absolutely positioned from a state model (`layout.ts`) rather than a
CSS grid or flow layout — deliberate, it's the whole point of the piece. A
production implementation would persist that layout model per user and likely
run collision/packing logic on it; here it is in-memory and overlap is allowed.

The shell targets the gallery's standard width. It isn't responsive yet — the
canvas has fixed pixel dimensions and the centered top-bar search crowds the
title / user cluster below roughly 1000px. A mobile/reflow pass is a later step.

Widget bodies (starting with `MetricWidget`) use hardcoded hex colours rather
than design tokens — deliberate, the widgets mock a product's own data-viz
palette and aren't bound to petri's tokens. Production would promote the widget
palette to its own token set.

The nav accent (`--nav-accent` in `styles.css`) is an intentional off-token
colour — the shell mocks a product with its own brand, not petri chrome. It's a
scoped CSS var on `.dashboard-shell`, themed per mode (`#6f9bff` dark / `#3a54e8`
light) so the active nav item's accent-coloured text clears AA (≥4.5:1) on the
nav surface in both themes. The active nav item and logo mark carry a soft
accent `text-shadow` / `drop-shadow` halo (a faint glow). The same accent
border + soft ring appears on the focused search, and on hover of the avatar
and the nav links. Production would promote the colour to a real design token.

## Browser note

Widget A's gradient number uses `background-clip: text` with transparent text
fill (Tailwind's `bg-clip-text` emits both `-webkit-` and unprefixed forms).
Baseline across current Chrome / Firefox / Safari; on an engine that lacks it
the number renders transparent (invisible) rather than falling back to a solid
colour. Acceptable for a prototype — production would add a solid-colour
fallback via `@supports`.

Drag uses pointer events + CSS transforms (`@dnd-kit`), broadly supported.
`touch-action: none` is set on the drag handles so touch drags don't scroll the
page — worth a check on iOS Safari when this experiment gets a mobile pass.

The nav glow uses `color-mix()` (Baseline 2023 — current Chrome/Firefox/Safari)
and the page title uses `-webkit-text-stroke` (prefixed but broadly
implemented). Older engines drop those declarations — no glow, and the title
loses its outline and falls back to the `--bg` fill (fully invisible). Nothing
else depends on either.
