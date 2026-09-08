// A reference box with no `::selection` rule — it keeps the browser default
// highlight and is unaffected by the swatch picker.

// All user-facing text for this component, in one place.
const copy = {
  caption: "Default browser highlight",
  paragraph:
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor " +
    "incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud " +
    "exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
} as const;

export function PlainText() {
  return (
    <div className="rounded-card border border-border bg-white p-8">
      <p className="mb-3 text-xs font-semibold tracking-wide text-neutral-500 uppercase">
        {copy.caption}
      </p>
      <p className="max-w-prose text-lg text-neutral-900" style={{ lineHeight: 1.6 }}>
        {copy.paragraph}
      </p>
    </div>
  );
}
