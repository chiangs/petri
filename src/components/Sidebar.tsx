import type { Experiment } from '../lib/types'

interface SidebarProps {
  experiments: Experiment[]
  activeSlug: string | null
  onSelect: (slug: string) => void
}

export function Sidebar({ experiments, activeSlug, onSelect }: SidebarProps) {
  return (
    <nav className="sidebar">
      <div className="sidebar-title">petri</div>
      <ul className="sidebar-list">
        {experiments.map((experiment) => (
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
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
