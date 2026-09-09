import { STREAM_COLORS, STREAM_PATHS, STREAM_VIEWBOX } from './stream-graph'

// Widget D: a decorative streamgraph of five related sub-metrics. Static SVG,
// geometry precomputed in stream-graph.ts; hidden from assistive tech.
export function StreamGraphWidget() {
  const bands = STREAM_PATHS.map((d, i) => (
    <path key={STREAM_COLORS[i]} d={d} fill={STREAM_COLORS[i]} />
  ))

  return (
    <svg
      viewBox={`0 0 ${STREAM_VIEWBOX.width} ${STREAM_VIEWBOX.height}`}
      className="block h-full w-full"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {bands}
    </svg>
  )
}
