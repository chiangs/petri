import { NAV_ACCENT } from './nav-accent'

interface LogoProps {
  name: string
}

// A north pointer riding two wind gusts — "northward wind".
export function Logo({ name }: LogoProps) {
  return (
    <div className="flex items-center gap-2 px-2 py-1">
      <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
        <path d="M12 2l4.6 9.2L12 8.7 7.4 11.2z" fill={NAV_ACCENT} />
        <path
          d="M3 15.4c3.2 0 4.3-1.9 7.5-1.9s4.3 1.9 7.5 1.9"
          fill="none"
          stroke={NAV_ACCENT}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.85"
        />
        <path
          d="M5 19.4c2.4 0 3.3-1.5 5.7-1.5s3.3 1.5 5.7 1.5"
          fill="none"
          stroke={NAV_ACCENT}
          strokeWidth="1.8"
          strokeLinecap="round"
          opacity="0.5"
        />
      </svg>
      <span className="text-sm font-semibold text-ink">{name}</span>
    </div>
  )
}
