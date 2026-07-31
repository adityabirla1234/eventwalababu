import { useFormContext } from 'react-hook-form'
import { Pencil, CalendarDays, Users, MapPin, Home, Wallet, Palette, ListChecks, MessageSquare, User, Phone, Mail, Send } from 'lucide-react'
import {
  lookupEventType,
  lookupGuestCount,
  lookupVenueStatus,
  lookupBudget,
  lookupServices,
  formatPhoneNumber,
  type InquiryFormValues,
} from '@/lib/validations/inquiry'

interface SummaryRowProps {
  icon: typeof CalendarDays
  label: string
  value: string
}

function SummaryRow({ icon: Icon, label, value }: SummaryRowProps) {
  return (
    <div className="flex items-start gap-3 py-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-[var(--color-accent)]" aria-hidden="true" />
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-wide text-[var(--color-muted-foreground)]">{label}</p>
        <p className="text-sm text-[var(--color-foreground)]">{value || '\u2014'}</p>
      </div>
    </div>
  )
}

interface SummaryGroupProps {
  title: string
  step: number
  onEdit: (step: number) => void
  children: React.ReactNode
}

function SummaryGroup({ title, step, onEdit, children }: SummaryGroupProps) {
  return (
    <div className="rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-5">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="font-serif text-base font-semibold text-[var(--color-foreground)]">{title}</h3>
        <button
          type="button"
          onClick={() => onEdit(step)}
          className="flex items-center gap-1 text-xs font-medium text-[var(--color-accent)] hover:underline"
        >
          <Pencil className="size-3" aria-hidden="true" />
          Edit
        </button>
      </div>
      <div className="divide-y divide-[var(--color-border)]">{children}</div>
    </div>
  )
}

interface StepReviewProps {
  onEditStep: (step: number) => void
}

export function StepReview({ onEditStep }: StepReviewProps) {
  const { watch } = useFormContext<InquiryFormValues>()
  const values = watch()

  const services = lookupServices(values.services)
  const effectiveWhatsappCode = values.sameAsPhone ? values.phoneCountryCode : values.whatsappCountryCode
  const effectiveWhatsapp = values.sameAsPhone ? values.phone : values.whatsapp

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Step 4 of 4
        </p>
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Review your consultation request</h2>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          Please confirm everything looks right — you can edit any section before sending.
        </p>
      </div>

      <div className="space-y-5">
        <SummaryGroup title="Event Details" step={1} onEdit={onEditStep}>
          <SummaryRow icon={CalendarDays} label="Event Type" value={lookupEventType(values.eventType)} />
          <SummaryRow icon={CalendarDays} label="Tentative Date" value={values.eventDate} />
          <SummaryRow icon={Users} label="Estimated Guests" value={lookupGuestCount(values.guestCount)} />
          <SummaryRow icon={MapPin} label="City / Region" value={values.location} />
          <SummaryRow
            icon={Home}
            label="Venue"
            value={
              values.venueName
                ? `${lookupVenueStatus(values.venueStatus)} \u2014 ${values.venueName}`
                : lookupVenueStatus(values.venueStatus)
            }
          />
        </SummaryGroup>

        <SummaryGroup title="Vision & Budget" step={2} onEdit={onEditStep}>
          <SummaryRow icon={Wallet} label="Budget Range" value={lookupBudget(values.budget)} />
          <SummaryRow icon={Palette} label="Theme" value={values.theme} />
          <SummaryRow icon={ListChecks} label="Services" value={services.join(', ')} />
          <SummaryRow icon={MessageSquare} label="Vision Notes" value={values.description} />
        </SummaryGroup>

        <SummaryGroup title="Contact Information" step={3} onEdit={onEditStep}>
          <SummaryRow icon={User} label="Name" value={values.name} />
          <SummaryRow icon={Phone} label="Phone" value={formatPhoneNumber(values.phoneCountryCode, values.phone)} />
          <SummaryRow icon={Mail} label="Email" value={values.email} />
          <SummaryRow icon={Send} label="WhatsApp" value={formatPhoneNumber(effectiveWhatsappCode, effectiveWhatsapp)} />
        </SummaryGroup>
      </div>
    </div>
  )
}
