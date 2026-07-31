import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { SectionHeading } from '@/components/home/SectionHeading'
import { TESTIMONIALS } from '@/components/home/content'
import { EASE_LUXE } from '@/lib/motion'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)
  const total = TESTIMONIALS.length
  const current = TESTIMONIALS[index]

  function go(next: number) {
    setDirection(next > index || (index === total - 1 && next === 0) ? 1 : -1)
    setIndex((next + total) % total)
  }

  return (
    <Section spacing="lg" tone="muted">
      <SectionHeading eyebrow="Testimonials" title="In Their Words" align="center" />

      <div className="relative mx-auto mt-14 max-w-3xl">
        <Quote className="mx-auto mb-6 size-8 text-[var(--color-accent)]/40" aria-hidden="true" />

        <div className="relative min-h-[220px] sm:min-h-[180px]">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.figure
              key={index}
              custom={direction}
              initial={{ opacity: 0, x: direction * 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -40 }}
              transition={{ duration: 0.5, ease: EASE_LUXE }}
              className="text-center"
            >
              <blockquote className="balance font-serif text-2xl leading-snug text-[var(--color-foreground)] sm:text-3xl">
                &ldquo;{current.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6">
                <p className="text-sm font-semibold text-[var(--color-foreground)]">{current.name}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-[var(--color-muted-foreground)]">
                  {current.role}
                </p>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-center gap-6">
          <button
            type="button"
            onClick={() => go(index - 1)}
            aria-label="Previous testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <ArrowLeft className="size-4" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                onClick={() => go(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className="group flex h-4 items-center"
              >
                <span
                  className={`block h-px rounded-full bg-[var(--color-accent)] transition-all duration-500 ${
                    i === index ? 'w-8 opacity-100' : 'w-3 opacity-30 group-hover:opacity-60'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => go(index + 1)}
            aria-label="Next testimonial"
            className="flex size-11 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors hover:border-[var(--color-accent)] hover:text-[var(--color-accent)]"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </Section>
  )
}
