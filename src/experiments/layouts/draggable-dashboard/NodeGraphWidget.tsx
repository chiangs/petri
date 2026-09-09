import { GraphNode } from './GraphNode'

// A purely decorative node constellation — a static, hand-placed SVG, no data
// behind it. Coordinates live in a 240×240 space; the <svg> scales to the card.
// Off-token colours on purpose (see README): cool-grey edges/nodes with two
// mint→periwinkle accent nodes tying it to the MetricWidget gradient.

interface GraphNodeDef {
  id: string
  x: number
  y: number
  accent?: boolean
}

const NODES: GraphNodeDef[] = [
  { id: 'a', x: 38, y: 66 },
  { id: 'b', x: 96, y: 32 },
  { id: 'c', x: 138, y: 92, accent: true },
  { id: 'd', x: 58, y: 128 },
  { id: 'e', x: 40, y: 198 },
  { id: 'f', x: 108, y: 176 },
  { id: 'g', x: 182, y: 138, accent: true },
  { id: 'h', x: 202, y: 66 },
  { id: 'i', x: 158, y: 208 },
]

const EDGES: [string, string][] = [
  ['a', 'b'], ['a', 'd'], ['b', 'c'], ['b', 'h'], ['c', 'd'], ['c', 'f'],
  ['c', 'g'], ['d', 'e'], ['e', 'f'], ['f', 'i'], ['f', 'g'], ['g', 'h'], ['g', 'i'],
]

const nodeById = new Map(NODES.map((node) => [node.id, node]))

export function NodeGraphWidget() {
  const edgeLines = EDGES.map(([from, to]) => {
    const a = nodeById.get(from)!
    const b = nodeById.get(to)!
    return (
      <line
        key={`${from}-${to}`}
        x1={a.x}
        y1={a.y}
        x2={b.x}
        y2={b.y}
        stroke="#5b6472"
        strokeWidth={1}
        strokeOpacity={0.7}
      />
    )
  })

  const nodeDots = NODES.map((node) => (
    <GraphNode key={node.id} x={node.x} y={node.y} accent={node.accent ?? false} />
  ))

  return (
    <svg
      viewBox="0 0 240 240"
      className="block h-full w-full"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="node-graph-accent" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5eead4" />
          <stop offset="1" stopColor="#6f9bff" />
        </linearGradient>
      </defs>
      {edgeLines}
      {nodeDots}
    </svg>
  )
}
