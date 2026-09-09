interface MetricWidgetProps {
  /** The headline figure, pre-formatted (e.g. "114%"). */
  value: string
  /** Short label under the number (e.g. "net revenue retention"). */
  caption: string
}

// One-big-metric widget: a single oversized gradient number over a muted
// caption, centered in the card. The gradient runs mint → periwinkle and is an
// intentional off-token colour (widgets aren't bound to the design tokens).
export function MetricWidget({ value, caption }: MetricWidgetProps) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-2 text-center">
      <span className="bg-[linear-gradient(160deg,#5eead4_0%,#6f9bff_100%)] bg-clip-text text-6xl font-bold leading-none tracking-tight text-transparent">
        {value}
      </span>
      <span className="text-sm text-muted">{caption}</span>
    </div>
  )
}
