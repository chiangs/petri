import type { ButtonHTMLAttributes, CSSProperties } from 'react'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { cn } from '@/lib/cn'
import { WidgetCard } from './WidgetCard'
import type { WidgetPos } from './layout'

interface DraggableWidgetProps {
  id: string
  title: string
  pos: WidgetPos
}

export function DraggableWidget({ id, title, pos }: DraggableWidgetProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    isDragging,
  } = useDraggable({ id })

  const style: CSSProperties = {
    position: 'absolute',
    left: pos.x,
    top: pos.y,
    width: pos.w,
    height: pos.h,
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 10 : undefined,
  }

  const className = cn(
    'rounded-card border border-border bg-surface shadow-sm transition-shadow',
    isDragging && 'shadow-lg',
  )

  return (
    <div ref={setNodeRef} style={style} className={className}>
      <WidgetCard
        title={title}
        dragging={isDragging}
        handleRef={setActivatorNodeRef}
        handleProps={
          { ...listeners, ...attributes } as ButtonHTMLAttributes<HTMLButtonElement>
        }
      />
    </div>
  )
}
