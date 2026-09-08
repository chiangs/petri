// Showcase-only: the "loaded" card the skeleton stands in for. Left behind when
// the Skeleton primitives are promoted.

const copy = {
  name: "Mara Whitfield",
  meta: "Product designer · 2h ago",
  body: "Shipped the new onboarding flow this morning. Early numbers look good — activation is up and the drop-off on step two is gone.",
  action: "View profile",
  initials: "MW",
} as const;

export function DemoCard() {
  return (
    <div className="flex w-80 flex-col gap-4 rounded-card border border-border bg-surface p-6 text-left">
      <div className="flex items-center gap-3">
        <div
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full bg-brand-50 text-sm font-medium text-brand-700"
        >
          {copy.initials}
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-ink">{copy.name}</span>
          <span className="text-sm text-muted">{copy.meta}</span>
        </div>
      </div>

      <p className="text-sm text-muted">{copy.body}</p>

      <button
        type="button"
        className="self-start rounded-control border border-border px-3 py-1.5 text-sm font-medium text-ink transition-colors hover:bg-brand-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      >
        {copy.action}
      </button>
    </div>
  );
}
