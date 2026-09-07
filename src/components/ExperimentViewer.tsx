import { useState } from 'react'
import type { Experiment } from '../lib/types'
import { CodeBlock } from './CodeBlock'

interface ExperimentViewerProps {
  experiment: Experiment
}

type Tab = 'preview' | 'code'

export function ExperimentViewer({ experiment }: ExperimentViewerProps) {
  const [tab, setTab] = useState<Tab>('preview')
  const { Component } = experiment

  return (
    <div className="viewer">
      <header className="viewer-header">
        <h2>{experiment.title}</h2>
        {experiment.description && <p>{experiment.description}</p>}
        {experiment.tags && experiment.tags.length > 0 && (
          <ul className="tag-list">
            {experiment.tags.map((tag) => (
              <li key={tag} className="tag">
                {tag}
              </li>
            ))}
          </ul>
        )}
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

      <div className="viewer-panel">
        {tab === 'preview' ? (
          <div className="preview-stage">
            <Component />
          </div>
        ) : (
          <CodeBlock code={experiment.source} />
        )}
      </div>
    </div>
  )
}
