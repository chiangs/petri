---
name: accessibility-review
description: Use whenever the designer asks for an accessibility check/review of an experiment or component, or before promoting one. Checks semantic HTML and WCAG level A (hard minimum) and AA (target) against docs/DESIGN.md's Accessibility section, then reports findings only — never edits or auto-fixes without the designer asking.
---

# Accessibility review

## When to use

The designer asks to check/review accessibility on an experiment or component, or as a
companion check when running the `promote` skill.

## Steps

1. **Scope the review.** Cover the piece and its sub-components. Skip `controls/` — it's
   exempt (dev-only, never promoted, per `docs/DESIGN.md`). Don't re-litigate a gap already
   documented under an Accessibility note in the `README.md` unless the designer asks you to
   revisit it.

2. **Semantic HTML pass first.** Flag: a `div`/`span` standing in for `button`, `a`, or a
   heading; missing landmarks (`nav`/`main`/`header`/`footer`); a broken or skipped heading
   order; a `label` not wired to its `input` via `htmlFor`/`id`; ARIA added where native HTML
   already covers the same role/name/state.

3. **Level A checklist (non-negotiable minimum).** Keyboard operable, no keyboard trap;
   name/role/value exposed for every interactive element; `alt` text present on meaningful
   images; info/relationships not conveyed by color alone.

4. **Level AA checklist (target).** Contrast 4.5:1 body text / 3:1 large text and UI
   boundaries — skip purely decorative `aria-hidden` visuals, per `docs/DESIGN.md`; visible
   focus indicator on every interactive element; layout doesn't break on text resize/reflow.

5. **Weigh the two carve-outs.** A novel interaction with no established accessible pattern, or
   `controls/` scaffolding, is acceptable *if* the gap is already flagged under an Accessibility
   note in the README — otherwise call it out as a finding, don't wave it through silently.

6. **Report findings only.** For each finding, state what/where (file + line), why it matters,
   and which WCAG level it violates (A vs AA). Don't edit anything unless the designer asks. If
   asked to fix, follow `docs/DESIGN.md` conventions (declarative JSX, `copy` object, tokens,
   one component per file) and hand off to the `commit` skill to confirm the message before
   committing.
