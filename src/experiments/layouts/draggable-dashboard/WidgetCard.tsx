import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

const copy = {
  handleLabel: (title: string) => `Move ${title}`,
} as const

interface WidgetCardProps {
  title: string
  dragging: boolean
  handleRef: (element: HTMLElement | null) => void
  /** dnd-kit `listeners` + `attributes`, spread onto the drag handle. */
  handleProps: ButtonHTMLAttributes<HTMLButtonElement>
  children?: ReactNode
}

export function WidgetCard({
  title,
  dragging,
  handleRef,
  handleProps,
  children,
}: WidgetCardProps) {
  const handleClasses = cn(
    'flex w-full touch-none items-center gap-2 rounded-t-card border-b border-border px-3 py-2',
    'text-sm font-medium text-ink',
    'hover:bg-brand-500/5',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
    dragging ? 'cursor-grabbing' : 'cursor-grab',
  )

  return (
    <div className="flex h-full flex-col">
      <button
        ref={handleRef}
        type="button"
        aria-label={copy.handleLabel(title)}
        className={handleClasses}
        {...handleProps}
      >
        <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true" fill="currentColor">
          <circle cx="5" cy="3" r="1.4" />
          <circle cx="11" cy="3" r="1.4" />
          <circle cx="5" cy="8" r="1.4" />
          <circle cx="11" cy="8" r="1.4" />
          <circle cx="5" cy="13" r="1.4" />
          <circle cx="11" cy="13" r="1.4" />
        </svg>
        <span>{title}</span>
      </button>
      <div className="min-h-0 flex-1 p-3 text-sm text-muted">{children}</div>
    </div>
  )
}
