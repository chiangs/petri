import { useEffect, useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { SearchIcon } from './SearchIcon'
import { useReducedMotion } from './use-reduced-motion'

// A non-functional search affordance for the top bar. Collapsed it's a circular
// icon button; clicking expands it leftward into a floating-label field (the
// mechanic mirrors the floating-label-input experiment) wide enough for ~15
// characters plus a clear button. It filters nothing — it's shell dressing.

const copy = {
  open: 'Open search',
  label: 'Search',
  clear: 'Clear search',
} as const

const COLLAPSED_W = 44
const EXPANDED_W = 208

// Spring easing lifted from the floating-label-input experiment.
const SPRING_EASE = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'
const SPRING_DURATION = 'duration-[260ms]'
const NO_MOTION_DURATION = 'duration-0'

const REST_TRANSFORM = 'translate(0, -50%)'
const FLOAT_TRANSFORM = 'translate(0, -16px) scale(0.8)'

export function TopBarSearch() {
  const [expanded, setExpanded] = useState(false)
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const reducedMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (expanded) inputRef.current?.focus()
  }, [expanded])

  const duration = reducedMotion ? NO_MOTION_DURATION : SPRING_DURATION
  const floated = focused || value.length > 0
  const labelTransform = floated ? FLOAT_TRANSFORM : REST_TRANSFORM

  const handleBlur = () => {
    setFocused(false)
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
    'relative flex h-11 shrink-0 items-center overflow-hidden rounded-full border border-border transition-[width]',
    'focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand-600',
    duration,
    SPRING_EASE,
  )

  const leadingIconClasses = cn(
    'pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-muted transition-opacity',
    duration,
    expanded ? 'opacity-100' : 'opacity-0',
  )

  const labelClasses = cn(
    'pointer-events-none absolute left-10 top-1/2 origin-left text-xs leading-none text-muted transition-[transform,opacity]',
    duration,
    SPRING_EASE,
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
        className="absolute right-1.5 top-1/2 flex size-7 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-brand-500/10 hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        <svg viewBox="0 0 16 16" width="13" height="13" fill="none" aria-hidden="true">
          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>
    ) : null

  return (
    <div
      className={wrapperClasses}
      style={{ width: expanded ? EXPANDED_W : COLLAPSED_W }}
    >
      <span className={leadingIconClasses}>
        <SearchIcon />
      </span>
      <input
        ref={inputRef}
        id="topbar-search"
        type="search"
        value={value}
        tabIndex={expanded ? undefined : -1}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={cn(
          'h-full w-full bg-transparent pl-10 pr-9 text-xs text-ink outline-none',
          '[&::-webkit-search-cancel-button]:appearance-none',
          expanded ? '' : 'pointer-events-none',
        )}
      />
      <label
        htmlFor="topbar-search"
        style={{ transform: labelTransform }}
        className={labelClasses}
      >
        {copy.label}
      </label>
      {openButton}
      {clearButton}
    </div>
  )
}
