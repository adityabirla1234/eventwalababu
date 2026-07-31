import { motion } from 'framer-motion'
import { Sparkles, ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { FireworkMotif } from '@/components/home/Illustrations'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const SPARK_POSITIONS = [
  { top: '15%', left: '12%', delay: 0 },
  { top: '30%', left: '82%', delay: 0.6 },
  { top: '68%', left: '20%', delay: 1.2 },
  { top: '75%', left: '70%', delay: 0.3 },
  { top: '10%', left: '55%', delay: 1.6 },
  { top: '55%', left: '92%', delay: 0.9 },
]

export function SpecialEffects() {
  const reducedMotion = useReducedMotion()

  return (
    <Section
      as="section"
      spacing="xl"
      fullBleed
      containerSize="full"
      className="relative isolate overflow-hidden bg-[var(--color-onyx-950)] text-cream-50"
    >
      {/* Fixed dark theatrical backdrop — independent of the light/dark toggle by design */}
      <div className="pointer-events-none absolute inset-0">
        <div className="noise-overlay absolute inset-0 opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgb(226_175_56_/_10%)_0%,_transparent_65%)]" />
        {!reducedMotion &&
          SPARK_POSITIONS.map((s, i) => (
            <motion.span
              key={i}
              className="absolute size-1 rounded-full bg-[var(--color-gold-300)]"
              style={{ top: s.top, left: s.left }}
              animate={{ opacity: [0, 1, 0], scale: [0.5, 1.4, 0.5] }}
              transition={{ duration: 2.4, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
            />
          ))}
      </div>

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 py-4 sm:px-8 lg:grid-cols-2 lg:px-12">
        <div>
          <Reveal
            variant="fade"
            className="mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-400)]"
          >
            <Sparkles className="size-3.5" />
            Special Effects
          </Reveal>
          <Reveal
            as="h2"
            delay={0.1}
            className="balance font-serif text-4xl font-semibold leading-[1.1] text-white sm:text-5xl"
          >
            The finale everyone remembers.
          </Reveal>
          <Reveal
            delay={0.2}
            className="balance mt-6 max-w-md text-base leading-relaxed text-white/65 sm:text-lg"
          >
            Licensed pyrotechnics, cold spark entries, and choreographed light &mdash; every
            effect timed to the beat and cleared to your venue&rsquo;s safety standard. This is
            the moment your guests will describe for years.
          </Reveal>
          <Reveal delay={0.3} className="mt-9">
            <Button
              to="/inquiry"
              variant="gold"
              size="lg"
              className="shine"
              rightIcon={<ArrowRight className="size-4" />}
            >
              Plan the Finale
            </Button>
          </Reveal>
        </div>

        <Reveal variant="scale" delay={0.15} className="mx-auto text-[var(--color-gold-400)]">
          <FireworkMotif className="h-72 w-72 sm:h-96 sm:w-96" />
        </Reveal>
      </div>
    </Section>
  )
}
