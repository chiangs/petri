import { useEffect, useState } from 'react'
import './styles.css'

interface AnimatedCounterProps {
  target?: number
  durationMs?: number
}

export default function AnimatedCounter({
  target = 100,
  durationMs = 1200,
}: AnimatedCounterProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let raf: number
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [target, durationMs])

  return <div className="animated-counter">{value}</div>
}
