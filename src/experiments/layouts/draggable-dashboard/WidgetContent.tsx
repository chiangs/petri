import { MetricWidget } from './MetricWidget'
import { RETENTION_METRIC } from './dashboard-data'

// Maps a widget id to its rendered body. Widgets are built one at a time; ids
// without a real body yet fall through to an empty card (the Step 1 placeholder).
export function WidgetContent({ id }: { id: string }) {
  if (id === 'a') {
    return (
      <MetricWidget value={RETENTION_METRIC.value} caption={RETENTION_METRIC.caption} />
    )
  }
  return null
}
