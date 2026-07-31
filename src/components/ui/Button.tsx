import { forwardRef } from 'react'
import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from 'react'
import { Link, type LinkProps } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ButtonVariant = 'primary' | 'gold' | 'outline' | 'ghost' | 'link'
export type ButtonSize = 'sm' | 'md' | 'lg' | 'icon'

const baseStyles =
  'relative inline-flex items-center justify-center gap-2 whitespace-nowrap font-sans font-medium ' +
  'transition-all duration-[var(--duration-base)] ease-[var(--ease-out-soft)] ' +
  'disabled:pointer-events-none disabled:opacity-50 ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--color-accent)]'

/**
 * Solid, flat variants — no glass/blur shell. `primary` and `gold` are
 * filled surfaces; `outline` is bordered with a transparent fill; `ghost`
 * is chromeless at rest and picks up a solid tint on hover/focus; `link`
 * is plain underlined text with no surface at all.
 */
const variantStyles: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--color-primary)] text-[var(--color-primary-foreground)] hover:brightness-110 ' +
    'hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100',
  gold:
    'bg-[var(--color-accent)] text-[var(--color-accent-foreground)] hover:brightness-110 ' +
    'hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100',
  outline:
    'border border-[var(--color-border)] bg-transparent text-[var(--color-foreground)] ' +
    'hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-card)] ' +
    'hover:-translate-y-0.5 hover:scale-[1.02] active:translate-y-0 active:scale-100',
  ghost:
    'bg-transparent text-[var(--color-foreground)] hover:bg-[var(--color-card)] hover:text-[var(--color-accent)]',
  link:
    'bg-transparent text-[var(--color-accent)] underline-offset-4 hover:underline p-0 h-auto',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-sm rounded-[var(--radius-sm)]',
  md: 'h-12 px-6 text-sm tracking-wide rounded-[var(--radius-md)]',
  lg: 'h-14 px-8 text-base tracking-wide rounded-[var(--radius-md)]',
  icon: 'h-11 w-11 rounded-full',
}

interface CommonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  className?: string
}

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined
    to?: undefined
  }

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
    to?: undefined
  }

type ButtonAsRouterLink = CommonProps &
  Omit<LinkProps, 'className'> & {
    to: LinkProps['to']
    href?: undefined
  }

export type ButtonProps = ButtonAsButton | ButtonAsAnchor | ButtonAsRouterLink

/**
 * Reusable Button. Renders as:
 *  - react-router `<Link>` when `to` is passed (internal navigation)
 *  - `<a>` when `href` is passed (external links)
 *  - `<button>` otherwise
 *
 * All surfaced variants (`primary`/`gold`/`outline`/`ghost`) render as
 * solid, flat surfaces — only `link` stays flat with no pill/border at
 * all, since it's inline underlined text, not a surface. See
 * `variantStyles` above for the per-variant detail.
 */
export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  function Button(props, ref) {
    const {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      leftIcon,
      rightIcon,
      className,
      children,
      ...rest
    } = props

    const isPill = variant !== 'link'

    const classes = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      isPill && 'rounded-full',
      className,
    )

    const content = (
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {isLoading ? <Loader2 className="size-4 animate-spin" aria-hidden="true" /> : leftIcon}
        {children}
        {!isLoading && rightIcon}
      </span>
    )

    if ('to' in props && props.to) {
      const { to, ...linkRest } = rest as Omit<ButtonAsRouterLink, keyof CommonProps>
      return (
        <Link
          ref={ref as React.Ref<HTMLAnchorElement>}
          to={to}
          className={classes}
          {...linkRest}
        >
          {content}
        </Link>
      )
    }

    if ('href' in props && props.href) {
      const anchorRest = rest as Omit<ButtonAsAnchor, keyof CommonProps>
      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={classes}
          {...anchorRest}
        >
          {content}
        </a>
      )
    }

    const buttonRest = rest as Omit<ButtonAsButton, keyof CommonProps>
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={classes}
        disabled={isLoading || buttonRest.disabled}
        {...buttonRest}
      >
        {content}
      </button>
    )
  },
)
