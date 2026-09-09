import type { ActivityStatus } from './dashboard-data'

interface ActivityItemProps {
  text: string
  /** Relative timestamp, already formatted (e.g. "2m"). */
  time: string
  status: ActivityStatus
}

// Off-token status colours — decorative only (aria-hidden dot); the event text
// carries the meaning, so this isn't colour-alone.
const dotColor: Record<ActivityStatus, string> = {
  ok: '#34d399',
  warn: '#fbbf24',
  info: '#60a5fa',
}

export function ActivityItem({ text, time, status }: ActivityItemProps) {
  return (
    <li className="flex items-start gap-2">
      <span
        aria-hidden="true"
        className="mt-1 h-2 w-2 shrink-0 rounded-full"
        style={{ backgroundColor: dotColor[status] }}
      />
      <span className="min-w-0 flex-1 truncate text-xs text-ink">{text}</span>
      <span className="shrink-0 text-xs tabular-nums text-muted">{time}</span>
    </li>
  )
}
