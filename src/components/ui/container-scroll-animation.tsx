import { useRef, type ReactNode } from 'react'
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

export interface ContainerScrollProps {
  titleComponent: ReactNode
  children: ReactNode
  className?: string
}

/**
 * Scroll-linked "reveal" card: a title parallaxes upward while a framed card
 * slides/scales into place as the section moves through the viewport.
 *
 * `rotateX` was deliberately dropped in favor of `translateY` + `scale`:
 * a continuous 3D transform on a card that also hosts an autoplaying
 * `<video>` (see `HeroLoopVideo`) is the biggest GPU-compositing cost in
 * this component, and it's paid every scroll frame, not once.
 *
 * Sizing is intentionally NOT fixed desktop rem values (the original demo
 * used h-[60rem]/h-[80rem] + h-[30rem]/h-[40rem], tuned for one breakpoint).
 * Instead: the scroll runway is viewport-relative (so the effect keeps a
 * similar feel across screen sizes) and the card is aspect-ratio driven
 * (so it fills edge-to-edge with no letterboxing at any width) instead of a
 * fixed pixel height that would waste space or clip content.
 */
export function ContainerScroll({ titleComponent, children, className }: ContainerScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef })

  const scaleRange: [number, number] = isMobile ? [0.85, 1] : [1.05, 1]

  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [40, 0])
  const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : scaleRange)
  const translate = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [0, -60])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative flex min-h-[115vh] items-center justify-center px-3 sm:min-h-[130vh] sm:px-6 lg:min-h-[155vh]',
        className,
      )}
    >
      <div className="relative w-full py-8 sm:py-12 lg:py-16">
        <Header translate={translate} titleComponent={titleComponent} />
        <Card y={y} scale={scale}>
          {children}
        </Card>
      </div>
    </div>
  )
}

function Header({
  translate,
  titleComponent,
}: {
  translate: MotionValue<number>
  titleComponent: ReactNode
}) {
  return (
    <motion.div style={{ translateY: translate }} className="mx-auto max-w-3xl text-center">
      {titleComponent}
    </motion.div>
  )
}

function Card({
  y,
  scale,
  children,
}: {
  y: MotionValue<number>
  scale: MotionValue<number>
  children: ReactNode
}) {
  return (
    <motion.div
      style={{
        y,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003',
      }}
      className="relative mx-auto mt-6 aspect-[4/3] w-full max-w-5xl rounded-2xl border-2 border-[var(--color-onyx-600)] bg-[var(--color-onyx-800)] p-1.5 sm:mt-8 sm:aspect-[16/10] sm:rounded-[1.75rem] sm:border-[3px] sm:p-2 lg:aspect-video lg:rounded-[30px] lg:border-4 lg:p-3"
    >
      <div className="size-full overflow-hidden rounded-[calc(1rem-2px)] sm:rounded-[calc(1.75rem-3px)] lg:rounded-[calc(30px-4px)]">
        {children}
      </div>
    </motion.div>
  )
}

/**
 * A compact sibling of `ContainerScroll` for tight spaces (e.g. swapping in
 * for a small image slot on mobile). Same underlying mechanism as the full
 * version above — `scrollYProgress` from `useScroll` drives `translateY`/
 * `scale` continuously as the card moves through the viewport — it's
 * *not* a one-shot "reveal" animation, just without the huge `min-h-[115vh]`
 * runway. That runway was only ever about pacing (stretching the effect
 * over more scroll distance); the transform itself already resolves over
 * roughly one viewport-height of scroll on its own, since `useScroll`'s
 * default offsets track from "card top hits viewport bottom" to "card
 * bottom hits viewport top" — so a normal-height wrapper is enough for the
 * animation to read clearly without adding empty scroll space.
 */
export function ContainerScrollCompact({ children, className }: { children: ReactNode; className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], reducedMotion ? [0, 0] : [40, 0])
  const scale = useTransform(scrollYProgress, [0, 1], reducedMotion ? [1, 1] : [0.85, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.4], reducedMotion ? [1, 1] : [0.2, 1])

  return (
    <div
      ref={containerRef}
      className={cn('relative -mx-2 w-[calc(100%+1rem)] py-4 sm:mx-0 sm:w-full', className)}
    >
      <motion.div
        style={{
          y,
          scale,
          opacity,
          boxShadow:
            '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a',
        }}
        className="relative mx-auto aspect-[4/3] w-full max-w-md overflow-hidden rounded-[var(--radius-xl)] border-2 border-[var(--color-onyx-600)] bg-[var(--color-onyx-800)] p-1.5"
      >
        <div className="size-full overflow-hidden rounded-[calc(var(--radius-xl)-0.35rem)]">{children}</div>
      </motion.div>
    </div>
  )
}
