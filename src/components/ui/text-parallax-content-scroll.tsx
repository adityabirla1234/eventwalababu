import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const IMG_PADDING = 12

export interface TextParallaxContentProps {
  imgUrl: string
  /** Short uppercase label shown above the heading (e.g. "Design", "Craft"). */
  subheading: string
  heading: ReactNode
  /** Optional accessible description of the image; falls back to the heading text. */
  imgAlt?: string
  children?: ReactNode
  className?: string
}

/**
 * Full-bleed sticky image with a scroll-linked overlay heading, followed by
 * supporting content that scrolls up over the (slightly scaling/fading) image.
 * Respects prefers-reduced-motion by rendering a static, non-sticky version.
 */
export function TextParallaxContent({
  imgUrl,
  subheading,
  heading,
  imgAlt,
  children,
  className,
}: TextParallaxContentProps) {
  const reducedMotion = useReducedMotion()

  if (reducedMotion) {
    return (
      <div className={cn('px-3', className)}>
        <div
          role="img"
          aria-label={imgAlt ?? subheading}
          style={{ backgroundImage: `url(${imgUrl})` }}
          className="relative flex h-[60vh] flex-col items-center justify-center rounded-[var(--radius-xl)] bg-cover bg-center text-center text-white"
        >
          <div className="absolute inset-0 rounded-[var(--radius-xl)] bg-[var(--color-onyx-950)]/60" />
          <div className="relative px-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-400)] sm:text-sm">
              {subheading}
            </p>
            <p className="font-serif text-3xl font-semibold sm:text-5xl">{heading}</p>
          </div>
        </div>
        {children}
      </div>
    )
  }

  return (
    <div style={{ paddingLeft: IMG_PADDING, paddingRight: IMG_PADDING }} className={className}>
      <div className="relative h-[150vh]">
        <StickyImage imgUrl={imgUrl} imgAlt={imgAlt ?? subheading} />
        <OverlayCopy heading={heading} subheading={subheading} />
      </div>
      {children}
    </div>
  )
}

function StickyImage({ imgUrl, imgAlt }: { imgUrl: string; imgAlt: string }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['end end', 'end start'],
  })

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])

  return (
    <motion.div
      role="img"
      aria-label={imgAlt}
      style={{
        backgroundImage: `url(${imgUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: `calc(100vh - ${IMG_PADDING * 2}px)`,
        top: IMG_PADDING,
        scale,
      }}
      ref={targetRef}
      className="sticky z-0 overflow-hidden rounded-[var(--radius-xl)]"
    >
      <motion.div
        className="absolute inset-0 bg-[var(--color-onyx-950)]/70"
        style={{ opacity }}
      />
    </motion.div>
  )
}

function OverlayCopy({ subheading, heading }: { subheading: string; heading: ReactNode }) {
  const targetRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [250, -250])
  const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0])

  return (
    <motion.div
      style={{ y, opacity }}
      ref={targetRef}
      className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center px-6 text-center text-white"
    >
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-400)] sm:mb-4 sm:text-sm">
        {subheading}
      </p>
      <p className="font-serif text-4xl font-semibold leading-[1.1] sm:text-6xl lg:text-7xl">{heading}</p>
    </motion.div>
  )
}
