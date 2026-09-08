// Preset highlight colours and the contrast helper for this experiment.
// Component-free so Fast Refresh stays happy.

export interface HighlightColor {
  name: string;
  /** #rrggbb — the value passed straight into `::selection { background }`. */
  value: string;
}

export const PALETTE: HighlightColor[] = [
  { name: "Yellow", value: "#fde79b" },
  { name: "Mint", value: "#b8ecd0" },
  { name: "Lavender", value: "#e0d0f7" },
  { name: "Peach", value: "#fbd8c3" },
];

const INK = "#0f172a";
const WHITE = "#ffffff";

/**
 * Pick a readable text colour for selected text sitting on `hex`.
 * YIQ brightness: dark ink on light backgrounds, white on dark ones.
 */
export function readableTextOn(hex: string): string {
  const normalized = hex.replace("#", "");
  const r = parseInt(normalized.slice(0, 2), 16);
  const g = parseInt(normalized.slice(2, 4), 16);
  const b = parseInt(normalized.slice(4, 6), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness >= 128 ? INK : WHITE;
}
