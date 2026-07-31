import { motion } from 'framer-motion'
import { CheckCircle2, Phone, MessageCircle, Home, CalendarCheck, PhoneCall, Palette } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { fadeUp, staggerContainer } from '@/lib/motion'
import { CONTACT, buildWhatsAppLink, toDialDigits } from '@/lib/navigation'

interface InquirySuccessProps {
  name: string
  referenceId: string
  whatsappUrl: string
  onReset: () => void
}

const NEXT_STEPS = [
  {
    icon: MessageCircle,
    title: 'Send the WhatsApp message',
    description: "We've opened it pre-filled with your details — just hit send from your WhatsApp.",
  },
  {
    icon: CalendarCheck,
    title: 'We review your details',
    description: 'A lead planner studies your vision, date and budget within 24 hours of receiving it.',
  },
  {
    icon: PhoneCall,
    title: 'A discovery call',
    description: 'We reach out on your preferred channel to understand the finer details.',
  },
  {
    icon: Palette,
    title: 'Your concept presentation',
    description: 'We return with a tailored design direction, timeline and estimate.',
  },
]

export function InquirySuccess({ name, referenceId, whatsappUrl, onReset }: InquirySuccessProps) {
  const firstName = name.trim().split(' ')[0] || 'there'

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={staggerContainer}
      className="flex flex-col items-center py-6 text-center"
    >
      <motion.span
        variants={fadeUp}
        className="flex size-16 items-center justify-center rounded-full bg-[var(--color-accent-soft)] text-[var(--color-accent)]"
      >
        <CheckCircle2 className="size-9" aria-hidden="true" />
      </motion.span>

      <motion.h2 variants={fadeUp} className="mt-6 font-serif text-3xl font-semibold sm:text-4xl">
        Almost there, {firstName}.
      </motion.h2>
      <motion.p variants={fadeUp} className="balance mt-3 max-w-md text-sm leading-relaxed text-[var(--color-muted-foreground)] sm:text-base">
        We've opened WhatsApp in a new tab with all your details pre-filled — just hit{' '}
        <span className="font-semibold text-[var(--color-foreground)]">Send</span> from there to
        reach our team. A lead planner will follow up {CONTACT.responseTime.toLowerCase()}.
      </motion.p>

      <motion.div
        variants={fadeUp}
        className="mt-6 rounded-full border border-[var(--color-border)] bg-[var(--color-muted)] px-5 py-2 text-xs font-medium tracking-wide text-[var(--color-muted-foreground)]"
      >
        Reference No. <span className="text-[var(--color-foreground)]">{referenceId}</span>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10 w-full max-w-lg text-left">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]">
          What Happens Next
        </p>
        <ol className="space-y-5">
          {NEXT_STEPS.map((step, i) => (
            <li key={step.title} className="flex items-start gap-4">
              <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-[var(--color-accent)]/40 font-serif text-sm font-semibold text-[var(--color-accent)]">
                {i + 1}
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--color-foreground)]">{step.title}</p>
                <p className="mt-0.5 text-sm text-[var(--color-muted-foreground)]">{step.description}</p>
              </div>
              <step.icon className="ml-auto hidden size-5 shrink-0 text-[var(--color-accent)]/50 sm:block" aria-hidden="true" />
            </li>
          ))}
        </ol>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button href={`tel:${toDialDigits(CONTACT.phone)}`} variant="outline" leftIcon={<Phone className="size-4" />}>
          Call Us Instead
        </Button>
        <Button
          href={whatsappUrl || buildWhatsAppLink(`Hi, I just submitted an inquiry (Ref. ${referenceId}).`)}
          target="_blank"
          rel="noreferrer"
          variant="gold"
          className="shine"
          leftIcon={<MessageCircle className="size-4" />}
        >
          Didn&apos;t open? Tap Here
        </Button>
      </motion.div>

      <motion.div variants={fadeUp} className="mt-6 flex items-center gap-5 text-sm">
        <Button to="/" variant="link" leftIcon={<Home className="size-4" />}>
          Back to Home
        </Button>
        <button
          type="button"
          onClick={onReset}
          className="text-[var(--color-muted-foreground)] underline-offset-4 hover:text-[var(--color-accent)] hover:underline"
        >
          Submit another inquiry
        </button>
      </motion.div>
    </motion.div>
  )
}
