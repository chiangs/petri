interface BarListRowProps {
  label: string
  /** This row's value, in the same unit as the others. */
  value: number
  /** Largest value in the list — the full-width bar. */
  max: number
}

// One labelled bar in BarListWidget. Track uses the themeable border token; the
// fill is an off-token mint→periwinkle gradient (see README).
export function BarListRow({ label, value, max }: BarListRowProps) {
  const pct = max > 0 ? (value / max) * 100 : 0

  return (
    <div className="flex items-center gap-2 text-xs">
      <span className="w-24 shrink-0 truncate text-muted">{label}</span>
      <span className="relative h-2 flex-1 overflow-hidden rounded-full bg-border">
        <span
          className="absolute inset-y-0 left-0 rounded-full bg-[linear-gradient(90deg,#5eead4,#6f9bff)]"
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="w-8 shrink-0 text-right tabular-nums text-ink">{value}%</span>
    </div>
  )
}
