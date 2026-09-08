import {
  GRID_SIZE_MAX,
  GRID_SIZE_MIN,
  GRID_SIZE_STEP,
} from '../dashboard-data'
import { RangeControl } from './RangeControl'
import { ToggleControl } from './ToggleControl'

// Dev-time controls for iterating on the piece. NOT part of what gets promoted —
// lives in `controls/` so it's left behind (docs/DESIGN.md).

const copy = {
  groupLabel: 'Dashboard controls',
  snapLabel: 'Snap to grid',
  overlayLabel: 'Show grid',
  gridSizeLabel: 'Grid size',
  gridSizeValue: (px: number) => `${px}px`,
  resetLabel: 'Reset layout',
} as const

interface DashboardControlsProps {
  snap: boolean
  gridSize: number
  showGrid: boolean
  onSnapChange: (value: boolean) => void
  onGridSizeChange: (value: number) => void
  onShowGridChange: (value: boolean) => void
  onReset: () => void
}

export function DashboardControls({
  snap,
  gridSize,
  showGrid,
  onSnapChange,
  onGridSizeChange,
  onShowGridChange,
  onReset,
}: DashboardControlsProps) {
  return (
    <div
      role="group"
      aria-label={copy.groupLabel}
      className="flex flex-wrap items-end gap-x-8 gap-y-4"
    >
      <ToggleControl label={copy.snapLabel} checked={snap} onChange={onSnapChange} />
      <ToggleControl
        label={copy.overlayLabel}
        checked={showGrid}
        onChange={onShowGridChange}
      />
      <RangeControl
        label={copy.gridSizeLabel}
        valueText={copy.gridSizeValue(gridSize)}
        value={gridSize}
        min={GRID_SIZE_MIN}
        max={GRID_SIZE_MAX}
        step={GRID_SIZE_STEP}
        onChange={onGridSizeChange}
      />
      <button
        type="button"
        onClick={onReset}
        className="rounded-control border border-border px-3 py-2 text-sm font-medium text-ink hover:bg-brand-500/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {copy.resetLabel}
      </button>
    </div>
  )
}
