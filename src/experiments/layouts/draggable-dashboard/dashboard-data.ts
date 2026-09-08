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
  { id: 'b', title: 'Widget B', x: 264, y: 24, w: 168, h: 120 },
  { id: 'c', title: 'Widget C', x: 24, y: 168, w: 216, h: 120 },
  { id: 'd', title: 'Widget D', x: 264, y: 168, w: 168, h: 120 },
  { id: 'e', title: 'Widget E', x: 24, y: 312, w: 408, h: 120 },
]

export const GRID_SIZE_DEFAULT = 24
export const GRID_SIZE_MIN = 8
export const GRID_SIZE_MAX = 48
export const GRID_SIZE_STEP = 4

export const CANVAS_HEIGHT = 460

// ── App shell (nav + top bar) ────────────────────────────────────────────────

export type NavIconId =
  | 'overview'
  | 'reports'
  | 'customers'
  | 'revenue'
  | 'settings'

export interface NavItemDef {
  id: NavIconId
  label: string
}

export const APP_NAME = 'Northwind'

export const NAV_ITEMS: NavItemDef[] = [
  { id: 'overview', label: 'Overview' },
  { id: 'reports', label: 'Reports' },
  { id: 'customers', label: 'Customers' },
  { id: 'revenue', label: 'Revenue' },
  { id: 'settings', label: 'Settings' },
]

export const DEFAULT_NAV_ID: NavIconId = 'overview'

export const USER = {
  name: 'Stephen Chiang',
  role: 'Product Lead',
  initials: 'SC',
} as const
