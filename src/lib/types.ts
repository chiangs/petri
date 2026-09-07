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

export interface Experiment extends ExperimentMeta {
  slug: string
  /** Which section of the gallery it belongs to, derived from the folder. */
  category: 'component' | 'layout'
  Component: ComponentType
  source: string
}
