import { useState } from "react";
import { CardSkeleton } from "./CardSkeleton";
import { DemoCard } from "./DemoCard";
import { SkeletonControls } from "./controls/SkeletonControls";

const copy = {
  showLoading: "Show loading state",
  showLoaded: "Show loaded state",
  hint: "The skeleton is composed from two primitives — Skeleton (box / circle) and SkeletonText — arranged to trace the card's own layout.",
} as const;

const RADIUS_DEFAULT = 4;

export default function Component() {
  const [radius, setRadius] = useState(RADIUS_DEFAULT);
  const [loading, setLoading] = useState(true);

  const toggleLabel = loading ? copy.showLoaded : copy.showLoading;
  const card = loading ? <CardSkeleton radius={radius} /> : <DemoCard />;

  return (
    <div className="w-full space-y-6">
      <button
        type="button"
        onClick={() => setLoading((value) => !value)}
        className="rounded-control border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {toggleLabel}
      </button>

      <div className="flex min-h-72 items-center justify-center rounded-card border border-border bg-bg p-12">
        {card}
      </div>

      <p className="max-w-prose text-sm text-muted">{copy.hint}</p>

      <SkeletonControls radius={radius} onRadiusChange={setRadius} />
    </div>
  );
}
