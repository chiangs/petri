import { useState } from 'react'
import type { Experiment } from '@/lib/types'
import { CodeBlock } from './CodeBlock'

interface ExperimentViewerProps {
  experiment: Experiment
}

type Tab = 'preview' | 'code'
type SourceLang = 'tsx' | 'css'

const copy = {
  preview: 'Preview',
  code: 'Code',
  jsx: 'JSX',
  css: 'CSS',
  sourceGroupLabel: 'Choose source language',
} as const

const categoryLabel: Record<Experiment['category'], string> = {
  component: 'Component',
  layout: 'Layout',
}

export function ExperimentViewer({ experiment }: ExperimentViewerProps) {
  const [tab, setTab] = useState<Tab>('preview')
  const [sourceLang, setSourceLang] = useState<SourceLang>('tsx')
  const { Component } = experiment

  const hasCss = typeof experiment.css === 'string'
  const showCss = hasCss && sourceLang === 'css'
  const codeSource = showCss ? experiment.css! : experiment.source
  const codeLang = showCss ? 'css' : 'tsx'

  const categoryTag = (
    <li className="tag tag--category">{categoryLabel[experiment.category]}</li>
  )
  const extraTags = (experiment.tags ?? []).map((tag) => (
    <li key={tag} className="tag">
      {tag}
    </li>
  ))
  const tagList = (
    <ul className="tag-list">
      {categoryTag}
      {extraTags}
    </ul>
  )

  const description = experiment.description ? (
    <p>{experiment.description}</p>
  ) : null

  const langToggle =
    tab === 'code' && hasCss ? (
      <div
        className="lang-toggle"
        role="group"
        aria-label={copy.sourceGroupLabel}
      >
        <button
          type="button"
          className={
            sourceLang === 'tsx' ? 'lang-option lang-option--active' : 'lang-option'
          }
          aria-pressed={sourceLang === 'tsx'}
          onClick={() => setSourceLang('tsx')}
        >
          {copy.jsx}
        </button>
        <button
          type="button"
          className={
            sourceLang === 'css' ? 'lang-option lang-option--active' : 'lang-option'
          }
          aria-pressed={sourceLang === 'css'}
          onClick={() => setSourceLang('css')}
        >
          {copy.css}
        </button>
      </div>
    ) : null

  // Keep the preview mounted while the Code tab is showing so each experiment's
  // control state survives tab toggles — just hide it.
  const codePanel =
    tab === 'code' ? <CodeBlock code={codeSource} lang={codeLang} /> : null
  const panel = (
    <>
      <div className="preview-stage" hidden={tab !== 'preview'}>
        <Component />
      </div>
      {codePanel}
    </>
  )

  return (
    <div className="viewer">
      <header className="viewer-header">
        <h2>{experiment.title}</h2>
        {description}
        {tagList}
      </header>

      <div className="viewer-tabs">
        <button
          className={tab === 'preview' ? 'tab tab--active' : 'tab'}
          onClick={() => setTab('preview')}
        >
          {copy.preview}
        </button>
        <button
          className={tab === 'code' ? 'tab tab--active' : 'tab'}
          onClick={() => setTab('code')}
        >
          {copy.code}
        </button>
      </div>

      {langToggle}
      <div className="viewer-panel">{panel}</div>
    </div>
  )
}
