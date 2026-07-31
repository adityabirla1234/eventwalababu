import { useFormContext } from 'react-hook-form'
import { MapPin } from 'lucide-react'
import { FormField, Input, Select } from '@/components/ui/Input'
import { OptionCard } from '@/components/inquiry/OptionCard'
import { EVENT_TYPE_ICONS } from '@/components/inquiry/content'
import {
  EVENT_TYPE_OPTIONS,
  GUEST_COUNT_OPTIONS,
  VENUE_STATUS_OPTIONS,
  type InquiryFormValues,
} from '@/lib/validations/inquiry'

const TODAY = new Date().toISOString().split('T')[0]

export function StepEventDetails() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<InquiryFormValues>()

  const venueStatus = watch('venueStatus')
  const showVenueName = venueStatus === 'booked' || venueStatus === 'shortlisted'

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Step 1 of 4
        </p>
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">What are we celebrating?</h2>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          Start with the shape of your occasion — we'll tailor everything from here.
        </p>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[var(--color-foreground)]">
          Event Type <span className="text-[var(--color-accent)]">*</span>
        </legend>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {EVENT_TYPE_OPTIONS.map((opt) => {
            const Icon = EVENT_TYPE_ICONS[opt.value]
            return (
              <OptionCard
                key={opt.value}
                id={`eventType-${opt.value}`}
                kind="radio"
                label={opt.label}
                icon={Icon && <Icon className="size-4" aria-hidden="true" />}
                value={opt.value}
                {...register('eventType')}
              />
            )
          })}
        </div>
        {errors.eventType && (
          <p className="mt-2 text-xs text-[var(--color-destructive)]" role="alert">
            {errors.eventType.message}
          </p>
        )}
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Tentative Date" htmlFor="eventDate" required error={errors.eventDate?.message}>
          <Input id="eventDate" type="date" min={TODAY} {...register('eventDate')} />
        </FormField>
        <FormField label="Estimated Guests" htmlFor="guestCount" required error={errors.guestCount?.message}>
          <Select
            id="guestCount"
            placeholder="Select guest count"
            options={GUEST_COUNT_OPTIONS}
            {...register('guestCount')}
          />
        </FormField>
      </div>

      <FormField label="City / Region" htmlFor="location" required error={errors.location?.message}>
        <Input
          id="location"
          placeholder="e.g. Indore, Udaipur, Goa"
          leftAdornment={<MapPin className="size-4" />}
          {...register('location')}
        />
      </FormField>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[var(--color-foreground)]">
          Venue Status <span className="text-[var(--color-accent)]">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {VENUE_STATUS_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              id={`venueStatus-${opt.value}`}
              kind="radio"
              label={opt.label}
              description={opt.description}
              value={opt.value}
              {...register('venueStatus')}
            />
          ))}
        </div>
        {errors.venueStatus && (
          <p className="mt-2 text-xs text-[var(--color-destructive)]" role="alert">
            {errors.venueStatus.message}
          </p>
        )}
      </fieldset>

      {showVenueName && (
        <FormField label="Venue Name" htmlFor="venueName" hint="Optional — helps us plan logistics ahead of time">
          <Input id="venueName" placeholder="e.g. The Fern Residency" {...register('venueName')} />
        </FormField>
      )}
    </div>
  )
}
