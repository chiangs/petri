import { cn } from '@/lib/cn'
import { NavIcon } from './NavIcon'
import type { NavIconId } from './dashboard-data'

interface NavItemProps {
  id: NavIconId
  label: string
  active: boolean
  onSelect: () => void
}

export function NavItem({ id, label, active, onSelect }: NavItemProps) {
  // Minimal: the active item is just accent-coloured text + icon (the icon
  // inherits `currentColor`), no filled background.
  const classes = cn(
    'flex w-full items-center gap-2 rounded-control px-2 py-2 text-left text-sm transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
    active
      ? 'font-medium text-[var(--nav-accent)]'
      : 'text-muted hover:text-ink',
  )

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={active ? 'page' : undefined}
        className={classes}
      >
        <NavIcon id={id} />
        {label}
      </button>
    </li>
  )
}
