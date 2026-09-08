import { Avatar } from './Avatar'
import { TopBarSearch } from './TopBarSearch'

interface TopBarProps {
  title: string
  user: { name: string; role: string; initials: string }
}

export function TopBar({ title, user }: TopBarProps) {
  return (
    <header className="grid h-14 shrink-0 grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-border px-4">
      <h2 className="m-0 text-lg font-normal tracking-tight text-ink/85">{title}</h2>
      <div className="min-w-0 justify-self-center">
        <TopBarSearch />
      </div>
      <div className="flex items-center gap-3">
        <span className="hidden text-right leading-tight sm:block">
          <span className="block text-sm text-ink">{user.name}</span>
          <span className="block text-xs text-muted">{user.role}</span>
        </span>
        <Avatar initials={user.initials} />
      </div>
    </header>
  )
}
