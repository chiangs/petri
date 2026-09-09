import type { ComponentType } from 'react'
import type { Experiment, ExperimentFile, ExperimentMeta } from './types'

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

// Every source file in every experiment folder — powers the viewer's Code tab.
// `meta.ts` and `controls/` are filtered out in `filesFor`.
const rawFiles = import.meta.glob<string>(
  [
    '/src/experiments/components/**/*.{tsx,ts,css}',
    '/src/experiments/layouts/**/*.{tsx,ts,css}',
  ],
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

function filesFor(category: Experiment['category'], slug: string): ExperimentFile[] {
  const dir = category === 'layout' ? 'layouts' : 'components'
  const prefix = `/src/experiments/${dir}/${slug}/`
  return Object.entries(rawFiles)
    .filter(([path]) => path.startsWith(prefix))
    .map(([path, code]) => ({ path: path.slice(prefix.length), code }))
    .filter(({ path }) => path !== 'meta.ts' && !path.startsWith('controls/'))
    .sort((a, b) => {
      if (a.path === 'Component.tsx') return -1
      if (b.path === 'Component.tsx') return 1
      return a.path.localeCompare(b.path)
    })
}

function collect(modules: Record<string, { default: ComponentType }>): Experiment[] {
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
      files: filesFor(category, slug),
      ...meta,
    }
  })
}

export const experiments: Experiment[] = [
  ...collect(componentModules),
  ...collect(layoutModules),
].sort(
  (a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title),
)
