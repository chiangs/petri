import type { CSSProperties } from 'react'

interface GridOverlayProps {
  gridSize: number
}

// Faint ruled grid so the snap targets are visible. Decorative — hidden from
// assistive tech and never intercepts pointer events.
export function GridOverlay({ gridSize }: GridOverlayProps) {
  const style: CSSProperties = {
    backgroundImage:
      'linear-gradient(to right, var(--border) 1px, transparent 1px),' +
      'linear-gradient(to bottom, var(--border) 1px, transparent 1px)',
    backgroundSize: `${gridSize}px ${gridSize}px`,
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={style} />
  )
}
