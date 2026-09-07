import type { NavLinkData } from "./hero-data";
import { NavLink } from "./NavLink";

const copy = {
  logo: "Rago",
} as const;

interface NavBarProps {
  links: NavLinkData[];
}

export function NavBar({ links }: NavBarProps) {
  const navLinks = links.map((link) => <NavLink key={link.id} label={link.label} />);

  return (
    <div className="flex items-center justify-between px-6 py-4 sm:px-8">
      <span className="text-lg font-semibold tracking-wide text-white">{copy.logo}</span>
      <nav className="flex items-center gap-1 sm:gap-2">{navLinks}</nav>
    </div>
  );
}
