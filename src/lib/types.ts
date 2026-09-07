import type { ComponentType } from 'react'

export interface ExperimentMeta {
  title: string
  description?: string
  tags?: string[]
}

export interface Experiment extends ExperimentMeta {
  slug: string
  Component: ComponentType
  source: string
}
