import { Logo } from './Logo'
import { NavItem } from './NavItem'
import type { NavIconId, NavItemDef } from './dashboard-data'

const copy = {
  navLabel: 'Primary',
} as const

interface NavSidebarProps {
  appName: string
  items: NavItemDef[]
  activeId: NavIconId
  onSelect: (id: NavIconId) => void
}

export function NavSidebar({ appName, items, activeId, onSelect }: NavSidebarProps) {
  const navItems = items.map((item) => (
    <NavItem
      key={item.id}
      id={item.id}
      label={item.label}
      active={item.id === activeId}
      onSelect={() => onSelect(item.id)}
    />
  ))

  return (
    <nav
      aria-label={copy.navLabel}
      className="flex w-52 shrink-0 flex-col border-r border-border bg-surface p-3"
    >
      <Logo name={appName} />
      <ul className="mt-4 flex flex-col gap-1">{navItems}</ul>
    </nav>
  )
}
