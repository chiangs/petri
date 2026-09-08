interface LogoProps {
  name: string
}

export function Logo({ name }: LogoProps) {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="6" className="fill-brand-500/20" />
        <path
          d="M7 16V8l5 5 5-5v8"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-ink"
        />
      </svg>
      <span className="text-sm font-semibold text-ink">{name}</span>
    </div>
  )
}
