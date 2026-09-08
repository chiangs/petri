import type { ReactNode } from 'react'

interface DashboardShellProps {
  sidebar: ReactNode
  topBar: ReactNode
  children: ReactNode
}

// The enterprise-app frame: fixed nav rail on the left, top bar + scrollable
// content column on the right. The draggable canvas is the content.
export function DashboardShell({ sidebar, topBar, children }: DashboardShellProps) {
  return (
    <div className="flex w-full overflow-hidden rounded-card border border-border bg-bg">
      {sidebar}
      <div className="flex min-w-0 flex-1 flex-col">
        {topBar}
        <div className="min-w-0 flex-1 p-4">{children}</div>
      </div>
    </div>
  )
}
