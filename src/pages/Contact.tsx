import { Mail, Phone, MessageCircle, MapPin } from 'lucide-react'
import { PageHero } from '@/components/PageHero'
import { PageCTA } from '@/components/PageCTA'
import { Seo } from '@/components/Seo'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { Reveal } from '@/components/motion/Reveal'
import { TrustIndicators } from '@/components/shared/TrustIndicators'
import { GoogleMap } from '@/components/shared/GoogleMap'
import { BusinessInfo } from '@/components/shared/BusinessInfo'
import { FloatingHelpCard } from '@/components/shared/FloatingHelpCard'
import { CONTACT_TRUST_POINTS, CONTACT_FAQS } from '@/components/contact/content'
import { CONTACT, buildWhatsAppLink, toDialDigits } from '@/lib/navigation'

const CHANNELS = [
  {
    icon: Phone,
    label: 'Call Us',
    value: CONTACT.phone,
    href: `tel:${toDialDigits(CONTACT.phone)}`,
    cta: 'Call Now',
    variant: 'primary' as const,
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: CONTACT.whatsapp,
    href: buildWhatsAppLink(),
    cta: 'Message Us',
    variant: 'gold' as const,
    external: true,
  },
  {
    icon: Mail,
    label: 'Email',
    value: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    cta: 'Send Email',
    variant: 'outline' as const,
  },
]

export default function Contact() {
  return (
    <>
      <Seo
        title="Contact Us — Wedding Planner in Sanawad"
        description="Reach EventWalaBabu directly by phone, WhatsApp or email, or visit our Sanawad studio serving Barwaha, Khargone and the Nimad region. A lead planner replies within 24 hours."
        path="/contact"
      />
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Reach out directly for a quick question, or use the inquiry form when you're ready for full event planning."
      />

      <Section spacing="md">
        <TrustIndicators points={CONTACT_TRUST_POINTS} className="mx-auto max-w-4xl" />
      </Section>

      <Section spacing="lg" tone="muted">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-3">
          {CHANNELS.map(({ icon: Icon, label, value, href, cta, variant, external }, i) => (
            <Reveal key={label} delay={i * 0.08}>
              <Card variant="bordered" className="flex h-full flex-col items-center text-center">
                <div className="mx-auto mb-3 flex size-11 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]">
                  <Icon className="size-5" aria-hidden="true" />
                </div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[var(--color-muted-foreground)]">
                  {label}
                </p>
                <p className="mt-1 text-sm font-medium text-[var(--color-foreground)]">{value}</p>
                <Button
                  href={href}
                  {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
                  variant={variant}
                  size="sm"
                  className="mt-5 w-full"
                >
                  {cta}
                </Button>
              </Card>
            </Reveal>
          ))}
        </div>
      </Section>

      <Section spacing="lg">
        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-5">
          <Reveal variant="fade" className="lg:col-span-3">
            <GoogleMap heightClassName="h-72 sm:h-full" className="h-full" />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <BusinessInfo className="h-full" />
          </Reveal>
        </div>
        <p className="mx-auto mt-4 flex max-w-5xl items-center justify-center gap-1.5 text-center text-xs text-[var(--color-muted-foreground)] lg:justify-start">
          <MapPin className="size-3.5 shrink-0" aria-hidden="true" />
          {CONTACT.addressLine}
        </p>
      </Section>

      <FaqAccordion eyebrow="Common Questions" title="Reaching Us" items={CONTACT_FAQS} />

      <PageCTA
        title="Prefer to start with the full picture?"
        description="Use our inquiry form to share your date, guest count and vision — a lead planner will respond within 24 hours."
        buttonLabel="Go to Inquiry Form"
        buttonTo="/inquiry"
      />

      <FloatingHelpCard />
    </>
  )
}
