import { useState } from "react";
import { CopyButton } from "./CopyButton";
import { SegmentedButton } from "./SegmentedButton";
import { CODE_LANG_LABEL, CODE_LANGS, CODE_SAMPLES, type CodeLang } from "./codeSamples";

// All user-facing text this component renders.
const copy = {
  heading: "The essentials",
  tabGroupLabel: "Code sample language",
} as const;

export function CodeSample() {
  const [lang, setLang] = useState<CodeLang>("jsx");

  const activeCode = CODE_SAMPLES[lang];

  const tabs = CODE_LANGS.map((value) => (
    <SegmentedButton
      key={value}
      size="sm"
      label={CODE_LANG_LABEL[value]}
      isActive={value === lang}
      onSelect={() => setLang(value)}
    />
  ));

  return (
    <section className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-sm font-semibold tracking-wide text-muted uppercase">{copy.heading}</h2>
        <div className="flex items-center gap-2">
          <div className="flex gap-2" role="group" aria-label={copy.tabGroupLabel}>
            {tabs}
          </div>
          <CopyButton key={lang} text={activeCode} />
        </div>
      </div>
      <pre className="overflow-x-auto rounded-card border border-border bg-surface p-4 text-sm text-ink">
        <code>{activeCode}</code>
      </pre>
    </section>
  );
}
