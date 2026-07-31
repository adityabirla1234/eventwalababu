import { useMemo, useState } from 'react'
import { MasonryTile } from '@/components/gallery/MasonryTile'
import { Lightbox, type LightboxEntry } from '@/components/gallery/Lightbox'
import { GALLERY_ITEMS } from '@/components/gallery/content'

export function MasonryGrid() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)

  const entries: LightboxEntry[] = useMemo(
    () => GALLERY_ITEMS.map((item) => ({ id: item.id, title: item.title, imgUrl: item.imgUrl, kind: 'image' as const })),
    [],
  )

  return (
    <div>
      <div className="columns-2 gap-4 sm:columns-3 sm:gap-5 lg:columns-4">
        {GALLERY_ITEMS.map((item, i) => (
          <MasonryTile key={item.id} item={item} onOpen={() => setLightboxIndex(i)} />
        ))}
      </div>

      <Lightbox
        entries={entries}
        index={lightboxIndex}
        onClose={() => setLightboxIndex(null)}
        onNavigate={setLightboxIndex}
      />
    </div>
  )
}
