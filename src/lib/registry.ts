import type { ComponentType } from 'react'
import type { Experiment, ExperimentMeta } from './types'

// Convention: src/experiments/<slug>/Component.tsx + meta.ts
const components = import.meta.glob<{ default: ComponentType }>(
  '/src/experiments/*/Component.tsx',
  { eager: true },
)
const sources = import.meta.glob<string>('/src/experiments/*/Component.tsx', {
  eager: true,
  query: '?raw',
  import: 'default',
})
const metas = import.meta.glob<{ default: ExperimentMeta }>(
  '/src/experiments/*/meta.ts',
  { eager: true },
)

function slugFromPath(path: string): string {
  const match = path.match(/\/experiments\/([^/]+)\//)
  if (!match) throw new Error(`Could not derive slug from path: ${path}`)
  return match[1]
}

export const experiments: Experiment[] = Object.entries(components)
  .map(([path, mod]) => {
    const slug = slugFromPath(path)
    const metaPath = `/src/experiments/${slug}/meta.ts`
    const meta = metas[metaPath]?.default
    if (!meta) {
      throw new Error(`Missing meta.ts for experiment "${slug}"`)
    }
    return {
      slug,
      Component: mod.default,
      source: sources[path],
      ...meta,
    }
  })
  .sort((a, b) => a.title.localeCompare(b.title))
