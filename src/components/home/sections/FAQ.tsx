import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { FAQS } from '@/components/home/content'

/** Homepage FAQ — thin wrapper around the shared accordion (also emits FAQPage schema). */
export function FAQ() {
  return (
    <FaqAccordion
      eyebrow="Good to Know"
      title="Frequently Asked"
      description="Answers to the questions we hear most before a first design conversation."
      items={FAQS}
    />
  )
}
