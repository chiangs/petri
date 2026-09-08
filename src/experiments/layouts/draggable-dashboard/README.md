# Draggable dashboard

A data dashboard whose differentiator is layout freedom: every widget drags
freely anywhere on the canvas, and can **optionally** snap to a grid while
dragging and on drop. Built with `@dnd-kit/core` (`useDraggable`) plus
`@dnd-kit/modifiers` (`createSnapModifier`, `restrictToParentElement`).

**Step 1 of a multi-step build.** This step is the enterprise-app shell (nav
rail with logo, top bar with user avatar) around the drag/snap canvas, still
holding labelled placeholder cards. Still to come: real data-heavy widgets (KPI
tiles, table, activity feed), chart widgets, overlap handling, and layout
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
to drop) with dnd-kit's default screen-reader announcements. Gaps that remain in
step 1: the keyboard step is dnd-kit's default 25px rather than the current grid
size, and there is no explicit "reset this widget" affordance for keyboard users
beyond the global Reset layout button. Tracked for a later step.

The oversized top-bar page title is a decorative watermark treatment — a faint
translucent-accent fill that sits below AA text contrast. It stays a real
`<h2>` in the DOM for assistive tech, and the current page is also indicated by
the active nav item (`aria-current="page"`), so the low contrast doesn't lose
information. A true outline (`-webkit-text-stroke`) was dropped because it
doubles thin letter parts and Chromium ignores `paint-order` to fix it.

## Best-practice note

Widgets are absolutely positioned from a state model (`layout.ts`) rather than a
CSS grid or flow layout — deliberate, it's the whole point of the piece. A
production implementation would persist that layout model per user and likely
run collision/packing logic on it; here it is in-memory and overlap is allowed.

The shell targets the gallery's standard width. It isn't responsive yet — the
canvas has fixed pixel dimensions and the centered top-bar search crowds the
title / user cluster below roughly 1000px. A mobile/reflow pass is a later step.

The nav accent (`--nav-accent` in `styles.css`) is an intentional off-token
colour — the shell mocks a product with its own brand, not petri chrome. It's a
scoped CSS var on `.dashboard-shell`, themed per mode (`#6f9bff` dark / `#3a54e8`
light) so the active nav item's accent-coloured text clears AA (≥4.5:1) on the
nav surface in both themes. The active nav item and logo mark carry a soft
accent `text-shadow` / `drop-shadow` halo (a faint glow). The same accent
border + soft ring appears on the focused search, and on hover of the avatar
and the nav links. Production would promote the colour to a real design token.

## Browser note

Drag uses pointer events + CSS transforms (`@dnd-kit`), broadly supported.
`touch-action: none` is set on the drag handles so touch drags don't scroll the
page — worth a check on iOS Safari when this experiment gets a mobile pass.

The nav glow and the page-title fill use `color-mix()` (Baseline 2023 — current
Chrome/Firefox/Safari). Older engines drop those declarations and simply show
no glow / no title tint; nothing else depends on it.

The oversized page title is drawn as outlined text — `-webkit-text-stroke` in
the accent with a near-transparent accent fill. The property is prefixed but
implemented across current Chrome, Firefox, and Safari; without it the title
falls back to the faint fill alone (very low contrast). The accent stroke on
the bar background clears WCAG AA for large text (≥3:1) in both themes, and the
current page is also indicated by the active nav item.
