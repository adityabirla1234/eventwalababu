import * as React from 'react'
import { motion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { EASE_OUT } from '@/lib/motion'

export interface GlowMenuItem {
  icon: LucideIcon | React.FC<{ className?: string }>
  label: string
  href: string
  /** CSS `background` value for the per-item hover/active glow (radial-gradient string). */
  gradient: string
  /** Tailwind text-color class applied to the icon on hover/active. */
  iconColor: string
}

interface MenuBarProps {
  className?: string
  items: GlowMenuItem[]
  activeItem?: string
  onItemClick?: (item: GlowMenuItem) => void
}

const itemVariants = {
  initial: { rotateX: 0, opacity: 1 },
  hover: { rotateX: -90, opacity: 0 },
}

const backVariants = {
  initial: { rotateX: 90, opacity: 0 },
  hover: { rotateX: 0, opacity: 1 },
}

const glowVariants = {
  initial: { opacity: 0, scale: 0.8 },
  hover: {
    opacity: 1,
    scale: 2,
    transition: {
      opacity: { duration: 0.5, ease: EASE_OUT },
      scale: { duration: 0.5, type: 'spring' as const, stiffness: 300, damping: 25 },
    },
  },
}

const navGlowVariants = {
  initial: { opacity: 0 },
  hover: {
    opacity: 1,
    transition: { duration: 0.5, ease: EASE_OUT },
  },
}

const sharedTransition = {
  type: 'spring' as const,
  stiffness: 100,
  damping: 20,
  duration: 0.5,
}

/** Reduced-motion-safe flip variants: front face always shown, back face always hidden — no rotation. */
const flipStaticFront = {
  initial: { opacity: 1 },
  hover: { opacity: 1 },
}
const flipStaticBack = {
  initial: { opacity: 0 },
  hover: { opacity: 0 },
}
/** Reduced-motion transition override: keep the same opacity end-states, just skip the animated motion. */
const instantTransition = { duration: 0 }

/**
 * Pill navigation with a per-item 3D flip and ambient gold glow on hover.
 * Solid, flat surface (no glass/blur) — a `--color-card` fill with a
 * hairline border, consistent with every other surfaced control on the
 * site (buttons, cards).
 *
 * Pointer/hover-driven by design — used for desktop navigation only. The
 * mobile drawer in `Navbar` covers touch devices, where hover states and the
 * 3D flip don't translate.
 */
export const MenuBar = React.forwardRef<HTMLElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick }, ref) => {
    const reducedMotion = useReducedMotion()
    const flip = reducedMotion ? flipStaticFront : itemVariants
    const flipBack = reducedMotion ? flipStaticBack : backVariants
    const flipTransition = reducedMotion ? instantTransition : sharedTransition
    const glowTransition = reducedMotion ? instantTransition : undefined

    return (
      <motion.nav
        ref={ref}
        className={cn(
          'relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-card)] p-1.5 shadow-lg',
          className,
        )}
        initial="initial"
        whileHover="hover"
      >
        {/* Ambient gold bloom across the whole pill on hover — brand-toned, not a generic rainbow glow. */}
        <motion.div
          className="pointer-events-none absolute -inset-2 z-0 rounded-3xl"
          style={{
            background:
              'radial-gradient(ellipse at center, rgb(226 175 56 / 18%) 0%, rgb(226 175 56 / 8%) 50%, transparent 90%)',
          }}
          variants={navGlowVariants}
          transition={glowTransition}
        />
        <ul className="relative z-10 flex items-center gap-1">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = item.label === activeItem

            return (
              <li key={item.label} className="relative">
                <button
                  type="button"
                  onClick={() => onItemClick?.(item)}
                  aria-current={isActive ? 'page' : undefined}
                  className="block w-full"
                >
                  <motion.div
                    className="group relative block overflow-visible rounded-xl"
                    style={{ perspective: '600px' }}
                    whileHover="hover"
                    initial="initial"
                  >
                    <motion.div
                      className="pointer-events-none absolute inset-0 z-0 rounded-xl"
                      variants={glowVariants}
                      animate={isActive ? 'hover' : 'initial'}
                      transition={glowTransition}
                      style={{ background: item.gradient }}
                    />
                    <motion.div
                      className={cn(
                        'relative z-10 flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm font-medium tracking-wide transition-colors',
                        isActive
                          ? 'text-[var(--color-foreground)]'
                          : 'text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]',
                      )}
                      variants={flip}
                      transition={flipTransition}
                      style={{ transformStyle: 'preserve-3d', transformOrigin: 'center bottom' }}
                    >
                      <span className={cn('transition-colors duration-300', isActive && item.iconColor)}>
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                    <motion.div
                      className={cn(
                        'absolute inset-0 z-10 flex items-center gap-2 rounded-xl bg-transparent px-4 py-2 text-sm font-medium tracking-wide transition-colors',
                        isActive
                          ? 'text-[var(--color-foreground)]'
                          : 'text-[var(--color-muted-foreground)] group-hover:text-[var(--color-foreground)]',
                      )}
                      variants={flipBack}
                      transition={flipTransition}
                      style={{ transformStyle: 'preserve-3d', transformOrigin: 'center top', rotateX: 90 }}
                    >
                      <span className={cn('transition-colors duration-300', isActive && item.iconColor)}>
                        <Icon className="size-4" aria-hidden="true" />
                      </span>
                      <span>{item.label}</span>
                    </motion.div>
                  </motion.div>
                </button>
              </li>
            )
          })}
        </ul>
      </motion.nav>
    )
  },
)

MenuBar.displayName = 'MenuBar'
