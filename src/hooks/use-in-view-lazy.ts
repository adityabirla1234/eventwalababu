import { useEffect, useRef, useState } from 'react'

/**
 * Returns a ref + boolean that flips to `true` once the element enters the
 * viewport (with a preloading margin) and then disconnects the observer —
 * used to defer mounting heavy tile content until it's actually needed.
 */
export function useInViewLazy<T extends HTMLElement>(rootMargin = '200px') {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node || inView) return

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { rootMargin },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [inView, rootMargin])

  return { ref, inView } as const
}
