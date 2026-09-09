import type { ComponentType } from 'react'

export interface ExperimentMeta {
  title: string
  description?: string
  tags?: string[]
  /** Rough scale of the idea — used for sorting/badging in the gallery. */
  complexity?: 'simple' | 'complex'
  /**
   * Set true only when this experiment is a thin demo left behind after its
   * piece was promoted to `src/dev-ready/`. Marks the sidebar entry as promoted.
   */
  promoted?: boolean
}

/** One source file from an experiment folder, shown in the viewer's Code tab. */
export interface ExperimentFile {
  /** Path relative to the experiment folder, e.g. `Component.tsx` or `heroes/cat/CatHero.tsx`. */
  path: string
  code: string
}

export interface Experiment extends ExperimentMeta {
  slug: string
  /** Which section of the gallery it belongs to, derived from the folder. */
  category: 'component' | 'layout'
  Component: ComponentType
  /** Every `.tsx`/`.ts`/`.css` in the folder except `meta.ts` and `controls/`. */
  files: ExperimentFile[]
}
