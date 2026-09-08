import { useRef, useState, type KeyboardEvent } from 'react'
import { cn } from '@/lib/cn'
import { SearchIcon } from './SearchIcon'
import { useReducedMotion } from './use-reduced-motion'

// A non-functional search field, centered in the top bar. Always visible; it
// widens on focus (spring easing borrowed from the floating-label-input
// experiment) and narrows back on blur. It filters nothing — shell dressing.

const copy = {
  label: 'Search',
  placeholder: 'Search for...',
  clear: 'Clear search',
} as const

const REST_WIDTH = 180
const FOCUS_WIDTH = 240

const SPRING_EASE = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'
const SPRING_DURATION = 'duration-[260ms]'
const NO_MOTION_DURATION = 'duration-0'

export function TopBarSearch() {
  const [focused, setFocused] = useState(false)
  const [value, setValue] = useState('')
  const reducedMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)

  const duration = reducedMotion ? NO_MOTION_DURATION : SPRING_DURATION

  const handleClear = () => {
    setValue('')
    inputRef.current?.focus()
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') inputRef.current?.blur()
  }

  // Focused, or holding a query — the field takes the nav accent (see styles.css).
  const active = focused || value.length > 0

  const wrapperClasses = cn(
    // `max-w-full` lets the field cap at the available space instead of pushing
    // the user cluster out when the bar is narrow.
    'topbar-search relative flex h-9 max-w-full items-center overflow-hidden rounded-full border border-border',
    'transition-[width,border-color,box-shadow]',
    duration,
    SPRING_EASE,
    active && 'topbar-search--active',
  )

  const clearButton =
    value.length > 0 ? (
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
    <div
      className={wrapperClasses}
      style={{ width: focused ? FOCUS_WIDTH : REST_WIDTH }}
    >
      <span className="topbar-search__icon pointer-events-none absolute left-2.5 top-1/2 -translate-y-1/2 text-muted transition-colors">
        <SearchIcon />
      </span>
      <input
        ref={inputRef}
        type="search"
        aria-label={copy.label}
        placeholder={copy.placeholder}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onKeyDown={handleKeyDown}
        className={cn(
          'h-full w-full bg-transparent pl-9 pr-8 text-xs text-ink outline-none placeholder:text-muted',
          '[&::-webkit-search-cancel-button]:appearance-none',
        )}
      />
      {clearButton}
    </div>
  )
}
