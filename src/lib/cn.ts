import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Merge Tailwind classes safely: `clsx` handles conditionals/arrays, `twMerge`
 * resolves conflicts so the last utility wins (e.g. `cn("p-2", "p-4")` -> "p-4").
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
