import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { Typewriter } from '@/components/motion/Typewriter'
import { SectionHeading } from '@/components/home/SectionHeading'
import { Founders } from '@/components/about/Founders'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import { HeroLoopVideo } from '@/components/home/HeroLoopVideo'
import { EASE_LUXE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const MotionLink = motion(Link)

const MARGIN_NOTES = [
  { label: 'Founded', value: '2019, Sanawad' },
  { label: 'Studio', value: 'Design & Production' },
  { label: 'Serving', value: 'Pan India' },
]

export function AboutPreview() {
  const reducedMotion = useReducedMotion()

  return (
    <Section spacing="lg">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <SectionHeading
            eyebrow="Our Story"
            title={<Typewriter text="A studio built on one obsession: the way a room feels the moment it's finished." />}
          />

          {/* Draw-in accent line — a small, scroll-triggered motion cue that
              doesn't depend on hover, so it reads on touch devices too. */}
          <svg width="120" height="4" viewBox="0 0 120 4" className="mt-5" aria-hidden="true">
            <motion.line
              x1="2"
              y1="2"
              x2="118"
              y2="2"
              stroke="var(--color-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={reducedMotion ? undefined : { pathLength: 0, opacity: 0 }}
              whileInView={reducedMotion ? undefined : { pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.8, ease: EASE_LUXE, delay: 0.3 }}
            />
          </svg>

          <Reveal
            delay={0.15}
            className="balance mt-6 max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg"
          >
            EventWalaBabu began with a single wedding stage and a belief that celebration
            design deserves the same rigor as architecture. Today our studio of designers,
            decorators and choreographers plans weddings, galas and milestones with a shared
            standard: nothing arrives unconsidered.
          </Reveal>
          <Reveal delay={0.25} className="mt-8">
            <MotionLink
              to="/about"
              whileTap={reducedMotion ? undefined : { scale: 0.96 }}
              className="group inline-flex items-center gap-2 border-b border-[var(--color-accent)] pb-1 font-serif text-lg text-[var(--color-foreground)] transition-colors hover:text-[var(--color-accent)]"
            >
              Read Our Story
              <motion.span
                className="flex"
                animate={reducedMotion ? undefined : { x: [0, 5, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              >
                <ArrowUpRight className="size-4 transition-transform duration-300 group-hover:-translate-y-1" />
              </motion.span>
            </MotionLink>
          </Reveal>
        </div>

        <div className="lg:col-span-5 lg:pl-6">
          <Founders />
          <dl className="mt-8 space-y-0">
            {MARGIN_NOTES.map((note, i) => (
              <Reveal key={note.label} delay={0.1 + i * 0.08}>
                <div className="flex items-baseline justify-between gap-4 py-4">
                  <dt className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-muted-foreground)]">
                    {note.label}
                  </dt>
                  <dd className="text-right font-serif text-base text-[var(--color-foreground)]">
                    {note.value}
                  </dd>
                </div>
                {i < MARGIN_NOTES.length - 1 && <div className="rule-gold" />}
              </Reveal>
            ))}
          </dl>
        </div>
      </div>

      {/* lg+ only: below this, the same "story in one scroll-reveal card"
          moment is shown up in the Hero instead (compact, no scroll runway),
          so it isn't duplicated on mobile/small tablets. */}
      <ContainerScroll
        className="hidden lg:flex"
        titleComponent={
          <>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-400)] sm:text-sm">
              6+ Years In
            </p>
            <p className="mt-3 font-serif text-3xl font-semibold leading-tight text-[var(--color-foreground)] sm:text-5xl lg:text-6xl">
              Every room, one obsession.
            </p>
          </>
        }
      >
        <HeroLoopVideo
          variant="desktop"
          className="size-full"
          poster="https://images.unsplash.com/photo-1745573673043-43a4f3b91466?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.1.0"
        />
      </ContainerScroll>
    </Section>
  )
}
