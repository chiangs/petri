import { useEffect, useId, useRef } from 'react'

const copy = {
  heading: 'About Petri',
  body: [
    'Petri started as a demo — one worked example of how a designer can rapidly prototype with AI and still hand the developer code that translates cleanly to production.',
    'Then I kept using it. Now it’s where I keep the things I want to try: mostly ideas that never earned priority in enterprise work, back when “let’s just see” cost too much to justify. It doesn’t anymore — a dashboard you can drag and resize, hero sections that respond to you, the small interactions nobody budgets for.',
  ],
  outro: {
    before: 'Everything runs in the browser. ',
    link: 'Clone it',
    after: ', point an agent at it, see what grows.',
  },
  repoUrl: 'https://github.com/chiangs/petri',
  close: 'Close',
} as const

interface AboutDialogProps {
  open: boolean
  onClose: () => void
}

// Native <dialog> — showModal() gives us the focus trap, Esc-to-close, backdrop,
// and focus restoration to the opener for free. No modal library needed.
export function AboutDialog({ open, onClose }: AboutDialogProps) {
  const ref = useRef<HTMLDialogElement>(null)
  const headingId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  // The native `close` event fires for Esc, the close button, and backdrop clicks —
  // one path back to the parent.
  const handleClose = () => onClose()

  // A click whose target is the dialog element itself landed on the backdrop, not
  // the content box.
  const handleClick = (event: React.MouseEvent<HTMLDialogElement>) => {
    if (event.target === ref.current) ref.current?.close()
  }

  const paragraphs = copy.body.map((text) => <p key={text.slice(0, 16)}>{text}</p>)

  return (
    <dialog
      ref={ref}
      className="about-dialog"
      aria-labelledby={headingId}
      onClose={handleClose}
      onClick={handleClick}
    >
      <h2 id={headingId}>{copy.heading}</h2>
      {paragraphs}
      <p>
        {copy.outro.before}
        <a href={copy.repoUrl} target="_blank" rel="noopener noreferrer">
          {copy.outro.link}
        </a>
        {copy.outro.after}
      </p>
      <button
        type="button"
        autoFocus
        onClick={() => ref.current?.close()}
        className="about-dialog-close"
      >
        {copy.close}
      </button>
    </dialog>
  )
}
