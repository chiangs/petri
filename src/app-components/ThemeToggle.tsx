import { useState } from 'react'
import { cn } from '@/lib/cn'
import { useReducedMotion } from '@/lib/use-reduced-motion'

type Theme = 'dark' | 'light'

const copy = {
  toLight: 'Switch to light theme',
  toDark: 'Switch to dark theme',
  dark: 'Dark',
  light: 'Light',
} as const

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark'
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(currentTheme)
  const reducedMotion = useReducedMotion()

  const isDark = theme === 'dark'
  const nextLabel = isDark ? copy.toLight : copy.toDark
  const stateLabel = isDark ? copy.dark : copy.light

  const toggle = () => {
    const next: Theme = isDark ? 'light' : 'dark'
    // Write straight to the DOM (not via an effect) so the swap happens inside
    // the View Transition callback — that's what the crossfade captures.
    const commit = () => {
      document.documentElement.dataset.theme = next
      setTheme(next)
      try {
        localStorage.setItem('theme', next)
      } catch {
        // ignore — private mode / storage disabled
      }
    }

    // Crossfade the colour change where supported; instant swap otherwise or
    // when the user asked for reduced motion.
    if (!reducedMotion && document.startViewTransition) {
      document.startViewTransition(commit)
    } else {
      commit()
    }
  }

  return (
    <button
      type="button"
      aria-label={nextLabel}
      aria-pressed={isDark}
      onClick={toggle}
      className={cn(
        'inline-flex w-full items-center justify-between rounded-card border border-border',
        'px-3 py-2 text-sm text-muted',
        'hover:text-ink hover:bg-brand-500/10',
        'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500',
      )}
    >
      <span>{stateLabel}</span>
      <span aria-hidden="true">{isDark ? '🌙' : '☀️'}</span>
    </button>
  )
}
