import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { SIGNATURE_SERVICES } from '@/components/home/content'
import { EASE_LUXE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { cn } from '@/lib/utils'

const MotionLink = motion(Link)
const CARD_GAP = 16 // px, matches gap-4 below

export function SignatureServices() {
  const [activeIdx, setActiveIdx] = useState<number | null>(null)
  const active = activeIdx !== null ? SIGNATURE_SERVICES[activeIdx] : null
  const defaultService = SIGNATURE_SERVICES[0]

  return (
    <Section spacing="lg" tone="muted">
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="What We Do"
            title="Signature Services"
            description="A full programme of craft, from the first mandap sketch to the last spark of the finale."
          />

          {/* Desktop/tablet-with-hover only: image preview swaps as you hover a line item below. */}
          <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] lg:block">
            <AnimatePresence mode="wait">
              <motion.img
                key={active?.title ?? defaultService.title}
                src={(active ?? defaultService).imgUrl}
                alt={(active ?? defaultService).title}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE_LUXE }}
                className="absolute inset-0 size-full object-cover"
              />
            </AnimatePresence>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-onyx-950)]/85 via-[var(--color-onyx-950)]/5 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <AnimatePresence mode="wait">
                <motion.div
                  key={(active ?? defaultService).title}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: EASE_LUXE }}
                >
                  {(() => {
                    const Icon = (active ?? defaultService).icon
                    return <Icon className="mb-2 size-6 text-[var(--color-gold-300)]" aria-hidden="true" />
                  })()}
                  <p className="font-serif text-lg text-white">
                    {active ? active.title : 'Hover a line to preview'}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Mobile/small-tablet only: a swipeable card carousel takes the
              place of the hover preview above — hover has no touch
              equivalent, so the imagery, icon and focus effect are driven
              by the swipe gesture itself instead. */}
          <ServiceCarouselMobile />
        </div>

        <div className="hidden lg:col-span-8 lg:block">
          <ul className="divide-y divide-[var(--color-border)] border-y border-[var(--color-border)]">
            {SIGNATURE_SERVICES.map((service, i) => (
              <Reveal key={service.title} as="li" delay={i * 0.04}>
                <Link
                  to={service.href}
                  onMouseEnter={() => setActiveIdx(i)}
                  onMouseLeave={() => setActiveIdx(null)}
                  className="shine group flex items-center gap-5 py-5 transition-colors duration-300 hover:bg-[var(--color-card)] sm:gap-8 sm:py-6"
                >
                  <span className="font-serif text-sm text-[var(--color-accent)] sm:text-base">
                    {service.index}
                  </span>
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors duration-300 group-hover:border-[var(--color-accent)] group-hover:text-[var(--color-accent)]">
                    <service.icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="flex-1">
                    <span className="block font-serif text-xl text-[var(--color-foreground)] transition-colors duration-300 group-hover:text-[var(--color-accent)] sm:text-2xl">
                      {service.title}
                    </span>
                    <span className="mt-1 hidden text-sm text-[var(--color-muted-foreground)] sm:block">
                      {service.description}
                    </span>
                  </span>
                  <ArrowUpRight className="size-5 shrink-0 -translate-x-1 text-[var(--color-muted-foreground)] opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:text-[var(--color-accent)] group-hover:opacity-100" />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

/**
 * Touch-first replacement for the hover-driven list on mobile/small tablet.
 * The "focus" effect that hover normally provides (dim + shrink everything
 * but the active item) is instead driven by scroll position: as a card
 * centers itself via scroll-snap, it scales/brightens up and its neighbors
 * recede — so the premium, alive feel comes from the swipe gesture itself.
 * Also auto-advances every 2s, pausing for as long as a finger is on a
 * card and resuming (with a fresh 2s delay) on release.
 */
function ServiceCarouselMobile() {
  const reducedMotion = useReducedMotion()
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [isHeld, setIsHeld] = useState(false)

  function getStep() {
    const scroller = scrollerRef.current
    const firstCard = scroller?.firstElementChild as HTMLElement | null
    if (!scroller || !firstCard) return null
    return { scroller, step: firstCard.offsetWidth + CARD_GAP }
  }

  function handleScroll() {
    const measured = getStep()
    if (!measured) return
    const index = Math.round(measured.scroller.scrollLeft / measured.step)
    setActiveIndex(Math.min(Math.max(index, 0), SIGNATURE_SERVICES.length - 1))
  }

  function scrollToIndex(index: number) {
    const measured = getStep()
    if (!measured) return
    measured.scroller.scrollTo({ left: index * measured.step, behavior: 'smooth' })
  }

  // Auto-advance every 2s. Pauses the instant a finger/pointer touches a
  // card and picks back up (with a fresh 2s delay) once it's released —
  // manual swipes still drive `activeIndex` via `handleScroll` in the
  // meantime, so auto-advance always continues from wherever the user left it.
  useEffect(() => {
    if (reducedMotion || isHeld) return
    const id = setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % SIGNATURE_SERVICES.length
        scrollToIndex(next)
        return next
      })
    }, 2000)
    return () => clearInterval(id)
  }, [reducedMotion, isHeld])

  return (
    <div className="mt-8 lg:hidden">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        onPointerDown={() => setIsHeld(true)}
        onPointerUp={() => setIsHeld(false)}
        onPointerCancel={() => setIsHeld(false)}
        onPointerLeave={() => setIsHeld(false)}
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8"
      >
        {SIGNATURE_SERVICES.map((service, i) => (
          <Reveal
            key={service.title}
            variant="up"
            amount={0.3}
            delay={i * 0.05}
            className="w-[76vw] max-w-[19rem] shrink-0 snap-center"
          >
            <div
              className={cn(
                'origin-center transition-[transform,opacity] duration-300 ease-out',
                activeIndex === i ? 'scale-100 opacity-100' : 'scale-[0.93] opacity-55',
              )}
            >
              <MotionLink
                to={service.href}
                whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                className="group relative block aspect-[3/4] overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] shadow-lg shadow-black/20"
              >
                <img
                  src={service.imgUrl}
                  alt={service.title}
                  loading="lazy"
                  className="absolute inset-0 size-full object-cover"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-onyx-950)]/92 via-[var(--color-onyx-950)]/30 to-[var(--color-onyx-950)]/5" />
                <div className="relative flex h-full flex-col justify-between p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-sm text-[var(--color-gold-300)]">{service.index}</span>
                    <span className="flex size-10 items-center justify-center rounded-full border border-white/25 bg-white/10 text-white backdrop-blur-sm">
                      <service.icon className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                  <div>
                    <p className="font-serif text-2xl leading-[1.1] text-white">{service.title}</p>
                    <p className="mt-2 text-sm leading-relaxed text-white/70">{service.description}</p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-gold-300)]">
                      Explore
                      <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </span>
                  </div>
                </div>
              </MotionLink>
            </div>
          </Reveal>
        ))}
        {/* Trailing spacer so the last card can reach center */}
        <div className="shrink-0" style={{ width: 'calc(12vw)' }} aria-hidden="true" />
      </div>

      <div className="mt-4 flex items-center justify-center gap-1.5" aria-hidden="true">
        {SIGNATURE_SERVICES.map((service, i) => (
          <span
            key={service.title}
            className={cn(
              'h-1 rounded-full transition-all duration-300',
              activeIndex === i ? 'w-6 bg-[var(--color-accent)]' : 'w-1.5 bg-[var(--color-border)]',
            )}
          />
        ))}
      </div>
    </div>
  )
}
