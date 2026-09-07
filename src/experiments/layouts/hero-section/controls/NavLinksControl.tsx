import type { NavLinkData } from "../hero-data";
import { NavLinkRow } from "./NavLinkRow";

const copy = {
  groupLabel: "Navigation links",
} as const;

interface NavLinksControlProps {
  links: NavLinkData[];
  onLabelChange: (id: string, label: string) => void;
  onMoveUp: (id: string) => void;
  onMoveDown: (id: string) => void;
}

export function NavLinksControl({ links, onLabelChange, onMoveUp, onMoveDown }: NavLinksControlProps) {
  const rows = links.map((link, index) => (
    <NavLinkRow
      key={link.id}
      index={index}
      label={link.label}
      canMoveUp={index > 0}
      canMoveDown={index < links.length - 1}
      onLabelChange={(value) => onLabelChange(link.id, value)}
      onMoveUp={() => onMoveUp(link.id)}
      onMoveDown={() => onMoveDown(link.id)}
    />
  ));

  return (
    <div role="group" aria-label={copy.groupLabel} className="flex flex-col gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-muted">{copy.groupLabel}</span>
      {rows}
    </div>
  );
}
