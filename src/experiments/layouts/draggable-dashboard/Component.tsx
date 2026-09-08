import { useReducer } from 'react'
import { DashboardControls } from './controls/DashboardControls'
import { DashboardCanvas } from './DashboardCanvas'
import { PLACEHOLDER_WIDGETS } from './dashboard-data'
import { dashboardReducer, initialDashboardState } from './layout'

export default function Component() {
  const [state, dispatch] = useReducer(dashboardReducer, undefined, initialDashboardState)

  const handleMove = (id: string, x: number, y: number) => {
    dispatch({ type: 'MOVE_WIDGET', id, x, y })
  }

  return (
    <div className="w-full space-y-6">
      <DashboardControls
        snap={state.snap}
        gridSize={state.gridSize}
        showGrid={state.showGrid}
        onSnapChange={(value) => dispatch({ type: 'SET_SNAP', value })}
        onGridSizeChange={(value) => dispatch({ type: 'SET_GRID_SIZE', value })}
        onShowGridChange={(value) => dispatch({ type: 'SET_SHOW_GRID', value })}
        onReset={() => dispatch({ type: 'RESET' })}
      />
      <DashboardCanvas
        widgets={PLACEHOLDER_WIDGETS}
        layout={state.layout}
        snap={state.snap}
        gridSize={state.gridSize}
        showGrid={state.showGrid}
        onMove={handleMove}
      />
    </div>
  )
}
