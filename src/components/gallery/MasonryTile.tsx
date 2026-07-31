import { motion } from 'framer-motion'
import { Skeleton } from '@/components/ui/Loading'
import { useInViewLazy } from '@/hooks/use-in-view-lazy'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { EASE_OUT } from '@/lib/motion'
import type { GalleryItem } from '@/components/gallery/content'

const ASPECT: Record<GalleryItem['size'], string> = {
  sm: 'aspect-square',
  md: 'aspect-[4/5]',
  lg: 'aspect-[3/4]',
}

interface MasonryTileProps {
  item: GalleryItem
  onOpen: () => void
}

/**
 * A single gallery tile: photography only, no caption or text overlay.
 * Motion happens in two layers, both independent of `:hover` (which touch
 * devices don't reliably send) so the animation reads on phones and tablets
 * exactly as it does on desktop:
 *  - Entrance: a one-time fade/scale-in the moment the tile scrolls into
 *    view, via IntersectionObserver (`useInViewLazy`) — identical on touch
 *    and pointer devices.
 *  - Idle: a slow, continuous Ken Burns drift (scale 1 → 1.08 → 1) that
 *    plays for as long as the tile is visible, so there's always some
 *    motion on screen rather than a static photo waiting for a hover that
 *    will never come on a touchscreen.
 * `prefers-reduced-motion` disables both and shows a static image.
 */
export function MasonryTile({ item, onOpen }: MasonryTileProps) {
  const { ref, inView } = useInViewLazy<HTMLButtonElement>()
  const reducedMotion = useReducedMotion()

  return (
    <button
      ref={ref}
      type="button"
      onClick={onOpen}
      aria-label={`Open ${item.title} in the gallery viewer`}
      className={`group relative mb-4 flex w-full ${ASPECT[item.size]} break-inside-avoid overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-card)] transition-colors duration-500 hover:border-[var(--color-accent)]/60 focus-visible:border-[var(--color-accent)]`}
    >
      {inView ? (
        <motion.img
          src={item.imgUrl}
          alt={item.title}
          loading="lazy"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={
            reducedMotion
              ? { opacity: 1, scale: 1 }
              : { opacity: 1, scale: [1.04, 1, 1.08, 1] }
          }
          transition={
            reducedMotion
              ? { duration: 0.6, ease: EASE_OUT }
              : {
                  opacity: { duration: 0.6, ease: EASE_OUT },
                  scale: {
                    duration: 9,
                    times: [0, 0.08, 0.54, 1],
                    repeat: Infinity,
                    repeatType: 'loop',
                    ease: 'easeInOut',
                  },
                }
          }
          className="absolute inset-0 size-full object-cover"
        />
      ) : (
        <Skeleton className="absolute inset-0 rounded-none" />
      )}
    </button>
  )
}
