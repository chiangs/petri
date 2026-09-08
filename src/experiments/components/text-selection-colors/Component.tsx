import { useState } from "react";
import { PALETTE, readableTextOn } from "./palette";
import { PlainText } from "./PlainText";
import { SelectionText } from "./SelectionText";
import { SwatchPicker } from "./SwatchPicker";
import { TypographyControls } from "./controls/TypographyControls";

// All user-facing text for this experiment, in one place.
const copy = {
  hint: "Select text in either box — only the first follows the swatch; the second keeps the browser default.",
} as const;

export default function Component() {
  const [color, setColor] = useState(PALETTE[0].value);
  const [fontSize, setFontSize] = useState(20);
  const [lineHeight, setLineHeight] = useState(1.6);

  const foreground = readableTextOn(color);

  return (
    <div className="w-full space-y-8">
      <SelectionText
        fontSize={fontSize}
        lineHeight={lineHeight}
        background={color}
        foreground={foreground}
      />

      <PlainText />

      <p className="text-sm text-muted">{copy.hint}</p>

      <SwatchPicker colors={PALETTE} value={color} onChange={setColor} />

      <TypographyControls
        fontSize={fontSize}
        lineHeight={lineHeight}
        onFontSizeChange={setFontSize}
        onLineHeightChange={setLineHeight}
      />
    </div>
  );
}
