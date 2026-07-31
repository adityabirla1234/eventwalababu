import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

interface TypewriterProps {
  text: string
  /** Milliseconds between characters — lower is faster. */
  speed?: number
  /** Extra pause before typing starts once scrolled into view, in ms. */
  startDelay?: number
  className?: string
}

/**
 * Scroll-triggered typewriter reveal. The full text is present in the DOM
 * from the first render — only each character's opacity animates in, in
 * sequence — so line-wrapping is computed once and never shifts mid-type.
 * A blinking cursor trails the reveal until it finishes. Falls back to
 * plain static text under prefers-reduced-motion.
 */
export function Typewriter({ text, speed = 16, startDelay = 150, className }: TypewriterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reducedMotion = useReducedMotion()
  const [count, setCount] = useState(reducedMotion ? text.length : 0)
  const [done, setDone] = useState(reducedMotion)

  useEffect(() => {
    if (reducedMotion || !inView || done) return

    let index = 0
    let intervalId: ReturnType<typeof setInterval> | undefined

    const startTimeoutId = setTimeout(() => {
      intervalId = setInterval(() => {
        index += 1
        setCount(index)
        if (index >= text.length) {
          if (intervalId) clearInterval(intervalId)
          setDone(true)
        }
      }, speed)
    }, startDelay)

    return () => {
      clearTimeout(startTimeoutId)
      if (intervalId) clearInterval(intervalId)
    }
  }, [inView, reducedMotion, done, text, speed, startDelay])

  return (
    <span ref={ref} className={cn('inline', className)}>
      <span aria-hidden="true">
        {text.split('').map((char, i) => (
          <span key={i} style={{ opacity: i < count ? 1 : 0 }}>
            {char}
          </span>
        ))}
        {!done && !reducedMotion && <span className="typewriter-cursor" aria-hidden="true" />}
      </span>
      {/* Full text available immediately for assistive tech, independent of the animation. */}
      <span className="sr-only">{text}</span>
    </span>
  )
}
