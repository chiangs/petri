const copy = {
  aboutLabel: 'About Petri',
} as const

interface AboutButtonProps {
  onClick: () => void
}

// Sits in the sidebar title row, right of the wordmark. Reopens the About dialog
// after the first-visit auto-open has been dismissed.
export function AboutButton({ onClick }: AboutButtonProps) {
  return (
    <button
      type="button"
      aria-label={copy.aboutLabel}
      onClick={onClick}
      className="about-button"
    >
      <svg viewBox="0 0 16 16" width="18" height="18" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="6.25" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 7.25v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="8" cy="4.75" r="0.9" fill="currentColor" />
      </svg>
    </button>
  )
}
