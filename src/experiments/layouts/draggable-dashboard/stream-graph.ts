// Geometry for Widget D's streamgraph. Kept out of the .tsx so Fast Refresh
// stays happy. The figures are made up — five related sub-metrics over nine
// time buckets, no data source.

interface Stream {
  label: string
  values: number[]
}

const STREAMS: Stream[] = [
  { label: 'API', values: [4, 5, 6, 5, 7, 8, 7, 9, 8] },
  { label: 'Web', values: [8, 7, 9, 11, 10, 12, 13, 12, 14] },
  { label: 'Mobile', values: [3, 4, 4, 6, 7, 6, 8, 9, 11] },
  { label: 'Batch', values: [6, 6, 5, 4, 5, 4, 3, 4, 3] },
  { label: 'Partner', values: [2, 3, 3, 4, 3, 5, 6, 5, 7] },
]

// Off-token mint→periwinkle ramp, tying the graph to MetricWidget's gradient.
export const STREAM_COLORS = ['#5eead4', '#62d6df', '#66c3ea', '#6bb0f4', '#6f9bff']

export const STREAM_VIEWBOX = { width: 240, height: 120 }

type Point = [number, number]

// Catmull-Rom → cubic Bézier through the points, emitted as `C` commands. The
// current point must already be points[0].
// ponytail: fixed tension (1/6); no monotonicity guard — fine for a decorative
// band, revisit if a real dataset makes it overshoot.
function spline(points: Point[]): string {
  let d = ''
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] ?? points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] ?? p2
    const c1x = p1[0] + (p2[0] - p0[0]) / 6
    const c1y = p1[1] + (p2[1] - p0[1]) / 6
    const c2x = p2[0] - (p3[0] - p1[0]) / 6
    const c2y = p2[1] - (p3[1] - p1[1]) / 6
    d += ` C ${c1x} ${c1y} ${c2x} ${c2y} ${p2[0]} ${p2[1]}`
  }
  return d
}

// One filled `d` string per stream, stacked around a centred baseline
// (symmetric silhouette).
export function buildStreamPaths(width: number, height: number): string[] {
  const steps = STREAMS[0].values.length
  const dx = width / (steps - 1)
  const totals = STREAMS[0].values.map((_, i) =>
    STREAMS.reduce((sum, s) => sum + s.values[i], 0),
  )
  const scale = (height * 0.92) / Math.max(...totals)
  const center = height / 2

  let cumulative = STREAMS[0].values.map(() => 0)

  return STREAMS.map((stream) => {
    const top: Point[] = stream.values.map((_, i) => {
      const base = center - (totals[i] * scale) / 2 + cumulative[i] * scale
      return [i * dx, base]
    })
    const bottom: Point[] = stream.values.map((value, i) => {
      const base =
        center - (totals[i] * scale) / 2 + (cumulative[i] + value) * scale
      return [i * dx, base]
    })
    cumulative = cumulative.map((c, i) => c + stream.values[i])

    const bottomReversed = [...bottom].reverse()
    return (
      `M ${top[0][0]} ${top[0][1]}` +
      spline(top) +
      ` L ${bottomReversed[0][0]} ${bottomReversed[0][1]}` +
      spline(bottomReversed) +
      ' Z'
    )
  })
}

export const STREAM_PATHS = buildStreamPaths(STREAM_VIEWBOX.width, STREAM_VIEWBOX.height)
