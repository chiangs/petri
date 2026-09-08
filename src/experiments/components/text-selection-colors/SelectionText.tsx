import type { CSSProperties } from "react";

// All user-facing text for this component, in one place.
const copy = {
  caption: "Custom ::selection highlight",
  heading: "Lorem ipsum",
  paragraph:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
    "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud " +
    "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure " +
    "dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
} as const;

export interface SelectionTextProps {
  fontSize: number;
  lineHeight: number;
  background: string;
  foreground: string;
}

// `::selection` can't be set via inline style, so we generate a scoped rule and
// drop it in a <style> tag. One instance on the page, so a fixed class is fine.
export function SelectionText({
  fontSize,
  lineHeight,
  background,
  foreground,
}: SelectionTextProps) {
  const selectionCss = `.selection-demo ::selection { background: ${background}; color: ${foreground}; }`;
  const paragraphStyle: CSSProperties = { fontSize: `${fontSize}px`, lineHeight };

  return (
    <div className="selection-demo rounded-card border border-border bg-surface p-8">
      <style>{selectionCss}</style>
      <p className="mb-3 text-xs font-semibold tracking-wide text-muted uppercase">
        {copy.caption}
      </p>
      <h2 className="mb-4 font-serif text-5xl font-semibold tracking-tight text-ink">
        {copy.heading}
      </h2>
      <p className="max-w-prose text-ink" style={paragraphStyle}>
        {copy.paragraph}
      </p>
    </div>
  );
}
