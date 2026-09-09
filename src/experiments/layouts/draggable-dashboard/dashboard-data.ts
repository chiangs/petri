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
  { id: 'a', title: 'Net revenue retention', x: 24, y: 24, w: 240, h: 168 },
  { id: 'b', title: 'Network', x: 288, y: 24, w: 264, h: 264 },
  { id: 'c', title: 'Top channels', x: 24, y: 216, w: 240, h: 168 },
  { id: 'd', title: 'Throughput mix', x: 24, y: 408, w: 240, h: 168 },
  { id: 'e', title: 'Widget E', x: 288, y: 312, w: 264, h: 120 },
]

// Widget A renders this as one big gradient number (see MetricWidget). It's a
// static prototype value — no dataset behind it.
export const RETENTION_METRIC = {
  value: '114%',
  caption: 'net revenue retention',
} as const

// Widget C's ranked bar list (see BarListWidget). Static prototype figures;
// `value` is a share in percent, bars scale to the largest.
export const CHANNEL_SHARE: { label: string; value: number }[] = [
  { label: 'Organic search', value: 42 },
  { label: 'Direct', value: 28 },
  { label: 'Referral', value: 19 },
  { label: 'Social', value: 11 },
]

export const GRID_SIZE_DEFAULT = 24
export const GRID_SIZE_MIN = 8
export const GRID_SIZE_MAX = 48
export const GRID_SIZE_STEP = 4

// Smallest a widget can be resized to — grid-aligned to the default grid.
export const MIN_W = GRID_SIZE_DEFAULT * 4
export const MIN_H = GRID_SIZE_DEFAULT * 4

export const CANVAS_HEIGHT = 600

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
