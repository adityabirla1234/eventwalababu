import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { EASE_LUXE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

interface IllustrationProps {
  className?: string
}

/** Shared draw-on-scroll wrapper for stroked SVG paths. */
function useDrawIn(threshold = 0.4) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, amount: threshold })
  const reducedMotion = useReducedMotion()
  return { ref, inView: reducedMotion ? true : inView, reducedMotion }
}

/** Arched mandap silhouette with a suspended floral garland — stands in for wedding-stage photography. */
export function MandapMotif({ className }: IllustrationProps) {
  const { ref, inView } = useDrawIn()
  return (
    <svg
      ref={ref}
      viewBox="0 0 240 200"
      fill="none"
      className={cn('overflow-visible', className)}
      aria-hidden="true"
    >
      <motion.path
        d="M20 190V90c0-38 22-70 80-70s80 32 80 70v100"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: EASE_LUXE }}
      />
      <motion.path
        d="M46 190V96c0-26 15-48 54-48s54 22 54 48v94"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.5"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, delay: 0.15, ease: EASE_LUXE }}
      />
      <motion.path
        d="M28 78c8 14 176 14 184 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeDasharray="1 7"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: EASE_LUXE }}
      />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.circle
          key={i}
          cx={40 + i * 32}
          cy={82 + Math.sin(i) * 4}
          r="3"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.85, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.7 + i * 0.06, ease: EASE_LUXE }}
        />
      ))}
    </svg>
  )
}

/** String of diyas / hanging lights — used for the "special effects" and gallery motifs. */
export function LightsMotif({ className }: IllustrationProps) {
  const { ref, inView } = useDrawIn()
  const bulbs = [0, 1, 2, 3, 4, 5, 6]
  return (
    <svg ref={ref} viewBox="0 0 260 120" fill="none" className={cn('overflow-visible', className)} aria-hidden="true">
      <motion.path
        d="M6 14c30 40 220 40 250 0"
        stroke="currentColor"
        strokeWidth="1"
        strokeOpacity="0.6"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, ease: EASE_LUXE }}
      />
      {bulbs.map((i) => {
        const x = 18 + i * 37
        const y = 20 + Math.sin((i / (bulbs.length - 1)) * Math.PI) * 26
        return (
          <g key={i}>
            <motion.line
              x1={x}
              y1={y}
              x2={x}
              y2={y + 14}
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity="0.5"
              initial={{ pathLength: 0 }}
              animate={inView ? { pathLength: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
            />
            <motion.circle
              cx={x}
              cy={y + 20}
              r="5"
              fill="currentColor"
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.05, ease: EASE_LUXE }}
            />
          </g>
        )
      })}
    </svg>
  )
}

/** Radiating firework burst — signature motif for the Special Effects section. */
export function FireworkMotif({ className }: IllustrationProps) {
  const { ref, inView } = useDrawIn(0.3)
  const rays = Array.from({ length: 14 })
  return (
    <svg ref={ref} viewBox="0 0 200 200" fill="none" className={cn('overflow-visible', className)} aria-hidden="true">
      {rays.map((_, i) => {
        const angle = (i / rays.length) * Math.PI * 2
        const inner = 18
        const outer = 40 + (i % 3) * 20
        const x1 = 100 + Math.cos(angle) * inner
        const y1 = 100 + Math.sin(angle) * inner
        const x2 = 100 + Math.cos(angle) * outer
        const y2 = 100 + Math.sin(angle) * outer
        return (
          <motion.line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={inView ? { pathLength: 1, opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: i * 0.04, ease: EASE_LUXE }}
          />
        )
      })}
      <motion.circle
        cx="100"
        cy="100"
        r="3.5"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, ease: EASE_LUXE }}
      />
    </svg>
  )
}

/** Stacked stage silhouette with spotlight beams — used for the Services index. */
export function StageMotif({ className }: IllustrationProps) {
  const { ref, inView } = useDrawIn()
  return (
    <svg ref={ref} viewBox="0 0 220 160" fill="none" className={cn('overflow-visible', className)} aria-hidden="true">
      <motion.path
        d="M10 140h200M40 140l14-50h112l14 50"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE_LUXE }}
      />
      <motion.path
        d="M70 90 40 20M150 90l30-70"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.45"
        strokeDasharray="2 5"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1, delay: 0.4, ease: EASE_LUXE }}
      />
      <motion.circle
        cx="110"
        cy="66"
        r="14"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7, ease: EASE_LUXE }}
      />
    </svg>
  )
}

/** Marigold garland loop — used for Gallery Preview / About tiles. */
export function GarlandMotif({ className }: IllustrationProps) {
  const { ref, inView } = useDrawIn()
  return (
    <svg ref={ref} viewBox="0 0 220 100" fill="none" className={cn('overflow-visible', className)} aria-hidden="true">
      <motion.path
        d="M4 10c30 60 60 60 106 40s86-20 110 30"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.5, ease: EASE_LUXE }}
      />
      {Array.from({ length: 10 }).map((_, i) => (
        <motion.circle
          key={i}
          cx={14 + i * 21}
          cy={22 + Math.sin(i * 0.8) * 22}
          r="3.5"
          fill="currentColor"
          initial={{ opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 0.9, scale: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.5 + i * 0.05, ease: EASE_LUXE }}
        />
      ))}
    </svg>
  )
}

