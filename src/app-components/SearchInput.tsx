import { useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/lib/use-reduced-motion'
import { ClearButton } from './ClearButton'

// Ported from the floating-label-input experiment. Rest position centers the
// label in the field; floated lifts it toward the top edge and shrinks it via
// `scale`. Both are one `transform` so the spring easing animates a single
// continuous value instead of fighting a utility class. The float distance
// clears the input's own text line — keep it in step with the `h-16` below.
const REST_TRANSFORM = 'translate(0, -50%)'
const FLOAT_TRANSFORM = 'translate(0, -30px) scale(0.75)'

// Slight overshoot on arrival — reads as a spring without a physics lib.
const SPRING_EASE = 'ease-[cubic-bezier(0.34,1.56,0.64,1)]'
const SPRING_DURATION = 'duration-[260ms]'
const NO_MOTION_DURATION = 'duration-0'

interface SearchInputProps {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ id, label, value, onChange }: SearchInputProps) {
  const [focused, setFocused] = useState(false)
  const reducedMotion = useReducedMotion()
  const inputRef = useRef<HTMLInputElement>(null)

  const floated = focused || value.length > 0
  const duration = reducedMotion ? NO_MOTION_DURATION : SPRING_DURATION
  const labelTransform = floated ? FLOAT_TRANSFORM : REST_TRANSFORM

  const handleClear = () => {
    onChange('')
    inputRef.current?.focus()
  }

  const clearButton = value.length > 0 ? <ClearButton onClear={handleClear} /> : null

  // `pr-10` reserves room for the clear button so a long value scrolls behind it
  // (the input's own scrolling) instead of rendering underneath it.
  const inputClasses = cn(
    'h-16 w-full rounded-control border border-border bg-surface pl-4 pr-10 text-base text-ink outline-none transition-colors',
    'hover:border-brand-500/60',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
    // suppress the native WebKit clear affordance — we render our own ClearButton
    '[&::-webkit-search-cancel-button]:appearance-none',
  )

  const labelClasses = cn(
    'pointer-events-none absolute left-4 top-1/2 origin-left text-base leading-none text-muted transition-transform',
    duration,
    SPRING_EASE,
  )

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        id={id}
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={inputClasses}
      />
      <label htmlFor={id} style={{ transform: labelTransform }} className={labelClasses}>
        {label}
      </label>
      {clearButton}
    </div>
  )
}
