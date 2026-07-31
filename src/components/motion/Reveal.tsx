import { motion } from 'framer-motion'
import type { HTMLAttributes, ElementType, ReactNode } from 'react'
import { fadeUp, fadeIn, scaleIn, slideInLeft, slideInRight, staggerContainer } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

type RevealVariant = 'up' | 'fade' | 'scale' | 'left' | 'right'

const variantMap = {
  up: fadeUp,
  fade: fadeIn,
  scale: scaleIn,
  left: slideInLeft,
  right: slideInRight,
}

/** Event handler keys whose HTMLAttributes signatures conflict with framer-motion's. */
type MotionConflictKeys =
  | 'children'
  | 'onDrag'
  | 'onDragStart'
  | 'onDragEnd'
  | 'onAnimationStart'
  | 'onAnimationEnd'

interface RevealProps extends Omit<HTMLAttributes<HTMLElement>, MotionConflictKeys> {
  as?: ElementType
  variant?: RevealVariant
  delay?: number
  /** Fraction of the element that must be visible before it triggers. */
  amount?: number
  className?: string
  children?: ReactNode
}

/**
 * Scroll-triggered reveal wrapper. Wraps `motion.<as>` with `whileInView`,
 * using the shared variant tokens from `lib/motion.ts` so every section
 * animates on the same rhythm. Falls back to a static render when the user
 * has requested reduced motion.
 */
export function Reveal({
  as = 'div',
  variant = 'up',
  delay = 0,
  amount = 0.3,
  className,
  children,
  ...rest
}: RevealProps) {
  const reducedMotion = useReducedMotion()
  const MotionTag = motion[as as 'div'] ?? motion.div

  if (reducedMotion) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={variantMap[variant]}
      transition={delay ? { delay } : undefined}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}

interface RevealGroupProps extends Omit<HTMLAttributes<HTMLElement>, MotionConflictKeys> {
  as?: ElementType
  amount?: number
  className?: string
  children?: ReactNode
}

/**
 * Stagger container for a list of `Reveal` (or plain `motion.li`) children.
 * Pair each child with `variants={fadeUp}` and no independent `initial`/`animate`
 * so it inherits stagger timing from this parent.
 */
export function RevealGroup({ as = 'div', amount = 0.2, className, children, ...rest }: RevealGroupProps) {
  const reducedMotion = useReducedMotion()
  const MotionTag = motion[as as 'div'] ?? motion.div

  if (reducedMotion) {
    const Tag = as
    return (
      <Tag className={className} {...rest}>
        {children}
      </Tag>
    )
  }

  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
      variants={staggerContainer}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
