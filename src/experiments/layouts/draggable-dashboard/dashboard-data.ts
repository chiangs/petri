// Step 1 uses labelled placeholder cards — just enough to exercise free drag,
// grid snap, and the canvas bounds. Real KPI tiles / table / feed land in a
// later step. Positions and sizes are multiples of GRID_SIZE_DEFAULT so they
// sit cleanly on the default grid.

export interface WidgetDef {
  id: string
  title: string
  x: number
  y: number
  w: number
  h: number
}

export const PLACEHOLDER_WIDGETS: WidgetDef[] = [
  { id: 'a', title: 'Widget A', x: 24, y: 24, w: 216, h: 120 },
  { id: 'b', title: 'Widget B', x: 264, y: 24, w: 216, h: 120 },
  { id: 'c', title: 'Widget C', x: 504, y: 24, w: 168, h: 264 },
  { id: 'd', title: 'Widget D', x: 24, y: 168, w: 216, h: 120 },
  { id: 'e', title: 'Widget E', x: 264, y: 168, w: 216, h: 120 },
]

export const GRID_SIZE_DEFAULT = 24
export const GRID_SIZE_MIN = 8
export const GRID_SIZE_MAX = 48
export const GRID_SIZE_STEP = 4

export const CANVAS_HEIGHT = 560
