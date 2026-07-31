import { forwardRef, useId } from 'react'
import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes,
  LabelHTMLAttributes,
  ReactNode,
} from 'react'
import { ChevronDown, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

const fieldBase =
  'w-full rounded-[var(--radius-sm)] border bg-[var(--color-card)] px-4 py-3 text-sm text-[var(--color-foreground)] ' +
  'placeholder:text-[var(--color-muted-foreground)] transition-colors duration-[var(--duration-fast)] ' +
  'focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)] ' +
  'disabled:cursor-not-allowed disabled:opacity-50'

/* ---------------------------------- Label --------------------------------- */

export function Label({ className, required, children, ...rest }: LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn('mb-2 block text-sm font-medium text-[var(--color-foreground)]', className)} {...rest}>
      {children}
      {required && <span className="ml-1 text-[var(--color-accent)]">*</span>}
    </label>
  )
}

/* -------------------------------- FieldError ------------------------------- */

export function FieldError({ children }: { children?: ReactNode }) {
  if (!children) return null
  return (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs text-[var(--color-destructive)]" role="alert">
      <AlertCircle className="size-3.5 shrink-0" aria-hidden="true" />
      {children}
    </p>
  )
}

/* ---------------------------------- Input ---------------------------------- */

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string
  /** Optional icon/element rendered inside the input on the left. */
  leftAdornment?: ReactNode
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, error, id, leftAdornment, ...rest },
  ref,
) {
  const autoId = useId()
  const inputId = id ?? autoId

  if (leftAdornment) {
    return (
      <div className="relative">
        <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--color-muted-foreground)]">
          {leftAdornment}
        </span>
        <input
          id={inputId}
          ref={ref}
          className={cn(fieldBase, 'pl-10', error ? 'border-[var(--color-destructive)]' : 'border-[var(--color-border)]', className)}
          aria-invalid={!!error}
          {...rest}
        />
      </div>
    )
  }

  return (
    <input
      id={inputId}
      ref={ref}
      className={cn(fieldBase, error ? 'border-[var(--color-destructive)]' : 'border-[var(--color-border)]', className)}
      aria-invalid={!!error}
      {...rest}
    />
  )
})

/* -------------------------------- Textarea --------------------------------- */

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, error, rows = 5, ...rest },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(fieldBase, 'resize-none', error ? 'border-[var(--color-destructive)]' : 'border-[var(--color-border)]', className)}
      aria-invalid={!!error}
      {...rest}
    />
  )
})

/* ---------------------------------- Select ---------------------------------- */

export interface SelectOption {
  label: string
  value: string
}

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  error?: string
  options: SelectOption[]
  placeholder?: string
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { className, error, options, placeholder, ...rest },
  ref,
) {
  return (
    <div className="relative">
      <select
        ref={ref}
        className={cn(
          fieldBase,
          'appearance-none pr-10',
          error ? 'border-[var(--color-destructive)]' : 'border-[var(--color-border)]',
          className,
        )}
        aria-invalid={!!error}
        defaultValue={rest.defaultValue ?? ''}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      <ChevronDown
        className="pointer-events-none absolute right-3.5 top-1/2 size-4 -translate-y-1/2 text-[var(--color-muted-foreground)]"
        aria-hidden="true"
      />
    </div>
  )
})

/* -------------------------------- FormField --------------------------------- */

interface FormFieldProps {
  label: string
  htmlFor: string
  required?: boolean
  error?: string
  hint?: string
  children: ReactNode
}

/** Composes Label + control + helper/error text with consistent spacing. */
export function FormField({ label, htmlFor, required, error, hint, children }: FormFieldProps) {
  return (
    <div>
      <Label htmlFor={htmlFor} required={required}>
        {label}
      </Label>
      {children}
      {error ? <FieldError>{error}</FieldError> : hint ? (
        <p className="mt-1.5 text-xs text-[var(--color-muted-foreground)]">{hint}</p>
      ) : null}
    </div>
  )
}
