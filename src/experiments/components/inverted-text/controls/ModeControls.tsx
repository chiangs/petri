import type { ImageSource, Mode } from "../modes";
import { ColourSwatches } from "./ColourSwatches";
import { ImageSourceToggle } from "./ImageSourceToggle";
import { RangeControl } from "./RangeControl";
import { SegmentedButton } from "./SegmentedButton";

// All user-facing text for the control cluster.
const copy = {
  groupLabel: "Backdrop mode",
  modeLabels: {
    swirl: "Swirl",
    image: "Image",
    manual: "Dark → Light",
    colour: "Colour",
  } satisfies Record<Mode, string>,
  lightnessHint: "Dark → Light",
  lightnessLabel: "Backdrop lightness, dark to light",
  speedHint: "Slow → Fast",
  speedLabel: "Swirl speed, slow to fast",
} as const;

// Segmented-control order. `swirl` is the default "controls off" state.
const MODES: Mode[] = ["manual", "colour",  "image", "swirl"];

// Swirl speed is a percentage of the baseline loop length.
const SPEED_MIN = 20;
const SPEED_MAX = 200;

interface ModeControlsProps {
  mode: Mode;
  lightness: number;
  speed: number;
  imageSource: ImageSource;
  colour: string;
  onModeChange: (mode: Mode) => void;
  onLightnessChange: (lightness: number) => void;
  onSpeedChange: (speed: number) => void;
  onImageSourceChange: (source: ImageSource) => void;
  onColourChange: (colour: string) => void;
}

export function ModeControls({
  mode,
  lightness,
  speed,
  imageSource,
  colour,
  onModeChange,
  onLightnessChange,
  onSpeedChange,
  onImageSourceChange,
  onColourChange,
}: ModeControlsProps) {
  const modeButtons = MODES.map((value) => (
    <SegmentedButton
      key={value}
      label={copy.modeLabels[value]}
      isActive={value === mode}
      onSelect={() => onModeChange(value)}
    />
  ));

  // The trailing control is contextual to the active mode.
  let trailing = null;
  if (mode === "swirl") {
    trailing = (
      <RangeControl
        label={copy.speedHint}
        ariaLabel={copy.speedLabel}
        value={speed}
        min={SPEED_MIN}
        max={SPEED_MAX}
        step={5}
        onChange={onSpeedChange}
      />
    );
  } else if (mode === "image") {
    trailing = <ImageSourceToggle value={imageSource} onChange={onImageSourceChange} />;
  } else if (mode === "colour") {
    trailing = <ColourSwatches value={colour} onChange={onColourChange} />;
  } else if (mode === "manual") {
    trailing = (
      <RangeControl
        label={copy.lightnessHint}
        ariaLabel={copy.lightnessLabel}
        value={lightness}
        min={0}
        max={100}
        onChange={onLightnessChange}
      />
    );
  }

  return (
    <div className="flex min-h-9 flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2" role="group" aria-label={copy.groupLabel}>
        {modeButtons}
      </div>
      {trailing}
    </div>
  );
}
