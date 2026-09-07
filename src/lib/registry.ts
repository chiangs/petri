import type { ComponentType } from 'react'
import type { Experiment, ExperimentMeta } from './types'

// Convention: src/experiments/<category>/<slug>/Component.tsx + meta.ts
// `_template/` sits one level up, so the category globs never match it.
const componentModules = import.meta.glob<{ default: ComponentType }>(
  '/src/experiments/components/*/Component.tsx',
  { eager: true },
)
const layoutModules = import.meta.glob<{ default: ComponentType }>(
  '/src/experiments/layouts/*/Component.tsx',
  { eager: true },
)

const componentSources = import.meta.glob<string>(
  '/src/experiments/components/*/Component.tsx',
  { eager: true, query: '?raw', import: 'default' },
)
const layoutSources = import.meta.glob<string>(
  '/src/experiments/layouts/*/Component.tsx',
  { eager: true, query: '?raw', import: 'default' },
)

// Optional per-experiment stylesheet — powers the JSX/CSS toggle in the viewer.
const styleSources = import.meta.glob<string>(
  '/src/experiments/*/*/styles.css',
  { eager: true, query: '?raw', import: 'default' },
)

const metas = import.meta.glob<{ default: ExperimentMeta }>(
  '/src/experiments/*/*/meta.ts',
  { eager: true },
)

function parsePath(path: string): { category: Experiment['category']; slug: string } {
  const match = path.match(/\/experiments\/(components|layouts)\/([^/]+)\//)
  if (!match) throw new Error(`Could not derive category/slug from path: ${path}`)
  return { category: match[1] === 'layouts' ? 'layout' : 'component', slug: match[2] }
}

function collect(
  modules: Record<string, { default: ComponentType }>,
  sources: Record<string, string>,
): Experiment[] {
  return Object.entries(modules).map(([path, mod]) => {
    const { category, slug } = parsePath(path)
    const dir = category === 'layout' ? 'layouts' : 'components'
    const meta = metas[`/src/experiments/${dir}/${slug}/meta.ts`]?.default
    if (!meta) {
      throw new Error(`Missing meta.ts for experiment "${dir}/${slug}"`)
    }
    return {
      slug,
      category,
      Component: mod.default,
      source: sources[path],
      css: styleSources[`/src/experiments/${dir}/${slug}/styles.css`],
      ...meta,
    }
  })
}

export const experiments: Experiment[] = [
  ...collect(componentModules, componentSources),
  ...collect(layoutModules, layoutSources),
].sort(
  (a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
)
