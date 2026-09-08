import { cn } from '@/lib/cn'
import { NavIcon } from './NavIcon'
import { NAV_ACCENT } from './nav-accent'
import type { NavIconId } from './dashboard-data'

interface NavItemProps {
  id: NavIconId
  label: string
  active: boolean
  onSelect: () => void
}

export function NavItem({ id, label, active, onSelect }: NavItemProps) {
  const classes = cn(
    'flex w-full items-center gap-2 rounded-control px-2 py-2 text-left text-sm transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600',
    active
      ? 'font-medium text-white'
      : 'text-muted hover:bg-brand-500/5 hover:text-ink',
  )
  const style = active ? { backgroundColor: NAV_ACCENT } : undefined

  return (
    <li>
      <button
        type="button"
        onClick={onSelect}
        aria-current={active ? 'page' : undefined}
        className={classes}
        style={style}
      >
        <NavIcon id={id} />
        {label}
      </button>
    </li>
  )
}
