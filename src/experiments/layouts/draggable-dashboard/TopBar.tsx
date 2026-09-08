import { Avatar } from './Avatar'
import { TopBarSearch } from './TopBarSearch'

interface TopBarProps {
  title: string
  user: { name: string; role: string; initials: string }
}

export function TopBar({ title, user }: TopBarProps) {
  return (
    <header className="relative grid h-14 shrink-0 grid-cols-[1fr_auto_1fr] items-center gap-3 border-b border-border px-4">
      {/* Oversized ghost heading — floated (absolute) so its size doesn't drive
          the bar layout; the search pill's solid bg occludes the overlap. */}
      <h2 className="pointer-events-none absolute left-4 top-1/2 m-0 -translate-y-1/2 select-none text-[3.25rem] font-extrabold leading-none tracking-tight text-ink/45">
        {title}
      </h2>
      <div aria-hidden="true" />
      <div className="min-w-0 justify-self-center">
        <TopBarSearch />
      </div>
      <div className="flex items-center gap-3 justify-self-end">
        <span className="hidden text-right leading-tight sm:block">
          <span className="block text-sm text-ink">{user.name}</span>
          <span className="block text-xs text-muted">{user.role}</span>
        </span>
        <Avatar initials={user.initials} />
      </div>
    </header>
  )
}
