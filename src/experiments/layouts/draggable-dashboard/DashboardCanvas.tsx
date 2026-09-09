import { useMemo, useRef, useState } from 'react'
import {
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from '@dnd-kit/core'
import { createSnapModifier, restrictToParentElement } from '@dnd-kit/modifiers'
import { DraggableWidget } from './DraggableWidget'
import { GridOverlay } from './GridOverlay'
import { CANVAS_HEIGHT, type WidgetDef } from './dashboard-data'
import { clamp, snapToGrid, type Layout } from './layout'

const copy = {
  canvasLabel: 'Dashboard canvas',
} as const

interface DashboardCanvasProps {
  widgets: WidgetDef[]
  layout: Layout
  snap: boolean
  gridSize: number
  showGrid: boolean
  onMove: (id: string, x: number, y: number) => void
  onResize: (id: string, w: number, h: number) => void
}

export function DashboardCanvas({
  widgets,
  layout,
  snap,
  gridSize,
  showGrid,
  onMove,
  onResize,
}: DashboardCanvasProps) {
  const canvasRef = useRef<HTMLDivElement>(null)
  // Measured when a resize starts, so each widget's max size tracks the live
  // canvas box (which can change with the window) rather than a stale value.
  const [canvasSize, setCanvasSize] = useState<{ width: number; height: number } | null>(null)

  const handleResizeStart = () => {
    const bounds = canvasRef.current?.getBoundingClientRect()
    if (bounds) setCanvasSize({ width: bounds.width, height: bounds.height })
  }

  // A few px of travel before a drag starts, so a plain click / keyboard focus
  // on the handle still works.
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 4 } }),
    useSensor(KeyboardSensor),
  )

  const snapModifier = useMemo(() => createSnapModifier(gridSize), [gridSize])
  const modifiers = snap
    ? [snapModifier, restrictToParentElement]
    : [restrictToParentElement]

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, delta } = event
    const id = String(active.id)
    const pos = layout[id]
    if (!pos) return

    // `restrictToParentElement` already keeps the drag inside the canvas;
    // this re-clamp only guards the extra rounding that snap adds on drop.
    const bounds = canvasRef.current?.getBoundingClientRect()
    const maxX = bounds ? Math.max(0, bounds.width - pos.w) : Number.MAX_SAFE_INTEGER
    const maxY = bounds ? Math.max(0, bounds.height - pos.h) : Number.MAX_SAFE_INTEGER

    let x = pos.x + delta.x
    let y = pos.y + delta.y
    if (snap) {
      x = snapToGrid(x, gridSize)
      y = snapToGrid(y, gridSize)
    }

    onMove(id, clamp(x, 0, maxX), clamp(y, 0, maxY))
  }

  const gridOverlay = showGrid ? <GridOverlay gridSize={gridSize} /> : null

  const widgetNodes = widgets.map((widget) => {
    const pos = layout[widget.id] ?? widget
    const maxW = canvasSize
      ? Math.max(0, canvasSize.width - pos.x)
      : Number.MAX_SAFE_INTEGER
    const maxH = canvasSize
      ? Math.max(0, canvasSize.height - pos.y)
      : Number.MAX_SAFE_INTEGER
    return (
      <DraggableWidget
        key={widget.id}
        id={widget.id}
        title={widget.title}
        pos={pos}
        snap={snap}
        gridSize={gridSize}
        maxW={maxW}
        maxH={maxH}
        onResizeStart={handleResizeStart}
        onResize={(w, h) => onResize(widget.id, w, h)}
      />
    )
  })

  return (
    <DndContext sensors={sensors} modifiers={modifiers} onDragEnd={handleDragEnd}>
      <div
        ref={canvasRef}
        role="group"
        aria-label={copy.canvasLabel}
        className="relative h-full overflow-hidden bg-bg"
        style={{ minHeight: CANVAS_HEIGHT }}
      >
        {gridOverlay}
        {widgetNodes}
      </div>
    </DndContext>
  )
}
