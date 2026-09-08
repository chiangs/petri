import { Skeleton } from "./Skeleton";
import { SkeletonText } from "./SkeletonText";

// Showcase-only: the primitives composed to trace DemoCard's layout. This is the
// pattern a developer copies — one skeleton authored next to each component so it
// can't drift. Left behind when the primitives are promoted.

const copy = {
  loading: "Loading profile card",
} as const;

interface CardSkeletonProps {
  /** Corner radius in px for the bars, from the live control. */
  radius: number;
}

export function CardSkeleton({ radius }: CardSkeletonProps) {
  return (
    <div
      role="status"
      aria-label={copy.loading}
      className="flex w-80 flex-col gap-4 rounded-card border border-border bg-surface p-6"
    >
      <div className="flex items-center gap-3">
        <Skeleton circle width={40} height={40} />
        <div className="flex flex-col gap-2">
          <Skeleton width={120} height="0.9rem" radius={radius} />
          <Skeleton width={80} height="0.7rem" radius={radius} />
        </div>
      </div>

      <SkeletonText lines={3} lastLineWidth="45%" radius={radius} />

      <Skeleton width={104} height={34} radius={radius} />
    </div>
  );
}
