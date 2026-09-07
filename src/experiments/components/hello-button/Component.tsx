import { useState } from 'react'

export default function HelloButton() {
  const [clicks, setClicks] = useState(0)

  return (
    <button onClick={() => setClicks((n) => n + 1)}>
      Clicked {clicks} {clicks === 1 ? 'time' : 'times'}
    </button>
  )
}
