import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { EASE_LUXE } from '@/lib/motion'

interface CategoryFilterProps {
  categories: readonly string[]
  active: string
  onChange: (category: string) => void
  className?: string
}

const ALL = 'All'

export function CategoryFilter({ categories, active, onChange, className }: CategoryFilterProps) {
  const options = [ALL, ...categories]

  return (
    <div
      role="tablist"
      aria-label="Filter gallery by category"
      className={cn('flex flex-wrap justify-center gap-2', className)}
    >
      {options.map((category) => {
        const isActive = active === category
        return (
          <button
            key={category}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(category)}
            className={cn(
              'relative rounded-full px-4 py-2 text-xs font-semibold uppercase tracking-[0.12em] transition-colors duration-[var(--duration-fast)] sm:text-sm',
              isActive
                ? 'text-[var(--color-accent-foreground)]'
                : 'border border-[var(--color-border)] text-[var(--color-muted-foreground)] hover:border-[var(--color-accent)]/50 hover:text-[var(--color-foreground)]',
            )}
          >
            {isActive && (
              <motion.span
                layoutId="gallery-filter-pill"
                transition={{ duration: 0.35, ease: EASE_LUXE }}
                className="absolute inset-0 rounded-full bg-[var(--color-accent)]"
              />
            )}
            <span className="relative z-10">{category}</span>
          </button>
        )
      })}
    </div>
  )
}
