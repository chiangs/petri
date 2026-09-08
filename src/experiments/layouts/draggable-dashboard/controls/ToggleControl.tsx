// A labelled checkbox for an on/off control in the controls row.

interface ToggleControlProps {
  label: string
  checked: boolean
  onChange: (value: boolean) => void
}

export function ToggleControl({ label, checked, onChange }: ToggleControlProps) {
  return (
    <label className="flex cursor-pointer items-center gap-2 text-sm font-medium text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="size-4 cursor-pointer accent-brand-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-600"
      />
      {label}
    </label>
  )
}
