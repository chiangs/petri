interface NavLinkProps {
  label: string;
}

/** A mocked nav link — visually real, but doesn't navigate anywhere. */
export function NavLink({ label }: NavLinkProps) {
  return (
    <a
      href="#"
      onClick={(event) => event.preventDefault()}
      className="rounded-control px-2 py-1 text-sm font-medium text-white/80 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
    >
      {label}
    </a>
  );
}
