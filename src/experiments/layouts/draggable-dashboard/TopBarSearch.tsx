import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { SearchIcon } from './SearchIcon'
import { useReducedMotion } from './use-reduced-motion'

// A non-functional search affordance for the top bar. Collapsed it's a circular
// icon button (matching the user avatar's height); clicking expands it leftward
// into a pill-shaped field with a static placeholder, wide enough for ~15
// characters plus a clear button. It filters nothing — it's shell dressing.

const copy = {
  open: 'Open search',
  label: 'Search',
  placeholder: 'Search for...',
  clear: 'Clear search',
} as const

const COLLAPSED_W = 36
const EXPANDED_W = 208

// Spring easing lifted from the floating-label-input experiment.
const SPRING_EASE = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'
const SPRING_DURATION = 'duration-[260ms]'
const NO_MOTION_DURATION = 'duration-0'

export function TopBarSearch() {
  const [expanded, setExpanded] = useState(false)
  const [value, setValue] = useState('')
  const reducedMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (expanded) inputRef.current?.focus()
  }, [expanded])

  const duration = reducedMotion ? NO_MOTION_DURATION : SPRING_DURATION

  const handleBlur = () => {
    if (value.length === 0) setExpanded(false)
  }

  const handleClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setValue('')
      setExpanded(false)
      inputRef.current?.blur()
    }
  }

  const wrapperClasses = cn(
    'relative flex h-9 shrink-0 items-center overflow-hidden rounded-full border border-border transition-[width]',
    'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-600',
    duration,
    SPRING_EASE,
  )

  const leadingIconClasses = cn(
    'pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted transition-opacity',
    duration,
    expanded ? 'opacity-100' : 'opacity-0',
  )

  const openButton = expanded ? null : (
    <button
      type="button"
      aria-label={copy.open}
      aria-expanded={false}
      onClick={() => setExpanded(true)}
      className="absolute inset-0 flex items-center justify-center rounded-full text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
    >
      <SearchIcon />
    </button>
  )

  const clearButton =
    expanded && value.length > 0 ? (
      <button
        type="button"
        aria-label={copy.clear}
        onMouseDown={(event) => event.preventDefault()}
        onClick={handleClear}
        className="absolute right-1 top-1/2 flex size-6 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand-500/10 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <svg viewBox="0 0 16 16" width="12" height="12" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    ) : null

  return (
    <div className={wrapperClasses} style={{ width: expanded ? EXPANDED_W : COLLAPSED_W }}>
      <span className={leadingIconClasses}>
        <SearchIcon />
      </span>
      <input
        ref={inputRef}
        type="search"
        aria-label={copy.label}
        placeholder={copy.placeholder}
        value={value}
        tabIndex={expanded ? undefined : -1}
        onChange={(event) => setValue(event.target.value)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          'h-full w-full bg-transparent pl-9 pr-8 text-xs text-ink outline-none placeholder:text-muted',
          '[&::-webkit-search-cancel-button]:appearance-none',
          expanded ? '' : 'pointer-events-none',
        )}
      />
      {openButton}
      {clearButton}
    </div>
  )
}
