import { useFormContext } from 'react-hook-form'
import { Palette } from 'lucide-react'
import { FormField, Input, Textarea } from '@/components/ui/Input'
import { OptionCard } from '@/components/inquiry/OptionCard'
import { BUDGET_OPTIONS, SERVICE_OPTIONS, type InquiryFormValues } from '@/lib/validations/inquiry'

export function StepBudgetVision() {
  const {
    register,
    formState: { errors },
  } = useFormContext<InquiryFormValues>()

  return (
    <div className="space-y-8">
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-accent)]">
          Step 2 of 4
        </p>
        <h2 className="font-serif text-2xl font-semibold sm:text-3xl">Shape the vision</h2>
        <p className="mt-2 text-sm text-[var(--color-muted-foreground)]">
          Help us understand the scale and style you're imagining.
        </p>
      </div>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[var(--color-foreground)]">
          Budget Range <span className="text-[var(--color-accent)]">*</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-3">
          {BUDGET_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              id={`budget-${opt.value}`}
              kind="radio"
              label={opt.label}
              value={opt.value}
              {...register('budget')}
            />
          ))}
        </div>
        {errors.budget && (
          <p className="mt-2 text-xs text-[var(--color-destructive)]" role="alert">
            {errors.budget.message}
          </p>
        )}
      </fieldset>

      <FormField
        label="Theme or Style Direction"
        htmlFor="theme"
        required
        error={errors.theme?.message}
        hint="A mood, palette or reference point is enough to start"
      >
        <Input
          id="theme"
          placeholder="e.g. Royal Rajasthani, Modern Minimal, Pastel Garden"
          leftAdornment={<Palette className="size-4" />}
          {...register('theme')}
        />
      </FormField>

      <fieldset>
        <legend className="mb-3 text-sm font-medium text-[var(--color-foreground)]">
          Services You Need <span className="text-[var(--color-accent)]">*</span>
        </legend>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SERVICE_OPTIONS.map((opt) => (
            <OptionCard
              key={opt.value}
              id={`services-${opt.value}`}
              kind="checkbox"
              label={opt.label}
              value={opt.value}
              {...register('services')}
            />
          ))}
        </div>
        {errors.services && (
          <p className="mt-2 text-xs text-[var(--color-destructive)]" role="alert">
            {errors.services.message}
          </p>
        )}
      </fieldset>

      <FormField
        label="Tell Us About Your Vision"
        htmlFor="description"
        required
        error={errors.description?.message}
      >
        <Textarea
          id="description"
          placeholder="Share your ideas, inspirations, must-haves or anything else that helps us understand your celebration..."
          {...register('description')}
        />
      </FormField>
    </div>
  )
}
