import { GRID_SIZE_DEFAULT, PLACEHOLDER_WIDGETS } from './dashboard-data'

export interface WidgetPos {
  x: number
  y: number
  w: number
  h: number
}

export type Layout = Record<string, WidgetPos>

export interface DashboardState {
  layout: Layout
  snap: boolean
  gridSize: number
  showGrid: boolean
}

export type DashboardAction =
  | { type: 'MOVE_WIDGET'; id: string; x: number; y: number }
  | { type: 'SET_SNAP'; value: boolean }
  | { type: 'SET_GRID_SIZE'; value: number }
  | { type: 'SET_SHOW_GRID'; value: boolean }
  | { type: 'RESET' }

export function snapToGrid(value: number, grid: number): number {
  return Math.round(value / grid) * grid
}

export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function defaultLayout(): Layout {
  return Object.fromEntries(
    PLACEHOLDER_WIDGETS.map((w) => [w.id, { x: w.x, y: w.y, w: w.w, h: w.h }]),
  )
}

export function initialDashboardState(): DashboardState {
  return {
    layout: defaultLayout(),
    snap: false,
    gridSize: GRID_SIZE_DEFAULT,
    showGrid: false,
  }
}

export function dashboardReducer(
  state: DashboardState,
  action: DashboardAction,
): DashboardState {
  switch (action.type) {
    case 'MOVE_WIDGET': {
      const current = state.layout[action.id]
      if (!current) return state
      return {
        ...state,
        layout: {
          ...state.layout,
          [action.id]: { ...current, x: action.x, y: action.y },
        },
      }
    }
    case 'SET_SNAP':
      return { ...state, snap: action.value }
    case 'SET_GRID_SIZE':
      return { ...state, gridSize: action.value }
    case 'SET_SHOW_GRID':
      return { ...state, showGrid: action.value }
    case 'RESET':
      // Positions only — the snap / grid-size / overlay settings stay put.
      return { ...state, layout: defaultLayout() }
    default:
      return state
  }
}
