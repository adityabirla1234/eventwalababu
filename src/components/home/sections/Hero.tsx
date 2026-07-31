import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight, PlayCircle } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { HeroFireworks } from '@/components/home/HeroFireworks'
import { HeroBrandBurst } from '@/components/home/HeroBrandBurst'
import { HeroLoopVideo } from '@/components/home/HeroLoopVideo'
import { ContainerScrollCompact } from '@/components/ui/container-scroll-animation'
import { EASE_LUXE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const HEADLINE_LINE_1 = ['Celebrations,']
const HEADLINE_LINE_2 = ['Curated', 'to', 'Perfection.']

function KineticHeadline() {
  const reducedMotion = useReducedMotion()

  const word = (text: string, i: number, base: number) => (
    <motion.span
      key={text + i}
      className="inline-block"
      initial={reducedMotion ? undefined : { opacity: 0, y: '110%' }}
      animate={reducedMotion ? undefined : { opacity: 1, y: '0%' }}
      transition={{ duration: 0.9, ease: EASE_LUXE, delay: base + i * 0.09 }}
    >
      {text}
      {i < 100 ? '\u00A0' : ''}
    </motion.span>
  )

  return (
    <h1 className="text-5xl font-semibold leading-[1.03] tracking-tight sm:text-6xl lg:text-[5.25rem]">
      <span className="block overflow-hidden pb-1">
        {HEADLINE_LINE_1.map((w, i) => word(w, i, 0.15))}
      </span>
      <span className="block overflow-hidden pb-1 text-gradient-gold">
        {HEADLINE_LINE_2.map((w, i) => word(w, i, 0.32))}
      </span>
    </h1>
  )
}

/**
 * Small floating panel representing one "moment" in the celebration —
 * a real photo filling the frame, with the caption legible over a bottom
 * gradient scrim.
 */
function MomentPanel({
  label,
  imgUrl,
  imgAlt,
  className,
  delay = 0,
}: {
  label: string
  imgUrl: string
  imgAlt: string
  className?: string
  delay?: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay, ease: EASE_LUXE }}
      className={`noise-overlay relative flex flex-col justify-end overflow-hidden rounded-[var(--radius-xl)] border border-[var(--color-border)] bg-[var(--color-card)] shadow-xl shadow-black/10 ${className ?? ''}`}
    >
      <img src={imgUrl} alt={imgAlt} loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-onyx-950)]/85 via-[var(--color-onyx-950)]/10 to-transparent" />
      <p className="relative p-5 font-serif text-sm tracking-wide text-white">{label}</p>
    </motion.div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, { stiffness: 60, damping: 20, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 60, damping: 20, mass: 0.6 })
  const rotateX = useTransform(sy, [-40, 40], [3, -3])
  const rotateY = useTransform(sx, [-40, 40], [-3, 3])
  const shiftX = useTransform(sx, (v) => v * 0.4)
  const shiftY = useTransform(sy, (v) => v * 0.4)

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reducedMotion || !containerRef.current) return
    const rect = containerRef.current.getBoundingClientRect()
    mx.set(((e.clientX - rect.left) / rect.width - 0.5) * 80)
    my.set(((e.clientY - rect.top) / rect.height - 0.5) * 80)
  }

  function handlePointerLeave() {
    mx.set(0)
    my.set(0)
  }

  return (
    <Section
      as="header"
      spacing="none"
      fullBleed
      className="relative isolate overflow-hidden bg-[var(--color-background)] pt-52 pb-20 sm:pt-60 sm:pb-28 lg:min-h-[92vh] lg:pt-64"
    >
      {/* Ambient gradient field — stands in for a cinematic backdrop plate */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 -right-1/4 size-[60vw] rounded-full bg-[radial-gradient(circle,_var(--color-gold-200)_0%,_transparent_70%)] opacity-60 animate-drift dark:opacity-20" />
        <div className="absolute -bottom-1/3 -left-1/4 size-[55vw] rounded-full bg-[radial-gradient(circle,_var(--color-onyx-200)_0%,_transparent_70%)] opacity-40 animate-drift [animation-delay:-6s] dark:opacity-10" />
        <div className="noise-overlay absolute inset-0" />
        {/* One-time welcome firework burst, plays when the page is first landed on */}
        <HeroFireworks className="absolute inset-0" />
      </div>

      {/* Signature moment: a firework launches from the base of the hero,
          bursts just below the fixed navbar, and the burst resolves into
          a small cluster of pinned sticky notes. Runs on every device. */}
      <HeroBrandBurst className="pointer-events-none absolute inset-0" />

      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 lg:px-12"
      >
        {/* Text column */}
        <div className="min-w-0">
          <KineticHeadline />

          <Reveal
            delay={0.55}
            className="balance mt-6 max-w-lg text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg"
          >
            We design weddings and milestone celebrations with the precision of fine
            hospitality — every stage, thread of light and note of music considered as
            one composition.
          </Reveal>

          <Reveal delay={0.65} className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              to="/inquiry"
              variant="gold"
              size="lg"
              rightIcon={<ArrowRight className="size-4" />}
            >
              Start Planning
            </Button>
            <Button to="/gallery" variant="outline" size="lg" leftIcon={<PlayCircle className="size-4" />}>
              View Our Work
            </Button>
          </Reveal>

          <Reveal
            delay={0.8}
            className="mt-14 flex flex-wrap items-center gap-x-10 gap-y-4 border-t border-[var(--color-border)] pt-8 text-sm text-[var(--color-muted-foreground)]"
          >
            <span>
              <strong className="font-serif text-lg text-[var(--color-foreground)]">6+</strong> years of craft
            </span>
            <span>
              <strong className="font-serif text-lg text-[var(--color-foreground)]">450+</strong> celebrations
            </span>
            <span>
              <strong className="font-serif text-lg text-[var(--color-foreground)]">18</strong> cities
            </span>
          </Reveal>
        </div>

        {/* Collage column — real photography panels. lg+ only: on mobile/
            small-tablet this is replaced below by a single compact
            scroll-reveal card so the hero doesn't stack three tall images. */}
        <motion.div
          style={
            reducedMotion
              ? undefined
              : { rotateX, rotateY, x: shiftX, y: shiftY, transformPerspective: 1000 }
          }
          className="relative mx-auto hidden w-full max-w-md grid-cols-2 gap-4 sm:gap-5 lg:grid"
        >
          <MomentPanel
            label=""
            imgUrl="https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0009.jpg?updatedAt=1785477261666"
            imgAlt="Guests seated beneath a red and white floral mandap"
            className="col-span-2 aspect-[16/10]"
            delay={0.5}
          />
          <MomentPanel
            label=""
            imgUrl="https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0001.jpg?updatedAt=1785477263376"
            imgAlt="Bright orange marigold flowers used in wedding decor"
            className="aspect-[4/5]"
            delay={0.65}
          />
          <MomentPanel
            label=""
            imgUrl="https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0005.jpg?updatedAt=1785477260066"
            imgAlt="String lights glowing in a gazebo at night"
            className="aspect-[4/5]"
            delay={0.8}
          />
        </motion.div>

        {/* Mobile / small-tablet only: the same scroll-reveal card used
            after "Our Story" on this page, moved up here in place of the
            image collage above — sized to its own footprint (no 115vh
            scroll runway) so it stays compact. Hidden again at lg+, where
            the original still lives further down the page. */}
        <div className="lg:hidden">
          <Reveal className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-400)]">
              6+ Years In
            </p>
            <p className="mt-2 font-serif text-2xl font-semibold text-[var(--color-foreground)] sm:text-3xl">
              Every room, one obsession.
            </p>
          </Reveal>
          <ContainerScrollCompact className="mt-6">
            <HeroLoopVideo
              variant="mobile"
              className="size-full"
              poster="https://images.unsplash.com/photo-1745573673043-43a4f3b91466?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0"
            />
          </ContainerScrollCompact>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 hidden justify-center sm:flex">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex flex-col items-center gap-2 text-[var(--color-muted-foreground)]"
        >
          <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
          <motion.span
            className="h-10 w-px bg-[var(--color-border)]"
            animate={reducedMotion ? undefined : { scaleY: [0.3, 1, 0.3] }}
            style={{ transformOrigin: 'top' }}
            transition={{ duration: 2.2, repeat: Infinity, ease: EASE_LUXE }}
          />
        </motion.div>
      </div>
    </Section>
  )
}
