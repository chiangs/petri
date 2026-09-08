import { useRef, useState } from "react";
import { cn } from "@/lib/cn";
import { ClearButton } from "./ClearButton";
import { useReducedMotion } from "./use-reduced-motion";

// Rest position centers the label in the field; floated lifts it toward the
// top edge and shrinks it via `scale` (smoother to animate than a font-size
// class swap). Both are computed as a single `transform` so the spring easing
// below animates one continuous value instead of fighting a utility class.
const REST_TRANSFORM = "translate(0, -50%)";
const FLOAT_TRANSFORM = "translate(0, -26px) scale(0.75)";

// Slight overshoot on arrival — reads as a spring without a physics lib.
const SPRING_EASE = "ease-[cubic-bezier(0.34,1.56,0.64,1)]";
const SPRING_DURATION = "duration-[260ms]";
const NO_MOTION_DURATION = "duration-0";

export type InputType = "text" | "email" | "password";

interface FloatingLabelInputProps {
  type: InputType;
  radius: number;
  label: string;
  id: string;
}

export function FloatingLabelInput({ type, radius, label, id }: FloatingLabelInputProps) {
  const [value, setValue] = useState("");
  const [focused, setFocused] = useState(false);
  const reducedMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  const floated = focused || value.length > 0;
  const duration = reducedMotion ? NO_MOTION_DURATION : SPRING_DURATION;
  const labelTransform = floated ? FLOAT_TRANSFORM : REST_TRANSFORM;

  const handleClear = () => {
    setValue("");
    inputRef.current?.focus();
  };

  const clearButton = value.length > 0 ? <ClearButton onClear={handleClear} /> : null;

  // The field only widens while actively focused — it narrows back on blur
  // even if a value remains (the label stays floated independently, above).
  const wrapperClasses = cn(
    "relative transition-[width]",
    duration,
    SPRING_EASE,
    focused ? "w-80" : "w-72",
  );

  // `pr-10` reserves room for the clear button so a long value scrolls behind
  // it (the input's own scrolling) instead of rendering underneath it.
  const inputClasses = cn(
    "h-14 w-full border border-border bg-transparent pl-4 pr-10 text-base text-ink outline-none transition-colors",
    "hover:border-brand-500/60",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
  );

  const labelClasses = cn(
    "pointer-events-none absolute left-4 top-1/2 origin-left text-base leading-none text-muted transition-transform",
    duration,
    SPRING_EASE,
  );

  return (
    <div className={wrapperClasses}>
      <input
        ref={inputRef}
        id={id}
        type={type}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{ borderRadius: radius }}
        className={inputClasses}
      />
      <label htmlFor={id} style={{ transform: labelTransform }} className={labelClasses}>
        {label}
      </label>
      {clearButton}
    </div>
  );
}
