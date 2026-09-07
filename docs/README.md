# docs/

## What `DESIGN.md` is

The shared rules of the road for how things should look and behave — spacing, required interaction
states, contrast, token-first styling, prop naming. It's the stuff Tailwind and TypeScript won't
enforce on their own, written down so every experiment stays consistent.

## When to use it

- **Skim it** before starting a new experiment.
- **Reference it** when reviewing what the agent produced. In this case the `Claude.md` file already has a reference to it in memory.
- **Check against it** before promoting an experiment into `src/dev-ready/`.

## How to use it with the agent

- Tell the agent to **"follow docs/DESIGN.md"** in your prompts.
- `CLAUDE.md` (repo root) also points the agent at it automatically, so it applies even when you
  forget to mention it.

## What belongs where

So this folder doesn't become a dumping ground:

| Content                        | Lives in                              |
| ------------------------------ | ------------------------------------- |
| Design tokens (color, radius)  | `src/index.css`                       |
| Human onboarding / setup       | root `README.md`                      |
| A specific experiment's intent | that experiment's own `README.md`     |
| Cross-cutting design principles | `docs/DESIGN.md`                      |
