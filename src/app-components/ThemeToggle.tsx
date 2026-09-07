import { useEffect, useState } from 'react'
import { cn } from '@/lib/cn'

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

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('theme', theme)
    } catch {
      // ignore — private mode / storage disabled
    }
  }, [theme])

  const isDark = theme === 'dark'
  const nextLabel = isDark ? copy.toLight : copy.toDark
  const stateLabel = isDark ? copy.dark : copy.light

  return (
    <button
      type="button"
      aria-label={nextLabel}
      aria-pressed={isDark}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
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
