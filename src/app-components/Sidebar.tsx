import type { Experiment } from '@/lib/types'
import { ThemeToggle } from './ThemeToggle'

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
  const sections = groups
    .map(({ category, label }) => ({
      label,
      items: experiments.filter((e) => e.category === category),
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

  return (
    <nav className="sidebar">
      <div className="sidebar-title">Petri</div>
      <ul className="sidebar-groups">{sections}</ul>
      <div className="sidebar-footer">
        <ThemeToggle />
      </div>
    </nav>
  )
}
