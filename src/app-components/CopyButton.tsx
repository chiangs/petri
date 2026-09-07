import { useState } from 'react'

const copy = {
  idle: 'Copy',
  done: 'Copied',
  label: 'Copy code to clipboard',
} as const

interface CopyButtonProps {
  text: string
}

export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const onClick = async () => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard API unavailable (e.g. insecure context) — nothing to do.
    }
  }

  const label = copied ? copy.done : copy.idle

  return (
    <button
      type="button"
      className="copy-button"
      onClick={onClick}
      aria-label={copy.label}
    >
      {label}
    </button>
  )
}
