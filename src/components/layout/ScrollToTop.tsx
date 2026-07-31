import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { useScrollPosition } from '@/hooks/use-scroll-position'
import { EASE_OUT } from '@/lib/motion'

/**
 * Route-change scroll reset. Mount once near the root, inside the Router,
 * above the routed content (no visual output).
 */
export function ScrollRestoration() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])

  return null
}

/** Floating "back to top" control that appears after the user scrolls past the fold. */
export function ScrollToTopButton() {
  const visible = useScrollPosition(480)
  const [clicked, setClicked] = useState(false)

  const handleClick = () => {
    setClicked(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
    window.setTimeout(() => setClicked(false), 600)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={handleClick}
          initial={{ opacity: 0, y: 16, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.9 }}
          transition={{ duration: 0.25, ease: EASE_OUT }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          aria-label="Scroll back to top"
          className="fixed bottom-6 right-5 z-[var(--z-dropdown)] flex size-12 items-center justify-center rounded-full bg-[var(--color-primary)] text-[var(--color-primary-foreground)] shadow-lg shadow-black/20 sm:bottom-8 sm:right-8"
        >
          <ArrowUp className={clicked ? 'size-5 animate-bounce' : 'size-5'} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
