import { useState } from 'react'
import { MAIN_SITE_URL } from '@/config'

// The main site links into Petri with `?return=<path>` (e.g. `?return=/work/x`)
// so the "back" link can land on the exact page the reader came from, not just
// the site root. We stash it in sessionStorage on entry so it survives reloads
// and in-app navigation (the query string only rides the entry URL).
const STORAGE_KEY = 'petri:return-path'

/** Absolute URL back to the main site, honouring `?return=<path>` from entry. */
export function useReturnUrl(): string {
  const [url] = useState(resolveReturnUrl)
  return url
}

function resolveReturnUrl(): string {
  let path: string | null = null
  try {
    const fromQuery = new URLSearchParams(window.location.search).get('return')
    if (fromQuery) window.sessionStorage.setItem(STORAGE_KEY, fromQuery)
    path = window.sessionStorage.getItem(STORAGE_KEY)
  } catch {
    // ignore — storage disabled / private mode
  }

  // Only same-site absolute paths. Reject protocol-relative (`//host`) and
  // anything that resolves off-origin, so `?return=` can't be an open redirect.
  if (path && path.startsWith('/') && !path.startsWith('//')) {
    try {
      const target = new URL(path, MAIN_SITE_URL)
      if (target.origin === new URL(MAIN_SITE_URL).origin) return target.href
    } catch {
      // malformed — fall through to the site root
    }
  }
  return MAIN_SITE_URL
}
