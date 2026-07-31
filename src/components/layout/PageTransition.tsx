import { useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { pageTransition } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Wrap the routed <Outlet /> (or Routes) with this to get a consistent,
 * interruptible fade/rise transition between pages. Automatically disabled
 * when the user has requested reduced motion.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  const reducedMotion = useReducedMotion()

  if (reducedMotion) return <>{children}</>

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
