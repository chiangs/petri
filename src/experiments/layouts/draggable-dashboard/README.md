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
content is unchanged). Live controls (`controls/`) stay above the shell and are
scaffolding — snap toggle, grid size, grid overlay, reset layout.

## Accessibility note

Free-canvas positioning has no established fully-accessible pattern. Each widget
has a real `<button>` drag handle, and dnd-kit's `KeyboardSensor` makes it
keyboard-operable (focus the handle, Space to pick up, arrow keys to move, Space
to drop) with dnd-kit's default screen-reader announcements. Gaps that remain in
step 1: the keyboard step is dnd-kit's default 25px rather than the current grid
size, and there is no explicit "reset this widget" affordance for keyboard users
beyond the global Reset layout button. Tracked for a later step.

## Best-practice note

Widgets are absolutely positioned from a state model (`layout.ts`) rather than a
CSS grid or flow layout — deliberate, it's the whole point of the piece. A
production implementation would persist that layout model per user and likely
run collision/packing logic on it; here it is in-memory and overlap is allowed.

The nav accent (`--nav-accent` in `styles.css`) is an intentional off-token
colour — the shell mocks a product with its own brand, not petri chrome. It's a
scoped CSS var on `.dashboard-shell`, themed per mode (`#9b7dff` dark / `#7c3aed`
light) so the active nav item's accent-coloured text clears AA (≥4.5:1) on the
nav surface in both themes. Production would promote it to a real design token.

## Browser note

Drag uses pointer events + CSS transforms (`@dnd-kit`), broadly supported.
`touch-action: none` is set on the drag handles so touch drags don't scroll the
page — worth a check on iOS Safari when this experiment gets a mobile pass.
