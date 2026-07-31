import type { Transition, Variants } from 'framer-motion'

/**
 * Motion tokens — derived from the design system's motion guidelines
 * (Standard intensity tier: elegant, not flashy; luxury-appropriate).
 *
 *  - Hover / micro-interactions: 200-300ms, ease-out
 *  - Scroll reveal: 400-600ms, ease-out
 *  - Stagger: 30-50ms per item (design system) -> 60ms used for a slightly
 *    more luxurious, deliberate pace across hero-scale content blocks
 *  - Page transition: 400-600ms, ease-in-out
 *  - Exit animations run at ~60-70% of enter duration
 */

export const EASE_OUT: Transition['ease'] = [0.22, 0.61, 0.36, 1]
export const EASE_IN_OUT: Transition['ease'] = [0.65, 0, 0.35, 1]
export const EASE_LUXE: Transition['ease'] = [0.16, 1, 0.3, 1]

export const DURATION = {
  fast: 0.2,
  base: 0.35,
  slow: 0.5,
  slower: 0.7,
} as const

/** Fade + rise on scroll into view. Use with `whileInView`. */
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.96 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: DURATION.base, ease: EASE_LUXE },
  },
}

/** Slide in from the left + fade, on scroll into view. */
export const slideInLeft: Variants = {
  hidden: { opacity: 0, x: -56 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slower, ease: EASE_LUXE },
  },
}

/** Slide in from the right + fade, on scroll into view. */
export const slideInRight: Variants = {
  hidden: { opacity: 0, x: 56 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: DURATION.slower, ease: EASE_LUXE },
  },
}

/** Wrap a list container with this and each child with `fadeUp` for a staggered reveal. */
export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
}

/** Route-level page transition. Exit runs faster than enter (~60%). */
export const pageTransition: Variants = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.slow, ease: EASE_OUT },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: DURATION.fast, ease: EASE_IN_OUT },
  },
}

/** Subtle press/hover scale for tappable cards & buttons (0.95-1.05 range per guidelines). */
export const pressable = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { duration: DURATION.fast, ease: EASE_OUT },
}
