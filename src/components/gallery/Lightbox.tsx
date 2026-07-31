import { useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { EASE_LUXE, EASE_OUT } from '@/lib/motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

export interface LightboxEntry {
  id: string
  title: string
  imgUrl: string
  kind: 'image' | 'video'
  duration?: string
  /** Required when kind === 'video'. Range-request-capable source URL. */
  videoUrl?: string
}

interface LightboxProps {
  entries: LightboxEntry[]
  index: number | null
  onClose: () => void
  onNavigate: (index: number) => void
}

export function Lightbox({ entries, index, onClose, onNavigate }: LightboxProps) {
  const reducedMotion = useReducedMotion()
  const closeRef = useRef<HTMLButtonElement>(null)
  const isOpen = index !== null
  const current = isOpen ? entries[index] : null

  const goPrev = () => {
    if (index === null) return
    onNavigate((index - 1 + entries.length) % entries.length)
  }
  const goNext = () => {
    if (index === null) return
    onNavigate((index + 1) % entries.length)
  }

  useEffect(() => {
    if (!isOpen) return
    closeRef.current?.focus()

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') onNavigate((index! - 1 + entries.length) % entries.length)
      if (e.key === 'ArrowRight') onNavigate((index! + 1) % entries.length)
    }

    document.addEventListener('keydown', handleKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [isOpen, index, entries.length, onClose, onNavigate])

  return (
    <AnimatePresence>
      {isOpen && current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={current.title}
          className="fixed inset-0 z-[var(--z-modal)] flex items-center justify-center p-4 sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reducedMotion ? 0 : 0.25, ease: EASE_OUT }}
        >
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute inset-0 bg-[var(--color-onyx-950)]/90"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: 8 }}
            transition={{ duration: reducedMotion ? 0 : 0.35, ease: EASE_LUXE }}
            className="relative flex w-full max-w-3xl flex-col items-center overflow-hidden rounded-[var(--radius-lg)] border border-white/10 bg-[var(--color-onyx-900)] text-center"
          >
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close lightbox"
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full border border-white/15 bg-[var(--color-onyx-950)]/80 text-white/70 transition-colors hover:border-[var(--color-gold-400)] hover:text-[var(--color-gold-400)]"
            >
              <X className="size-4" aria-hidden="true" />
            </button>

            <div className="relative aspect-[16/10] w-full bg-[var(--color-onyx-950)]">
              {current.kind === 'video' && current.videoUrl ? (
                <video
                  key={current.id}
                  src={current.videoUrl}
                  poster={current.imgUrl}
                  controls
                  playsInline
                  preload="auto"
                  className="size-full object-cover"
                >
                  Your browser doesn't support embedded video playback.
                </video>
              ) : (
                <img src={current.imgUrl} alt={current.title} className="size-full object-cover" />
              )}
              {current.kind !== 'video' && (
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-onyx-950)] via-[var(--color-onyx-950)]/10 to-transparent" />
              )}
            </div>

            <div className="w-full px-8 pb-8 pt-6 sm:px-12">
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-[var(--color-gold-400)]">
                {current.kind === 'video' && current.duration ? current.duration : current.title}
              </p>
              <h3 className="mt-2 font-serif text-2xl text-white sm:text-3xl">{current.title}</h3>

              <p className="mt-6 text-xs text-white/40">
                {index !== null ? index + 1 : 0} / {entries.length}
              </p>
            </div>
          </motion.div>

          <button
            type="button"
            onClick={goPrev}
            aria-label="Previous"
            className="absolute left-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--color-gold-400)] hover:text-[var(--color-gold-400)] sm:left-6"
          >
            <ChevronLeft className="size-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={goNext}
            aria-label="Next"
            className="absolute right-3 top-1/2 flex size-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-[var(--color-gold-400)] hover:text-[var(--color-gold-400)] sm:right-6"
          >
            <ChevronRight className="size-5" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
