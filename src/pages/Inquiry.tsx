import { useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ArrowRight, Send } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Seo } from '@/components/Seo'
import { FaqAccordion } from '@/components/ui/FaqAccordion'
import { InquiryHero } from '@/components/inquiry/InquiryHero'
import { StepIndicator } from '@/components/inquiry/StepIndicator'
import { StepEventDetails } from '@/components/inquiry/steps/StepEventDetails'
import { StepBudgetVision } from '@/components/inquiry/steps/StepBudgetVision'
import { StepContactInfo } from '@/components/inquiry/steps/StepContactInfo'
import { StepReview } from '@/components/inquiry/steps/StepReview'
import { InquirySuccess } from '@/components/inquiry/InquirySuccess'
import { INQUIRY_FAQS } from '@/components/inquiry/content'
import {
  inquirySchema,
  STEP_FIELDS,
  STEP_LABELS,
  DEFAULT_INQUIRY_VALUES,
  buildInquiryMessage,
  type InquiryFormValues,
} from '@/lib/validations/inquiry'
import { buildWhatsAppLink } from '@/lib/navigation'
import { EASE_LUXE } from '@/lib/motion'

const TOTAL_STEPS = STEP_LABELS.length

const stepVariants = {
  enter: (direction: number) => ({ opacity: 0, x: direction >= 0 ? 32 : -32 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction >= 0 ? -32 : 32 }),
}

function generateReferenceId() {
  return `EWB-${Date.now().toString(36).toUpperCase()}`
}

export default function Inquiry() {
  const methods = useForm<InquiryFormValues>({
    resolver: zodResolver(inquirySchema),
    defaultValues: DEFAULT_INQUIRY_VALUES,
    mode: 'onBlur',
  })
  const { handleSubmit, trigger, getValues } = methods

  const [step, setStep] = useState(1)
  const [direction, setDirection] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [referenceId, setReferenceId] = useState('')
  const [whatsappUrl, setWhatsappUrl] = useState('')

  async function goNext() {
    const valid = await trigger(STEP_FIELDS[step])
    if (!valid) return
    setDirection(1)
    setStep((s) => Math.min(s + 1, TOTAL_STEPS))
  }

  function goBack() {
    setDirection(-1)
    setStep((s) => Math.max(s - 1, 1))
  }

  function editStep(target: number) {
    setDirection(target < step ? -1 : 1)
    setStep(target)
  }

  function handleFormKeyDown(e: React.KeyboardEvent<HTMLFormElement>) {
    if (e.key === 'Enter' && step !== TOTAL_STEPS) {
      e.preventDefault()
      void goNext()
    }
  }

  async function onSubmit(values: InquiryFormValues) {
    const refId = generateReferenceId()
    const message = buildInquiryMessage(values, refId)
    const link = buildWhatsAppLink(message)

    // No backend/API by design: this opens a pre-filled WhatsApp chat to the
    // studio's own number and the person sends it themselves from there.
    // Opened synchronously (before any await) so it stays inside the submit
    // click's user-activation window and browsers don't block it as an
    // unsolicited popup.
    window.open(link, '_blank', 'noopener,noreferrer')

    setReferenceId(refId)
    setWhatsappUrl(link)
    setSubmitted(true)
  }

  function resetWizard() {
    methods.reset(DEFAULT_INQUIRY_VALUES)
    setStep(1)
    setDirection(1)
    setSubmitted(false)
    setWhatsappUrl('')
  }

  return (
    <>
      <Seo
        title="Plan Your Wedding in Sanawad"
        description="Start planning your wedding or celebration with EventWalaBabu, serving Sanawad, Barwaha and the Nimad region. Share your date, guest count and vision — a lead planner responds within 24 hours."
        path="/inquiry"
      />
      {!submitted && <InquiryHero />}

      <Section spacing={submitted ? 'xl' : 'lg'}>
        <Card
          variant="elevated"
          className="mx-auto max-w-3xl p-6 sm:p-10"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <InquirySuccess
                key="success"
                name={getValues('name')}
                referenceId={referenceId}
                whatsappUrl={whatsappUrl}
                onReset={resetWizard}
              />
            ) : (
              <motion.div
                key="wizard"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE_LUXE }}
              >
                <StepIndicator currentStep={step} totalSteps={TOTAL_STEPS} labels={STEP_LABELS} />

                <FormProvider {...methods}>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    onKeyDown={handleFormKeyDown}
                    noValidate
                    className="mt-10"
                  >
                    <AnimatePresence mode="wait" custom={direction}>
                      <motion.div
                        key={step}
                        custom={direction}
                        variants={stepVariants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{ duration: 0.35, ease: EASE_LUXE }}
                      >
                        {step === 1 && <StepEventDetails />}
                        {step === 2 && <StepBudgetVision />}
                        {step === 3 && <StepContactInfo />}
                        {step === 4 && <StepReview onEditStep={editStep} />}
                      </motion.div>
                    </AnimatePresence>

                    <div className="mt-10 flex items-center justify-between gap-4 border-t border-[var(--color-border)] pt-6">
                      {step > 1 ? (
                        <Button type="button" variant="ghost" onClick={goBack} leftIcon={<ArrowLeft className="size-4" />}>
                          Back
                        </Button>
                      ) : (
                        <span />
                      )}

                      {step < TOTAL_STEPS ? (
                        <Button type="button" variant="gold" onClick={goNext} rightIcon={<ArrowRight className="size-4" />}>
                          Continue
                        </Button>
                      ) : (
                        <Button
                          type="submit"
                          variant="gold"
                          size="lg"
                          isLoading={methods.formState.isSubmitting}
                          className="shine"
                          rightIcon={<Send className="size-4" />}
                        >
                          Submit Request
                        </Button>
                      )}
                    </div>
                  </form>
                </FormProvider>
              </motion.div>
            )}
          </AnimatePresence>
        </Card>
      </Section>

      {!submitted && <FaqAccordion eyebrow="Good to Know" title="Before You Send It" items={INQUIRY_FAQS} />}
    </>
  )
}
