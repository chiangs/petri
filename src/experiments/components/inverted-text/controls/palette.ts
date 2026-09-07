/** A named flat backdrop colour for the `colour` mode. */
export interface Swatch {
  name: string;
  value: string;
}

/** The swatches offered on the right when `colour` mode is active. */
export const PALETTE: Swatch[] = [
  { name: "Blue", value: "hsl(224 100% 52%)" },
  { name: "Cyan", value: "hsl(188 100% 44%)" },
  { name: "Green", value: "hsl(148 92% 40%)" },
  { name: "Orange", value: "hsl(28 100% 50%)" },
  { name: "Red", value: "hsl(2 88% 52%)" },
  { name: "Magenta", value: "hsl(320 100% 50%)" },
];

export const DEFAULT_COLOUR = PALETTE[0].value;
