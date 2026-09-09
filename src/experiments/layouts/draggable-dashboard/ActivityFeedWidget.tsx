import { ActivityItem } from './ActivityItem'
import { RECENT_ACTIVITY } from './dashboard-data'

const copy = {
  feedLabel: 'Recent activity',
} as const

// Widget E: a short feed of mock recent events. Real text content, so it uses
// the ink/muted tokens for AA contrast; only the status dots are off-token.
export function ActivityFeedWidget() {
  const items = RECENT_ACTIVITY.map((event) => (
    <ActivityItem
      key={event.text}
      text={event.text}
      time={event.time}
      status={event.status}
    />
  ))

  return (
    <ul aria-label={copy.feedLabel} className="flex h-full flex-col gap-2 overflow-hidden">
      {items}
    </ul>
  )
}
