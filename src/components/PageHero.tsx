import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Section, type SectionTone } from '@/components/ui/Section'
import { Breadcrumb, type BreadcrumbItem } from '@/components/ui/Breadcrumb'
import { fadeIn, staggerContainer } from '@/lib/motion'
import { cn } from '@/lib/utils'

interface PageHeroProps {
  eyebrow?: string
  title: string
  description?: string
  children?: ReactNode
  className?: string
  /** Override the auto-derived breadcrumb trail. */
  breadcrumbItems?: BreadcrumbItem[]
  /** Hide the breadcrumb entirely (e.g. on the 404 page). Defaults to shown. */
  showBreadcrumb?: boolean
  /** Section background. Defaults to the page's base tone (dark, site-wide). */
  tone?: SectionTone
}

/**
 * Elegant, on-brand hero used at the top of every inner route. Includes an
 * auto-derived breadcrumb trail so every page stays orientation-friendly
 * without repeating markup per page. Breadcrumb, eyebrow, title and
 * description fade in as a gentle stagger (opacity-only — no transform) so
 * long titles never fight the animation while wrapping across lines.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  className,
  breadcrumbItems,
  showBreadcrumb = true,
  tone,
}: PageHeroProps) {
  return (
    <Section
      spacing="xl"
      tone={tone}
      className={cn('relative overflow-hidden pt-36 text-center sm:pt-44', className)}
    >
      {/* Soft ambient gold glow — matches the brand's theatrical accent used elsewhere */}
      <div
        className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-[26rem] bg-[radial-gradient(ellipse_at_top,_var(--color-accent)_0%,_transparent_60%)] opacity-[0.06]"
        aria-hidden="true"
      />
      <motion.div
        initial="hidden"
        animate="show"
        variants={staggerContainer}
        className="mx-auto max-w-2xl"
      >
        {showBreadcrumb && (
          <motion.div variants={fadeIn}>
            <Breadcrumb items={breadcrumbItems} className="mb-6" />
          </motion.div>
        )}
        {eyebrow && (
          <motion.span
            variants={fadeIn}
            className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-accent)]"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1 variants={fadeIn} className="text-4xl font-semibold sm:text-5xl lg:text-6xl">
          {title}
        </motion.h1>
        {description && (
          <motion.p
            variants={fadeIn}
            className="balance mx-auto mt-5 max-w-xl text-base leading-relaxed text-[var(--color-muted-foreground)] sm:text-lg"
          >
            {description}
          </motion.p>
        )}
        {children && (
          <motion.div variants={fadeIn} className="mt-8">
            {children}
          </motion.div>
        )}
      </motion.div>
    </Section>
  )
}
