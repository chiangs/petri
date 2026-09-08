import type { NavIconId } from './dashboard-data'

// Small stroked glyphs for the nav — decorative, the label carries the meaning.
const PATHS: Record<NavIconId, string> = {
  overview: 'M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z',
  reports: 'M5 19V11M12 19V5M19 19v-6',
  customers: 'M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM4 20c0-3 2.5-5 5-5s5 2 5 5M16 14c2 0 4 2 4 5',
  revenue: 'M12 4v16M8 8h5a2 2 0 0 1 0 4H9a2 2 0 0 0 0 4h6',
  settings: 'M6 8h12M6 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0zM10 16h12M10 16a2 2 0 1 0-4 0 2 2 0 0 0 4 0z',
}

interface NavIconProps {
  id: NavIconId
}

export function NavIcon({ id }: NavIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="shrink-0"
    >
      <path d={PATHS[id]} />
    </svg>
  )
}
