import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormField, Input } from '@/components/ui/Input'
import { PhoneNumberField } from '@/components/inquiry/PhoneNumberField'
import { type InquiryFormValues } from '@/lib/validations/inquiry'

export function StepContactInfo() {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<InquiryFormValues>()

  const sameAsPhone = watch('sameAsPhone')
  const phone = watch('phone')
  const phoneCountryCode = watch('phoneCountryCode')

  // Keep the WhatsApp value (and its country code) in sync with the phone
  // number when the shortcut is checked.
  useEffect(() => {
    if (sameAsPhone) {
      setValue('whatsapp', phone ?? '', { shouldValidate: true })
      setValue('whatsappCountryCode', phoneCountryCode ?? '+91', { shouldValidate: true })
    }
  }, [sameAsPhone, phone, phoneCountryCode, setValue])

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Step 3 of 4
        </p>
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">How should we reach you?</h2>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          A lead planner will personally follow up on your chosen channel.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Full Name" htmlFor="name" required error={errors.name?.message}>
          <Input id="name" placeholder="Anjali Sharma" {...register('name')} />
        </FormField>
        <PhoneNumberField
          label="Phone Number"
          countryFieldName="phoneCountryCode"
          numberFieldName="phone"
          required
        />
      </div>

      <FormField label="Email Address" htmlFor="email" required error={errors.email?.message}>
        <Input id="email" type="email" placeholder="you@example.com" {...register('email')} />
      </FormField>

      <div>
        <PhoneNumberField
          label="WhatsApp Number"
          countryFieldName="whatsappCountryCode"
          numberFieldName="whatsapp"
          required={!sameAsPhone}
          disabled={sameAsPhone}
        />
        <label className="mt-2 flex items-center gap-2 text-xs text-[var(--color-muted-foreground)]">
          <input
            type="checkbox"
            className="size-4 rounded-[0.25rem] border-[var(--color-border)] text-[var(--color-accent)] accent-[var(--color-accent)]"
            {...register('sameAsPhone')}
          />
          Same as my phone number
        </label>
      </div>
    </div>
  )
}
