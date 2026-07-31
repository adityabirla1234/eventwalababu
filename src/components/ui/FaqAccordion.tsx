import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Plus } from 'lucide-react'
import { Section, type SectionTone } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { EASE_LUXE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { buildFaqSchema } from '@/lib/structured-data'

export interface FaqItem {
  question: string
  answer: string
}

function FaqRow({ question, answer, index }: FaqItem & { index: number }) {
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <Reveal as="li" delay={index * 0.05} className="border-b border-[var(--color-border)]">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-6 py-6 text-left"
      >
        <span className="flex items-baseline gap-4">
          <span className="font-serif text-sm text-[var(--color-accent)]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-serif text-lg text-[var(--color-foreground)] sm:text-xl">{question}</span>
        </span>
        <motion.span
          animate={{ rotate: open ? 135 : 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE_LUXE }}
          className="flex size-8 shrink-0 items-center justify-center rounded-full border border-[var(--color-border)] text-[var(--color-foreground)]"
        >
          <Plus className="size-3.5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: reducedMotion ? 0 : 0.4, ease: EASE_LUXE }}
            className="overflow-hidden"
          >
            <p className="balance max-w-2xl pb-6 pl-[2.6rem] text-sm leading-relaxed text-[var(--color-muted-foreground)] sm:text-base">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </Reveal>
  )
}

interface FaqAccordionProps {
  eyebrow: string
  title: string
  description?: string
  items: readonly FaqItem[]
  tone?: SectionTone
}

/**
 * Two-column FAQ section (heading + accordion list) reused across the homepage,
 * Contact and Inquiry. Also emits FAQPage structured data for every instance,
 * so any page using this component automatically becomes eligible for FAQ
 * rich results — no per-page schema wiring required.
 */
export function FaqAccordion({ eyebrow, title, description, items, tone = 'muted' }: FaqAccordionProps) {
  return (
    <Section spacing="lg" tone={tone}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(buildFaqSchema(items))}</script>
      </Helmet>
      <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        </div>
        <div className="lg:col-span-8">
          <ul className="border-t border-[var(--color-border)]">
            {items.map((faq, i) => (
              <FaqRow key={faq.question} index={i} {...faq} />
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
