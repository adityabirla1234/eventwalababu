import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ChevronRight, Home } from 'lucide-react'
import { NAV_ITEMS } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
  className?: string
  /** Visual tone — 'inverse' for use on dark/theatrical backgrounds. */
  tone?: 'default' | 'inverse'
}

const LABEL_OVERRIDES: Record<string, string> = {
  inquiry: 'Plan Your Event',
}

/** Builds a readable trail from the current pathname, preferring nav labels. */
function deriveFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean)
  let acc = ''
  return segments.map((segment) => {
    acc += `/${segment}`
    const navMatch = NAV_ITEMS.find((item) => item.href === acc)
    const label =
      navMatch?.label ??
      LABEL_OVERRIDES[segment] ??
      segment
        .replace(/-/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase())
    return { label, href: acc }
  })
}

/**
 * Route-aware breadcrumb trail. Pass `items` to override; otherwise derives
 * the trail from the current URL using known nav labels.
 */
export function Breadcrumb({ items, className, tone = 'default' }: BreadcrumbProps) {
  const location = useLocation()
  const trail = items ?? deriveFromPath(location.pathname)

  const mutedColor = tone === 'inverse' ? 'text-white/55' : 'text-[var(--color-muted-foreground)]'
  const linkColor =
    tone === 'inverse'
      ? 'hover:text-[var(--color-gold-400)]'
      : 'hover:text-[var(--color-accent)]'
  const currentColor = tone === 'inverse' ? 'text-white/85' : 'text-[var(--color-foreground)]'

  if (trail.length === 0) return null

  return (
    <nav aria-label="Breadcrumb" className={cn('flex justify-center', className)}>
      <ol className={cn('flex flex-wrap items-center justify-center gap-1.5 text-xs font-medium tracking-wide', mutedColor)}>
        <li className="flex items-center gap-1.5">
          <Link
            to="/"
            aria-label="Home"
            className={cn('flex items-center gap-1 transition-colors duration-[var(--duration-fast)]', linkColor)}
          >
            <Home className="size-3.5" aria-hidden="true" />
            <span className="sr-only sm:not-sr-only">Home</span>
          </Link>
        </li>
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1
          return (
            <Fragment key={item.href ?? item.label}>
              <li aria-hidden="true" className="flex items-center">
                <ChevronRight className="size-3.5 opacity-50" />
              </li>
              <li>
                {isLast || !item.href ? (
                  <span aria-current="page" className={cn('font-semibold', currentColor)}>
                    {item.label}
                  </span>
                ) : (
                  <Link
                    to={item.href}
                    className={cn('transition-colors duration-[var(--duration-fast)]', linkColor)}
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            </Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
