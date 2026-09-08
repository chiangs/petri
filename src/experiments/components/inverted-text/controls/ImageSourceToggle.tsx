import type { ImageSource } from "../modes";
import { SegmentedButton } from "./SegmentedButton";

// All user-facing text this component renders.
const copy = {
  groupLabel: "Image source",
  labels: {
    illustration: "Illustration",
    photo: "Photo",
  } satisfies Record<ImageSource, string>,
} as const;

const SOURCES: ImageSource[] = ["illustration", "photo"];

interface ImageSourceToggleProps {
  value: ImageSource;
  onChange: (source: ImageSource) => void;
}

/** Swap the Image backdrop between the drawn SVG and the bundled photograph. */
export function ImageSourceToggle({ value, onChange }: ImageSourceToggleProps) {
  const buttons = SOURCES.map((source) => (
    <SegmentedButton
      key={source}
      size="sm"
      label={copy.labels[source]}
      isActive={source === value}
      onSelect={() => onChange(source)}
    />
  ));

  return (
    <div className="flex items-center gap-2" role="group" aria-label={copy.groupLabel}>
      {buttons}
    </div>
  );
}
