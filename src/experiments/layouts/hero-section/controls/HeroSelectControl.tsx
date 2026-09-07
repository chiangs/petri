import { HEROES, type HeroId } from "../hero-data";
import { SegmentedControl } from "./SegmentedControl";

const copy = {
  groupLabel: "Hero image",
} as const;

const HERO_OPTIONS = HEROES.map((hero) => ({ value: hero.id, label: hero.label }));

interface HeroSelectControlProps {
  value: HeroId;
  onChange: (id: HeroId) => void;
}

export function HeroSelectControl({ value, onChange }: HeroSelectControlProps) {
  return (
    <SegmentedControl
      legend={copy.groupLabel}
      options={HERO_OPTIONS}
      value={value}
      onChange={onChange}
    />
  );
}
