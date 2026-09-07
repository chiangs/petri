import { ColourSwatch } from "./ColourSwatch";
import { PALETTE } from "./palette";

// All user-facing text this component renders.
const copy = {
  groupLabel: "Backdrop colour",
} as const;

interface ColourSwatchesProps {
  value: string;
  onChange: (value: string) => void;
}

/** The row of flat-colour swatches shown when `colour` mode is active. */
export function ColourSwatches({ value, onChange }: ColourSwatchesProps) {
  const swatches = PALETTE.map(({ name, value: swatch }) => (
    <ColourSwatch
      key={name}
      name={name}
      value={swatch}
      isActive={swatch === value}
      onSelect={onChange}
    />
  ));

  return (
    <div className="flex items-center gap-2" role="group" aria-label={copy.groupLabel}>
      {swatches}
    </div>
  );
}
