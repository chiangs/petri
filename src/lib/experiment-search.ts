import Fuse from 'fuse.js'
import type { Experiment } from './types'

// The only module that imports Fuse — the search input calls through here so
// fuzzy-matching config lives in one place. Matches on the experiment name and
// its tags, name weighted higher.
const fuseOptions = {
  keys: [
    { name: 'title', weight: 2 },
    { name: 'tags', weight: 1 },
  ],
  threshold: 0.4,
  ignoreLocation: true,
}

// ponytail: rebuilds the index on every call — fine for a handful of
// experiments; memoize a Fuse instance in the caller if the gallery ever
// grows to hundreds.
export function searchExperiments(
  experiments: Experiment[],
  query: string,
): Experiment[] {
  const trimmed = query.trim()
  if (!trimmed) return experiments
  return new Fuse(experiments, fuseOptions).search(trimmed).map((r) => r.item)
}
