import { useState } from 'react'
import type { Experiment } from '@/lib/types'
import { CodeBlock } from './CodeBlock'

interface ExperimentViewerProps {
  experiment: Experiment
}

type Tab = 'preview' | 'code'

const copy = {
  preview: 'Preview',
  code: 'Code',
  fileGroupLabel: 'Choose file',
} as const

// Dropdown <optgroup>s, in display order. `.tsx` files land in "Components",
// `.ts` in "Helpers", `.css` in "Styles".
const fileGroups = [
  { label: 'Components', match: (path: string) => path.endsWith('.tsx') },
  { label: 'Helpers', match: (path: string) => path.endsWith('.ts') },
  { label: 'Styles', match: (path: string) => path.endsWith('.css') },
] as const

const categoryLabel: Record<Experiment['category'], string> = {
  component: 'Component',
  layout: 'Layout',
}

export function ExperimentViewer({ experiment }: ExperimentViewerProps) {
  const [tab, setTab] = useState<Tab>('preview')
  const [filePath, setFilePath] = useState<string | null>(null)
  const { Component } = experiment

  const files = experiment.files
  // `?? files[0]` covers switching to an experiment that lacks the last-picked path.
  const selected = files.find((file) => file.path === filePath) ?? files[0]
  const codeLang = selected.path.endsWith('.css') ? 'css' : 'tsx'

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

  const groupedOptions = fileGroups
    .map((group) => ({
      label: group.label,
      files: files.filter((file) => group.match(file.path)),
    }))
    .filter((group) => group.files.length > 0)
    .map((group) => (
      <optgroup key={group.label} label={group.label}>
        {group.files.map((file) => (
          <option key={file.path} value={file.path}>
            {file.path}
          </option>
        ))}
      </optgroup>
    ))

  const fileSelect =
    tab === 'code' && files.length > 1 ? (
      <div className="file-select">
        <select
          aria-label={copy.fileGroupLabel}
          value={selected.path}
          onChange={(event) => setFilePath(event.target.value)}
        >
          {groupedOptions}
        </select>
      </div>
    ) : null

  // Keep the preview mounted while the Code tab is showing so each experiment's
  // control state survives tab toggles — just hide it.
  const codePanel =
    tab === 'code' ? (
      <CodeBlock code={selected.code} lang={codeLang} />
    ) : null
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

      {fileSelect}
      <div className="viewer-panel">{panel}</div>
    </div>
  )
}
