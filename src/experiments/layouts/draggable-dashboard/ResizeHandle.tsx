import { useRef } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { MIN_H, MIN_W } from './dashboard-data'
import { clamp, snapToGrid } from './layout'

const copy = {
  label: (title: string) => `Resize ${title}`,
} as const

interface ResizeHandleProps {
  title: string
  width: number
  height: number
  snap: boolean
  gridSize: number
  /** Canvas edge to the widget's right / bottom — the widest / tallest it can grow. */
  maxW: number
  maxH: number
  onResizeStart: () => void
  onResize: (w: number, h: number) => void
}

export function ResizeHandle({
  title,
  width,
  height,
  snap,
  gridSize,
  maxW,
  maxH,
  onResizeStart,
  onResize,
}: ResizeHandleProps) {
  const start = useRef<{ px: number; py: number; w: number; h: number } | null>(null)

  const handlePointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    event.stopPropagation()
    event.currentTarget.setPointerCapture(event.pointerId)
    start.current = { px: event.clientX, py: event.clientY, w: width, h: height }
    onResizeStart()
  }

  const handlePointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!start.current) return
    const dx = event.clientX - start.current.px
    const dy = event.clientY - start.current.py
    let w = clamp(start.current.w + dx, MIN_W, maxW)
    let h = clamp(start.current.h + dy, MIN_H, maxH)
    if (snap) {
      w = clamp(snapToGrid(w, gridSize), MIN_W, maxW)
      h = clamp(snapToGrid(h, gridSize), MIN_H, maxH)
    }
    onResize(w, h)
  }

  const handlePointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    start.current = null
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  return (
    <button
      type="button"
      aria-label={copy.label(title)}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="absolute bottom-0 right-0 flex h-5 w-5 touch-none cursor-nwse-resize items-end justify-end rounded-br-card p-1 text-muted hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true" fill="currentColor">
        <circle cx="8.5" cy="8.5" r="1" />
        <circle cx="8.5" cy="5" r="1" />
        <circle cx="5" cy="8.5" r="1" />
      </svg>
    </button>
  )
}
