import { useState } from "react";
import { FloatingLabelControls } from "./controls/FloatingLabelControls";
import { FloatingLabelInput, type InputType } from "./FloatingLabelInput";

const copy = {
  label: "Label",
} as const;

const INPUT_TYPE_DEFAULT: InputType = "text";
const RADIUS_DEFAULT = 24;

export default function Component() {
  const [inputType, setInputType] = useState<InputType>(INPUT_TYPE_DEFAULT);
  const [radius, setRadius] = useState(RADIUS_DEFAULT);

  return (
    <div className="w-full space-y-6">
      <FloatingLabelControls
        inputType={inputType}
        radius={radius}
        onInputTypeChange={setInputType}
        onRadiusChange={setRadius}
      />
      <div className="flex min-h-64 items-center justify-center rounded-card border border-border bg-surface p-12">
        <FloatingLabelInput
          type={inputType}
          radius={radius}
          label={copy.label}
          id="floating-demo-input"
        />
      </div>
    </div>
  );
}
