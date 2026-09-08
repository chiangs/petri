import { Skeleton } from "./Skeleton";

// A stack of bars standing in for a paragraph. The last bar is shortened so the
// block reads like real ragged text rather than a solid rectangle.

interface SkeletonTextProps {
  lines?: number;
  /** Width of the final (short) line. */
  lastLineWidth?: number | string;
  /** Corner radius in px, passed through to each bar. */
  radius?: number;
}

export function SkeletonText({
  lines = 3,
  lastLineWidth = "60%",
  radius = 4,
}: SkeletonTextProps) {
  const widths = Array.from({ length: lines }, (_, index) =>
    index === lines - 1 ? lastLineWidth : "100%",
  );
  const bars = widths.map((width, index) => (
    <Skeleton key={index} width={width} height="0.75rem" radius={radius} />
  ));

  return <div className="flex flex-col gap-2">{bars}</div>;
}
