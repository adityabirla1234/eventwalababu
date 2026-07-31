import { useRef } from 'react'
import type { ReactNode } from 'react'
import { Check } from 'lucide-react'
import { motion, useInView } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/home/SectionHeading'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { useMediaQuery } from '@/hooks/use-media-query'
import { EASE_LUXE } from '@/lib/motion'
import { SERVICES } from '@/components/services/content'

/**
 * Fixed (not re-randomized on every render) "random direction" sequence for
 * tablet/desktop, where there's enough width for cards to fly in from any
 * side without colliding with their neighbors mid-flight.
 */
const DESKTOP_DIRECTIONS = [
  'left', 'top', 'right', 'bottom', 'right',
  'left', 'bottom', 'top', 'left', 'right', 'bottom',
] as const

type Direction = (typeof DESKTOP_DIRECTIONS)[number]

const OFFSETS: Record<Direction, { x: number; y: number; rotate: number }> = {
  left: { x: -110, y: 0, rotate: -6 },
  right: { x: 110, y: 0, rotate: 6 },
  top: { x: 0, y: -80, rotate: -3 },
  bottom: { x: 0, y: 80, rotate: 3 },
}

/**
 * One card's scroll-triggered arrival. `whileInView` (IntersectionObserver
 * under the hood) fires identically on touch and pointer devices, so the
 * entrance is guaranteed visible on phones/tablets — it isn't gated behind
 * `:hover`, which touch devices don't reliably send.
 */
function ArrivingCard({
  direction,
  delay,
  children,
}: {
  direction: Direction
  delay: number
  children: ReactNode
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.25 })
  const reducedMotion = useReducedMotion()
  const offset = OFFSETS[direction]

  if (reducedMotion) {
    return (
      <div ref={ref} className="h-full">
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: offset.x, y: offset.y, rotate: offset.rotate, scale: 0.92 }}
      animate={inView ? { opacity: 1, x: 0, y: 0, rotate: 0, scale: 1 } : undefined}
      transition={{ duration: 0.7, delay, ease: EASE_LUXE }}
      className="h-full"
    >
      {children}
    </motion.div>
  )
}

/**
 * Service grid with photography per card. Arrival direction differs by
 * breakpoint: tablet/laptop/desktop get a shuffled mix of directions so
 * cards feel like they're converging from all around the screen; phones
 * (a single column) alternate strictly left/right card by card, which reads
 * more clearly in a narrow one-column layout than a true random mix would.
 */
export function ServiceCards() {
  const isTabletUp = useMediaQuery('(min-width: 640px)')

  return (
    <Section spacing="lg">
      <SectionHeading
        eyebrow="What We Do"
        title="A Full Studio of Celebration Craft"
        description="Every service is led by a dedicated specialist and run to the same standard of precision."
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-6 overflow-x-hidden sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map(({ icon: Icon, title, description, features, image }, i) => {
          const direction: Direction = isTabletUp
            ? DESKTOP_DIRECTIONS[i % DESKTOP_DIRECTIONS.length]
            : i % 2 === 0
              ? 'left'
              : 'right'

          return (
            <ArrivingCard key={title} direction={direction} delay={(i % 3) * 0.08}>
              <motion.div
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.15, ease: 'easeOut' }}
                className="group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] transition-colors duration-500 hover:border-[var(--color-accent)]/50 active:border-[var(--color-accent)]/50"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={image}
                    alt={title}
                    loading="lazy"
                    decoding="async"
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-active:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-onyx-950)]/70 via-transparent to-transparent" />
                  <span
                    className="absolute right-4 top-4 rounded-full bg-black/35 px-2.5 py-1 font-serif text-xs text-white/90 backdrop-blur-sm"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                <div className="flex flex-1 flex-col px-7 pb-7 sm:px-8 sm:pb-8">
                  <div className="relative -mt-7 mb-5 flex size-14 items-center justify-center">
                    <span className="absolute inset-0 rounded-2xl bg-[var(--color-accent)] opacity-0 blur-lg transition-opacity duration-500 group-hover:opacity-20 group-active:opacity-20" />
                    <div className="relative flex size-14 items-center justify-center rounded-2xl bg-[var(--color-accent-soft)] text-[var(--color-accent)] shadow-md shadow-black/10 transition-transform duration-500 group-hover:scale-110 group-active:scale-110">
                      <Icon className="size-6" aria-hidden="true" />
                    </div>
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[var(--color-foreground)] sm:text-2xl">
                    {title}
                  </h3>
                  <span
                    className="mt-3 block h-px w-8 bg-[var(--color-accent)] transition-[width] duration-500 group-hover:w-16 group-active:w-16"
                    aria-hidden="true"
                  />
                  <p className="mt-4 text-sm leading-relaxed text-[var(--color-muted-foreground)]">{description}</p>

                  <ul className="mt-6 space-y-2 border-t border-[var(--color-border)] pt-5">
                    {features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-sm text-[var(--color-muted-foreground)]">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </ArrivingCard>
          )
        })}
      </div>
    </Section>
  )
}
