import { useReducer, useState } from 'react'
import { DashboardControls } from './controls/DashboardControls'
import { DashboardCanvas } from './DashboardCanvas'
import { DashboardShell } from './DashboardShell'
import { NavSidebar } from './NavSidebar'
import { TopBar } from './TopBar'
import {
  APP_NAME,
  DEFAULT_NAV_ID,
  NAV_ITEMS,
  PLACEHOLDER_WIDGETS,
  USER,
  type NavIconId,
} from './dashboard-data'
import { dashboardReducer, initialDashboardState } from './layout'

export default function Component() {
  const [state, dispatch] = useReducer(dashboardReducer, undefined, initialDashboardState)
  const [activeNavId, setActiveNavId] = useState<NavIconId>(DEFAULT_NAV_ID)

  const activeNav = NAV_ITEMS.find((item) => item.id === activeNavId) ?? NAV_ITEMS[0]

  const handleMove = (id: string, x: number, y: number) => {
    dispatch({ type: 'MOVE_WIDGET', id, x, y })
  }

  const sidebar = (
    <NavSidebar
      appName={APP_NAME}
      items={NAV_ITEMS}
      activeId={activeNavId}
      onSelect={setActiveNavId}
    />
  )
  const topBar = <TopBar title={activeNav.label} user={USER} />

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
      <DashboardShell sidebar={sidebar} topBar={topBar}>
        <DashboardCanvas
          widgets={PLACEHOLDER_WIDGETS}
          layout={state.layout}
          snap={state.snap}
          gridSize={state.gridSize}
          showGrid={state.showGrid}
          onMove={handleMove}
        />
      </DashboardShell>
    </div>
  )
}
