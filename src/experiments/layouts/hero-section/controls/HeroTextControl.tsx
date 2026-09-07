const copy = {
  headlineLabel: "Headline",
  subheadingLabel: "Subheading",
} as const;

interface HeroTextControlProps {
  headline: string;
  subheading: string;
  onHeadlineChange: (value: string) => void;
  onSubheadingChange: (value: string) => void;
}

export function HeroTextControl({
  headline,
  subheading,
  onHeadlineChange,
  onSubheadingChange,
}: HeroTextControlProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">{copy.headlineLabel}</span>
        <input
          type="text"
          value={headline}
          onChange={(event) => onHeadlineChange(event.target.value)}
          className="h-9 rounded-control border border-border bg-surface px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        />
      </label>
      <label className="flex flex-col gap-1">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">{copy.subheadingLabel}</span>
        <input
          type="text"
          value={subheading}
          onChange={(event) => onSubheadingChange(event.target.value)}
          className="h-9 rounded-control border border-border bg-surface px-3 text-sm text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
        />
      </label>
    </div>
  );
}
