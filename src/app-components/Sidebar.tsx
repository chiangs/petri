import { useState } from 'react'
import type { Experiment } from '@/lib/types'
import { searchExperiments } from '@/lib/experiment-search'
import { SearchInput } from './SearchInput'
import { ThemeToggle } from './ThemeToggle'

const copy = {
  searchLabel: 'Search experiments',
  noMatches: (query: string) => `No experiments match “${query}”`,
} as const

interface SidebarProps {
  experiments: Experiment[]
  activeSlug: string | null
  onSelect: (slug: string) => void
}

const groups: { category: Experiment['category']; label: string }[] = [
  { category: 'component', label: 'Components' },
  { category: 'layout', label: 'Layouts' },
]

export function Sidebar({ experiments, activeSlug, onSelect }: SidebarProps) {
  const [query, setQuery] = useState('')

  const visible = searchExperiments(experiments, query)
  const noMatches = query.trim().length > 0 && visible.length === 0

  const sections = groups
    .map(({ category, label }) => ({
      label,
      items: visible.filter((e) => e.category === category),
    }))
    .filter((section) => section.items.length > 0)
    .map(({ label, items }) => (
      <li key={label} className="sidebar-group">
        <div className="sidebar-group-title">{label}</div>
        <ul className="sidebar-list">
          {items.map((experiment) => (
            <li key={experiment.slug}>
              <button
                className={
                  experiment.slug === activeSlug
                    ? 'sidebar-item sidebar-item--active'
                    : 'sidebar-item'
                }
                onClick={() => onSelect(experiment.slug)}
              >
                {experiment.title}
                {experiment.promoted ? (
                  <span className="sidebar-badge">promoted</span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      </li>
    ))

  const list = noMatches ? (
    <p className="sidebar-empty">{copy.noMatches(query.trim())}</p>
  ) : (
    <ul className="sidebar-groups">{sections}</ul>
  )

  return (
    <nav className="sidebar">
      <div className="sidebar-title">Petri</div>
      <div className="sidebar-theme">
        <ThemeToggle />
      </div>
      <div className="sidebar-search">
        <SearchInput
          id="sidebar-search"
          label={copy.searchLabel}
          value={query}
          onChange={setQuery}
        />
      </div>
      {list}
    </nav>
  )
}
