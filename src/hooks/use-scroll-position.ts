import { useEffect, useState } from 'react'

/**
 * Tracks vertical scroll position and exposes whether it has passed `threshold`.
 * Used for the navbar's "scrolled" state and the scroll-to-top control.
 */
export function useScrollPosition(threshold = 24) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (ticking) return
      ticking = true
      window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > threshold)
        ticking = false
      })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrolled
}
