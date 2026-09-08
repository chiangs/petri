import { cn } from '@/lib/cn'

const copy = {
  clearLabel: 'Clear search',
} as const

interface ClearButtonProps {
  onClear: () => void
}

// Sits inside the input's reserved right padding — see SearchInput's `pr-10`,
// which keeps a long value scrolling behind this button instead of rendering
// underneath it.
export function ClearButton({ onClear }: ClearButtonProps) {
  return (
    <button
      type="button"
      aria-label={copy.clearLabel}
      onMouseDown={(event) => event.preventDefault()}
      onClick={onClear}
      className={cn(
        'absolute right-2 top-1/2 flex size-8 -translate-y-1/2 items-center justify-center rounded-control outline-none transition-colors',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
        'text-muted hover:bg-brand-50 hover:text-ink',
      )}
    >
      <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
        <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    </button>
  )
}
