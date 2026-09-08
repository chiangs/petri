interface AvatarProps {
  initials: string
}

// Decorative — the user's name sits next to it in the top bar, so it carries no
// accessible label of its own.
export function Avatar({ initials }: AvatarProps) {
  return (
    <span
      aria-hidden="true"
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-sm font-medium text-ink"
    >
      {initials}
    </span>
  )
}
