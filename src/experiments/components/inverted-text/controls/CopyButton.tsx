import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

// All user-facing text this component renders.
const copy = {
  idle: "Copy",
  done: "Copied",
  ariaLabel: "Copy code to clipboard",
} as const;

const RESET_MS = 2000;

interface CopyButtonProps {
  text: string;
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = window.setTimeout(() => setCopied(false), RESET_MS);
    } catch {
      setCopied(false);
    }
  };

  const label = copied ? copy.done : copy.idle;

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-label={copy.ariaLabel}
      className={cn(
        "h-8 rounded-control border px-3 text-xs font-semibold tracking-wide uppercase transition-colors",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600",
        copied
          ? "border-brand-500 text-brand-700"
          : "border-border bg-surface text-ink hover:bg-brand-50 hover:text-brand-700",
      )}
    >
      {label}
    </button>
  );
}
