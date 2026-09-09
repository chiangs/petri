interface GraphNodeProps {
  x: number
  y: number
  /** Accent nodes get the mint→periwinkle gradient fill plus a soft halo. */
  accent: boolean
}

// One dot in the NodeGraphWidget constellation. `#node-graph-accent` is the
// gradient defined once in NodeGraphWidget's <defs>.
export function GraphNode({ x, y, accent }: GraphNodeProps) {
  const fill = accent ? 'url(#node-graph-accent)' : '#8b94a7'
  const radius = accent ? 6 : 4
  const halo = accent ? <circle cx={x} cy={y} r={13} fill="#5eead4" opacity={0.16} /> : null

  return (
    <g>
      {halo}
      <circle cx={x} cy={y} r={radius} fill={fill} />
    </g>
  )
}
