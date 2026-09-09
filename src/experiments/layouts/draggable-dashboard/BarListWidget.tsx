import { BarListRow } from './BarListRow'
import { CHANNEL_SHARE } from './dashboard-data'

// Widget C: a ranked horizontal-bar list. Static prototype data from
// dashboard-data; bars scale to the largest value.
export function BarListWidget() {
  const max = Math.max(...CHANNEL_SHARE.map((item) => item.value))
  const rows = CHANNEL_SHARE.map((item) => (
    <BarListRow key={item.label} label={item.label} value={item.value} max={max} />
  ))

  return <div className="flex h-full flex-col justify-center gap-3">{rows}</div>
}
