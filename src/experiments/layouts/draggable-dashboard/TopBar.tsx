import { Avatar } from './Avatar'
import { TopBarSearch } from './TopBarSearch'

interface TopBarProps {
  title: string
  user: { name: string; role: string; initials: string }
}

export function TopBar({ title, user }: TopBarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border px-4">
      <h2 className="m-0 text-base font-medium text-ink">{title}</h2>
      <div className="flex items-center gap-3">
        <TopBarSearch />
        <span className="hidden text-right leading-tight sm:block">
          <span className="block text-sm text-ink">{user.name}</span>
          <span className="block text-xs text-muted">{user.role}</span>
        </span>
        <Avatar initials={user.initials} />
      </div>
    </header>
  )
}
