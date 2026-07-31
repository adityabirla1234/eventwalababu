import { motion } from 'framer-motion'
import { EASE_LUXE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useMediaQuery } from '@/hooks/use-media-query'

/**
 * A compact "hanging pendant lamp" light effect for the Hero, adapted from
 * the Aceternity `LampContainer` (see `components/ui/lamp.tsx`).
 *
 * Deliberately NOT the full LampContainer:
 *  - No min-h-screen / own solid background — this sits as a thin decorative
 *    band at the top of the existing Hero, which already has its own
 *    (non-flat) background, gradients and noise overlay.
 *  - The original crops each light cone with solid `bg-slate-950` rectangles
 *    that assume a flat container color. Here the cones are simply
 *    positioned so their apex sits above an `overflow-hidden` band, so the
 *    crop works against ANY background, light or dark.
 *  - Recolored to the brand's gold accent instead of cyan.
 *  - Trimmed from ~9 layered/blurred elements down to 4, and drops the
 *    `backdrop-blur` layer entirely (backdrop-filter is one of the more
 *    expensive paints on mid/low-end mobile GPUs) to keep this smooth on
 *    the exact devices it targets.
 *
 * Mobile/tablet only: gated with `useMediaQuery` (not just CSS `hidden`)
 * so nothing mounts, animates, or is measured on desktop at all.
 */
export function HeroLamp() {
  const reducedMotion = useReducedMotion()
  const isMobileOrTablet = useMediaQuery('(max-width: 1023px)')

  if (!isMobileOrTablet) return null

  const coneTransition = { duration: 0.7, ease: EASE_LUXE, delay: 0.2 }

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-32 overflow-hidden sm:h-40 [contain:layout_paint]"
    >
      <div className="relative mx-auto h-full w-full max-w-sm">
        {/* Hanging cable */}
        <div className="absolute left-1/2 top-0 h-7 w-px -translate-x-1/2 bg-[var(--color-accent)]/40 sm:h-9" />

        {/* Left light cone */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, width: '7rem' }}
          animate={{ opacity: 0.55, width: '11rem' }}
          transition={coneTransition}
          style={{
            backgroundImage:
              'conic-gradient(from 250deg at 100% 0%, transparent, var(--color-gold-400) 25deg, transparent 60deg)',
          }}
          className="absolute left-1/2 top-2 h-24 -translate-x-full sm:top-3 sm:h-32"
        />

        {/* Right light cone (mirrored) */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, width: '7rem' }}
          animate={{ opacity: 0.55, width: '11rem' }}
          transition={coneTransition}
          style={{
            backgroundImage:
              'conic-gradient(from 110deg at 0% 0%, transparent, var(--color-gold-400) 25deg, transparent 60deg)',
          }}
          className="absolute left-1/2 top-2 h-24 sm:top-3 sm:h-32"
        />

        {/* Bulb glow */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, scale: 0.6 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_LUXE, delay: 0.35 }}
          className="absolute left-1/2 top-1.5 size-10 -translate-x-1/2 rounded-full bg-[var(--color-gold-400)] opacity-60 blur-xl sm:top-2 sm:size-14"
        />

        {/* Fixture line — where the light "sits" */}
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, width: '5rem' }}
          animate={{ opacity: 0.7, width: '9rem' }}
          transition={{ duration: 0.7, ease: EASE_LUXE, delay: 0.25 }}
          className="absolute left-1/2 top-8 h-px -translate-x-1/2 bg-[var(--color-gold-300)] sm:top-10"
        />
      </div>
    </div>
  )
}
