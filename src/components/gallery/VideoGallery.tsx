import { useState } from 'react'
import { Play } from 'lucide-react'
import { Section } from '@/components/ui/Section'
import { Reveal } from '@/components/motion/Reveal'
import { SectionHeading } from '@/components/home/SectionHeading'
import { Lightbox, type LightboxEntry } from '@/components/gallery/Lightbox'
import { useVideoPreload } from '@/hooks/use-video-preload'
import { VIDEO_ITEMS, type VideoItem } from '@/components/gallery/content'

function VideoTile({ item, onOpen }: { item: VideoItem; onOpen: () => void }) {
  const { startPreload, cancelPreload } = useVideoPreload(item.videoUrl)

  return (
    <button
      type="button"
      onClick={onOpen}
      onMouseEnter={startPreload}
      onMouseLeave={cancelPreload}
      onTouchStart={startPreload}
      aria-label={`Play ${item.title}`}
      className="group relative flex aspect-video w-full flex-col justify-end overflow-hidden rounded-[var(--radius-lg)] border border-[var(--color-border)] bg-[var(--color-onyx-950)] text-left"
    >
      <img
        src={item.imgUrl}
        alt={item.title}
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-80 transition-all duration-700 ease-out group-hover:scale-105 group-hover:opacity-95"
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[var(--color-onyx-950)]/90 via-[var(--color-onyx-950)]/25 to-transparent" />

      <span className="absolute left-1/2 top-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[var(--color-gold-400)]/70 bg-[var(--color-onyx-950)]/70 text-[var(--color-gold-400)] transition-transform duration-500 group-hover:scale-110">
        <Play className="size-5 translate-x-0.5" aria-hidden="true" fill="currentColor" />
      </span>

      <div className="relative p-6">
        <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-300)]">
          {item.duration}
        </p>
        <p className="mt-1 font-serif text-lg text-white">{item.title}</p>
      </div>
    </button>
  )
}

export function VideoGallery() {
  const [index, setIndex] = useState<number | null>(null)

  const entries: LightboxEntry[] = VIDEO_ITEMS.map((item) => ({
    id: item.id,
    title: item.title,
    imgUrl: item.imgUrl,
    kind: 'video' as const,
    duration: item.duration,
    videoUrl: item.videoUrl,
  }))

  return (
    <Section spacing="lg" tone="muted">
      <SectionHeading
        eyebrow="In Motion"
        title="Video Highlights"
        description="Short reels from recent celebrations — stages, finales and the moments in between."
        align="center"
      />

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {VIDEO_ITEMS.map((item, i) => (
          <Reveal key={item.id} variant="scale" delay={i * 0.08}>
            <VideoTile item={item} onOpen={() => setIndex(i)} />
          </Reveal>
        ))}
      </div>

      <Lightbox entries={entries} index={index} onClose={() => setIndex(null)} onNavigate={setIndex} />
    </Section>
  )
}
