import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Phone, X, Headphones } from 'lucide-react'
import { CONTACT, buildWhatsAppLink, toDialDigits } from '@/lib/navigation'
import { EASE_LUXE } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

/**
 * Persistent quick-help widget. Collapsed = a single FAB; expanded = a small
 * card with direct Call / WhatsApp actions. Placed bottom-left so it never
 * collides with the global "scroll to top" control (bottom-right).
 */
export function FloatingHelpCard() {
  const [open, setOpen] = useState(false)
  const reducedMotion = useReducedMotion()

  return (
    <div
      className="fixed bottom-6 left-5 z-[var(--z-overlay)] sm:bottom-8 sm:left-8"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {open ? (
          <motion.div
            key="card"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.96 }}
            transition={{ duration: reducedMotion ? 0 : 0.3, ease: EASE_LUXE }}
            className="noise-overlay w-64 rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] p-4 shadow-xl shadow-black/15"
            role="dialog"
            aria-label="Quick contact options"
          >
            <div className="mb-3 flex items-center justify-between">
              <p className="font-serif text-sm font-semibold text-[var(--color-foreground)]">
                Need help planning?
              </p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close quick contact card"
                className="flex size-7 items-center justify-center rounded-full text-[var(--color-muted-foreground)] hover:bg-[var(--color-muted)] hover:text-[var(--color-foreground)]"
              >
                <X className="size-4" />
              </button>
            </div>
            <p className="mb-4 text-xs leading-relaxed text-[var(--color-muted-foreground)]">
              Talk to a lead planner directly — {CONTACT.responseTime.toLowerCase()}.
            </p>
            <div className="flex flex-col gap-2">
              <a
                href={`tel:${toDialDigits(CONTACT.phone)}`}
                className="flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[var(--color-primary)] px-4 py-3 text-sm font-medium text-[var(--color-primary-foreground)] transition-transform hover:-translate-y-0.5"
              >
                <Phone className="size-4" aria-hidden="true" />
                Call Us
              </a>
              <a
                href={buildWhatsAppLink()}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 rounded-[var(--radius-sm)] bg-[#25D366] px-4 py-3 text-sm font-medium text-white transition-transform hover:-translate-y-0.5"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                WhatsApp Us
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.button
            key="fab"
            type="button"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            transition={{ duration: reducedMotion ? 0 : 0.25, ease: EASE_LUXE }}
            aria-label="Open quick contact options"
            className="flex size-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-[var(--color-accent-foreground)] shadow-lg shadow-black/20"
          >
            <Headphones className="size-6" aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
