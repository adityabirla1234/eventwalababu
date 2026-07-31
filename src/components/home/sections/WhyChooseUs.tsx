import { useEffect, useRef, useState } from 'react'
import { motion, useInView, animate } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { WHY_CHOOSE_US } from '@/components/home/content'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

function CountUpStat({ value, suffix, label, description, delay }: (typeof WHY_CHOOSE_US)[number] & { delay: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const reducedMotion = useReducedMotion()
  const [display, setDisplay] = useState(reducedMotion ? value : 0)

  useEffect(() => {
    if (!inView || reducedMotion) return
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    })
    return () => controls.stop()
  }, [inView, value, delay, reducedMotion])

  return (
    <div className="py-8 first:pt-0">
      <motion.span
        ref={ref}
        className="font-serif text-5xl font-semibold text-[var(--color-foreground)] sm:text-6xl"
      >
        {display}
        <span className="text-[var(--color-accent)]">{suffix}</span>
      </motion.span>
      <p className="mt-3 text-sm font-semibold uppercase tracking-[0.2em] text-[var(--color-foreground)]">
        {label}
      </p>
      <p className="mt-1.5 max-w-[22ch] text-sm leading-relaxed text-[var(--color-muted-foreground)]">
        {description}
      </p>
    </div>
  )
}

export function WhyChooseUs() {
  return (
    <Section spacing="lg" tone="muted">
      <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-4">
          <SectionHeading
            eyebrow="Why Choose Us"
            title="Precision, taste, and a team that answers the phone."
          />
          <Reveal
            delay={0.15}
            className="balance mt-6 max-w-sm text-base leading-relaxed text-[var(--color-muted-foreground)]"
          >
            &ldquo;We don&rsquo;t just decorate a venue &mdash; we choreograph an evening. That
            difference is why most of our clients arrive through a referral, not an ad.&rdquo;
          </Reveal>
          <Reveal delay={0.25} className="mt-4 text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
            &mdash; Founder&rsquo;s Note
          </Reveal>
        </div>

        <div className="lg:col-span-8">
          <div className="grid grid-cols-1 divide-y divide-[var(--color-border)] sm:grid-cols-2 sm:divide-y-0 sm:gap-x-10">
            {WHY_CHOOSE_US.map((stat, i) => (
              <div key={stat.label} className={i % 2 === 1 ? 'sm:pl-10 sm:border-l sm:border-[var(--color-border)]' : ''}>
                <CountUpStat {...stat} delay={i * 0.1} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  )
}
