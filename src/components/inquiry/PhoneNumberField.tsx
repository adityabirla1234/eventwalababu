import { useFormContext } from 'react-hook-form'
import type { ChangeEvent } from 'react'
import { Label, FieldError } from '@/components/ui/Input'
import { COUNTRY_CODE_OPTIONS, type InquiryFormValues } from '@/lib/validations/inquiry'

interface PhoneNumberFieldProps {
  label: string
  countryFieldName: 'phoneCountryCode' | 'whatsappCountryCode'
  numberFieldName: 'phone' | 'whatsapp'
  required?: boolean
  disabled?: boolean
  placeholder?: string
}

/**
 * Country-code select + 10-digit-only number input, composed as one field.
 * The number input strips any non-digit character as the person types and
 * hard-caps at 10 characters, rather than only rejecting on submit — so the
 * restriction is felt immediately, not just as a validation error afterward.
 */
export function PhoneNumberField({
  label,
  countryFieldName,
  numberFieldName,
  required,
  disabled,
  placeholder = '98765 43210',
}: PhoneNumberFieldProps) {
  const {
    register,
    formState: { errors },
  } = useFormContext<InquiryFormValues>()

  const numberField = register(numberFieldName)
  const error = errors[numberFieldName]?.message as string | undefined

  function handleNumberChange(e: ChangeEvent<HTMLInputElement>) {
    e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10)
    numberField.onChange(e)
  }

  return (
    <div>
      <Label htmlFor={numberFieldName} required={required}>
        {label}
      </Label>
      <div className="flex gap-2">
        <select
          disabled={disabled}
          className="w-[6.75rem] shrink-0 rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-2 text-sm text-[var(--color-foreground)] transition-colors duration-[var(--duration-fast)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 disabled:cursor-not-allowed disabled:opacity-50"
          {...register(countryFieldName)}
        >
          {COUNTRY_CODE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.value}
            </option>
          ))}
        </select>
        <input
          id={numberFieldName}
          type="tel"
          inputMode="numeric"
          autoComplete="tel-national"
          maxLength={10}
          placeholder={placeholder}
          disabled={disabled}
          aria-invalid={!!error}
          className="w-full rounded-[var(--radius-sm)] border border-[var(--color-border)] bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-foreground)] placeholder:text-[var(--color-muted-foreground)] transition-colors duration-[var(--duration-fast)] focus:border-[var(--color-accent)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid=true]:border-[var(--color-destructive)]"
          {...numberField}
          onChange={handleNumberChange}
        />
      </div>
      <FieldError>{error}</FieldError>
    </div>
  )
}