/** Small ornamental diamond used as a kicker glyph beside eyebrows and dividers. */
export function OrnamentGlyph({ className }: IllustrationProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={cn('shrink-0', className)} aria-hidden="true">
      <path d="M12 2 15 12 12 22 9 12 12 2Z" stroke="currentColor" strokeWidth="1" />
      <path d="M2 12 12 9 22 12 12 15 2 12Z" stroke="currentColor" strokeWidth="1" opacity="0.5" />
    </svg>
  )
}

/** Compass rose — used for the "Vision" panel (direction, aspiration). */
export function CompassMotif({ className }: IllustrationProps) {
  const { ref, inView } = useDrawIn()
  return (
    <svg ref={ref} viewBox="0 0 160 160" fill="none" className={cn('overflow-visible', className)} aria-hidden="true">
      <motion.circle
        cx="80"
        cy="80"
        r="62"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.4, ease: EASE_LUXE }}
      />
      <motion.circle
        cx="80"
        cy="80"
        r="44"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.45"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.2, ease: EASE_LUXE }}
      />
      <motion.path
        d="M80 30 92 74 80 130 68 74Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: EASE_LUXE }}
      />
      <motion.path
        d="M30 80 74 68 130 80 74 92Z"
        stroke="currentColor"
        strokeWidth="0.75"
        strokeOpacity="0.5"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.65, ease: EASE_LUXE }}
      />
      <motion.circle
        cx="80"
        cy="80"
        r="4"
        fill="currentColor"
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.9, ease: EASE_LUXE }}
      />
    </svg>
  )
}

/** Laurel wreath — used for the "Mission" panel (standard, achievement). */
export function LaurelMotif({ className }: IllustrationProps) {
  const { ref, inView } = useDrawIn()
  const leavesLeft = [0, 1, 2, 3, 4]
  const leavesRight = [0, 1, 2, 3, 4]
  return (
    <svg ref={ref} viewBox="0 0 180 140" fill="none" className={cn('overflow-visible', className)} aria-hidden="true">
      <motion.path
        d="M20 20c-14 34-14 66 4 96"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.3, ease: EASE_LUXE }}
      />
      <motion.path
        d="M160 20c14 34 14 66-4 96"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : {}}
        transition={{ duration: 1.3, delay: 0.1, ease: EASE_LUXE }}
      />
      {leavesLeft.map((i) => (
        <motion.ellipse
          key={`l-${i}`}
          cx={22 - i * 1.5}
          cy={32 + i * 18}
          rx="9"
          ry="4.5"
          transform={`rotate(${-35 + i * 6} ${22 - i * 1.5} ${32 + i * 18})`}
          stroke="currentColor"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 0.85, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.08, ease: EASE_LUXE }}
        />
      ))}
      {leavesRight.map((i) => (
        <motion.ellipse
          key={`r-${i}`}
          cx={158 + i * 1.5}
          cy={32 + i * 18}
          rx="9"
          ry="4.5"
          transform={`rotate(${35 - i * 6} ${158 + i * 1.5} ${32 + i * 18})`}
          stroke="currentColor"
          strokeWidth="1"
          initial={{ opacity: 0, scale: 0.4 }}
          animate={inView ? { opacity: 0.85, scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.55 + i * 0.08, ease: EASE_LUXE }}
        />
      ))}
      <motion.path
        d="M90 100 90 70"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.9, ease: EASE_LUXE }}
      />
      <motion.circle
        cx="90"
        cy="60"
        r="8"
        stroke="currentColor"
        strokeWidth="1"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 1, ease: EASE_LUXE }}
      />
    </svg>
  )
}

/**
 * The "golden thread" — a single continuous path that can be re-used as a
 * connective device (hero backdrop, process timeline, section transitions).
 * `variant` swaps the path geometry while keeping the same draw-on animation.
 */
export function GoldenThread({
  className,
  variant = 'flow',
}: IllustrationProps & { variant?: 'flow' | 'vertical' }) {
  const { ref, inView } = useDrawIn(0.2)
  const d =
    variant === 'vertical'
      ? 'M40 0 C 70 60, 10 120, 40 180 S 70 300, 40 360'
      : 'M0 60 C 120 0, 220 140, 340 70 S 560 0, 680 80 S 900 140, 1040 60'
  const viewBox = variant === 'vertical' ? '0 0 80 360' : '0 0 1040 140'
  return (
    <svg
      ref={ref}
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="none"
      className={cn('overflow-visible', className)}
      aria-hidden="true"
    >
      <motion.path
        d={d}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={inView ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 2.2, ease: EASE_LUXE }}
      />
    </svg>
  )
}
