import { ArrowRight } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { Reveal } from '@/components/motion/Reveal'
import { OrnamentGlyph } from '@/components/home/Illustrations'

export function LuxuryCTA() {
  return (
    <Section spacing="xl" tone="inverse" className="relative overflow-hidden text-center">
      <div className="noise-overlay pointer-events-none absolute inset-0 opacity-40" />
      <div className="relative mx-auto max-w-2xl">
        <Reveal variant="scale" className="mx-auto mb-6 text-[var(--color-gold-400)]">
          <OrnamentGlyph className="mx-auto size-6" />
        </Reveal>
        <Reveal
          as="h2"
          delay={0.1}
          className="balance font-serif text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl"
        >
          Your celebration deserves a single, unwavering standard.
        </Reveal>
        <Reveal
          delay={0.2}
          className="balance mx-auto mt-6 max-w-lg text-base leading-relaxed opacity-70 sm:text-lg"
        >
          Tell us the date. We&rsquo;ll bring the design, the craft, and the calm.
        </Reveal>
        <Reveal delay={0.3} className="mt-10">
          <Button
            to="/inquiry"
            variant="gold"
            size="lg"
            className="shine"
            rightIcon={<ArrowRight className="size-4" />}
          >
            Begin Your Story
          </Button>
        </Reveal>
      </div>
    </Section>
  )
}
