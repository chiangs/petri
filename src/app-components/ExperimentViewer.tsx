import { useState } from 'react'
import type { Experiment } from '@/lib/types'
import { CodeBlock } from './CodeBlock'

interface ExperimentViewerProps {
  experiment: Experiment
}

type Tab = 'preview' | 'code'

const categoryLabel: Record<Experiment['category'], string> = {
  component: 'Component',
  layout: 'Layout',
}

export function ExperimentViewer({ experiment }: ExperimentViewerProps) {
  const [tab, setTab] = useState<Tab>('preview')
  const { Component } = experiment

  const hasTags = experiment.tags && experiment.tags.length > 0
  const tagList = hasTags ? (
    <ul className="tag-list">
      <li className="tag tag--category">{categoryLabel[experiment.category]}</li>
      {experiment.tags!.map((tag) => (
        <li key={tag} className="tag">
          {tag}
        </li>
      ))}
    </ul>
  ) : (
    <ul className="tag-list">
      <li className="tag tag--category">{categoryLabel[experiment.category]}</li>
    </ul>
  )

  const panel =
    tab === 'preview' ? (
      <div className="preview-stage">
        <Component />
      </div>
    ) : (
      <CodeBlock code={experiment.source} />
    )

  return (
    <div className="viewer">
      <header className="viewer-header">
        <h2>{experiment.title}</h2>
        {experiment.description && <p>{experiment.description}</p>}
        {tagList}
      </header>

      <div className="viewer-tabs">
        <button
          className={tab === 'preview' ? 'tab tab--active' : 'tab'}
          onClick={() => setTab('preview')}
        >
          Preview
        </button>
        <button
          className={tab === 'code' ? 'tab tab--active' : 'tab'}
          onClick={() => setTab('code')}
        >
          Code
        </button>
      </div>

      <div className="viewer-panel">{panel}</div>
    </div>
  )
}
