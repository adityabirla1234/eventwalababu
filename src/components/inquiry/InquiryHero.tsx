import { motion } from 'framer-motion'
import { Section } from '@/components/ui/Section'
import { Breadcrumb } from '@/components/ui/Breadcrumb'
import { Reveal } from '@/components/motion/Reveal'
import { OrnamentGlyph, GoldenThread } from '@/components/home/Illustrations'
import { TrustIndicators } from '@/components/shared/TrustIndicators'
import { INQUIRY_TRUST_POINTS } from '@/components/inquiry/content'
import { fadeUp } from '@/lib/motion'

/** Theatrical hero for the Inquiry route — sets a "private consultation" tone, not a contact form. */
export function InquiryHero() {
  return (
    <Section spacing="xl" tone="muted" className="relative overflow-hidden pt-36 pb-0 text-center sm:pt-44">
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[28rem] bg-[radial-gradient(ellipse_at_top,_var(--color-accent)_0%,_transparent_60%)] opacity-[0.08]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute inset-x-0 top-20 -z-10 text-[var(--color-accent)]/30">
        <GoldenThread className="mx-auto h-20 w-[120%] sm:h-28" />
      </div>

      <motion.div initial="hidden" animate="show" variants={fadeUp} className="mx-auto max-w-2xl">
        <Breadcrumb className="mb-6" />

        <Reveal variant="fade" className="mb-5 flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-[var(--color-accent)]">
          <OrnamentGlyph className="size-3.5" />
          Private Consultation
        </Reveal>

        <h1 className="balance text-4xl font-semibold leading-[1.1] sm:text-5xl lg:text-6xl">
          Begin Your <span className="text-gradient-gold">Celebration</span>
        </h1>
        <p className="balance mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg">
          A few thoughtful questions, four minutes of your time — and a lead planner will
          design a consultation around exactly what you have in mind.
        </p>

        <div className="mt-12">
          <TrustIndicators points={INQUIRY_TRUST_POINTS} />
        </div>
      </motion.div>
    </Section>
  )
}
