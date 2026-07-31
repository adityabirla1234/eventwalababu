export type GalleryCategory =
  | 'Wedding Ceremony'
  | 'Stage Production'
  | 'Floral Design'
  | 'Special Effects'
  | 'Venue Décor'
  | 'Corporate Events'

export const CATEGORIES: GalleryCategory[] = [
  'Wedding Ceremony',
  'Stage Production',
  'Floral Design',
  'Special Effects',
  'Venue Décor',
  'Corporate Events',
]

/** Real photography, two per category, cycled across that category's tiles. */
const CATEGORY_IMAGES: Record<GalleryCategory, [string, string]> = {
  'Wedding Ceremony': [
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0000.jpg?updatedAt=1785477263874',
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0010.jpg?updatedAt=1785477263681',
  ],
  'Stage Production': [
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0004.jpg?updatedAt=1785477262841',
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0008.jpg?updatedAt=1785477262996',
  ],
  'Floral Design': [
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0011.jpg?updatedAt=1785477263385',
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0007.jpg?updatedAt=1785477263633',
  ],
  'Special Effects': [
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0009.jpg?updatedAt=1785477261666',
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0002.jpg?updatedAt=1785477263144',
  ],
  'Venue Décor': [
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0006.jpg?updatedAt=1785477262496',
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/Screenshot_2026-07-29-12-31-09-85_99c04817c0de5652397fc8b56c3b3817.jpg',
  ],
  'Corporate Events': [
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0003.jpg?updatedAt=1785477261423',
    'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/IMG-20260730-WA0005.jpg?updatedAt=1785477260066',
  ],
}

export interface GalleryItem {
  id: string
  title: string
  category: GalleryCategory
  imgUrl: string
  /** Controls the masonry tile height for visual rhythm. */
  size: 'sm' | 'md' | 'lg'
}


export const GALLERY_ITEMS: GalleryItem[] = [
  { id: 'g1', title: 'Grand Mandap', category: 'Wedding Ceremony', imgUrl: CATEGORY_IMAGES['Wedding Ceremony'][0], size: 'lg' },
  { id: 'g2', title: 'Vow Pavilion', category: 'Wedding Ceremony', imgUrl: CATEGORY_IMAGES['Wedding Ceremony'][1], size: 'sm' },
  { id: 'g3', title: 'Sangeet Stage', category: 'Stage Production', imgUrl: CATEGORY_IMAGES['Stage Production'][0], size: 'md' },
  { id: 'g4', title: 'LED Backdrop', category: 'Stage Production', imgUrl: CATEGORY_IMAGES['Stage Production'][1], size: 'lg' },
  { id: 'g5', title: 'Marigold Aisle', category: 'Floral Design', imgUrl: CATEGORY_IMAGES['Floral Design'][0], size: 'sm' },
  { id: 'g6', title: 'Orchid Canopy', category: 'Floral Design', imgUrl: CATEGORY_IMAGES['Floral Design'][1], size: 'md' },
  { id: 'g7', title: 'Finale Fireworks', category: 'Special Effects', imgUrl: CATEGORY_IMAGES['Special Effects'][0], size: 'lg' },
  { id: 'g8', title: 'Cold Spark Entry', category: 'Special Effects', imgUrl: CATEGORY_IMAGES['Special Effects'][1], size: 'sm' },
  { id: 'g9', title: 'Reception Table', category: 'Venue Décor', imgUrl: CATEGORY_IMAGES['Venue Décor'][0], size: 'md' },
  { id: 'g10', title: 'Entry Façade', category: 'Venue Décor', imgUrl: CATEGORY_IMAGES['Venue Décor'][1], size: 'lg' },
]

export interface VideoItem {
  id: string
  title: string
  imgUrl: string
  duration: string
  /**
   * TODO: placeholder asset — swap for the real highlight reel per item.
   * Google's public sample bucket serves with `Accept-Ranges: bytes`, so it
   * behaves like a real production video host for testing progressive
   * range-request buffering (see `useVideoPreload` + `Lightbox`).
   */
  videoUrl: string
}

const DUMMY_VIDEO_URL1 = 'https://ik.imagekit.io/chedcztb6/GalleryVideoEWB/VID-20260728-WA0001.mp4?updatedAt=1785319758413&ik-s=95d6dc51bf892d832eeecedc02c721d2801bbe18'
const DUMMY_VIDEO_URL2= 'https://ik.imagekit.io/chedcztb6/GalleryVideoEWB/AQP8QNr-QVMhyPpYwfVmQ7kdaAalZ3ANlT5xtAhBuT-mpfG1BPDbtzv2lqV6FbLIQZTYT0kktZxPaUgHd1RXAdOb4buCZhe7FzrPoIY.mp4?updatedAt=1785319917595&ik-s=fe966110ffbecf0b365bff0839f56a0616ff5375'
const DUMMY_VIDEO_URL3 = 'https://ik.imagekit.io/chedcztb6/GalleryVideoEWB/AQND9cKQugcJNSESx1evhn7qUE_JwxypBu4iyOZ2uoqtmcn7Ep4PDCZmcswQTscWXHYoQpxOGcVAsbpkX1r43WfwcG4D6w0-4r2aSBw.mp4?updatedAt=1785320081106&ik-s=26f20142efc5199b6c509556ff42702b2a82c503'
const DUMMY_VIDEO_URL4 = 'https://ik.imagekit.io/chedcztb6/GalleryVideoEWB/AQO--sC-Gv0GAHYrqVIpd9I-p-tgJUVb6nNa0Xg_LRvjHmY1Xit5rBHyY2Zay7L0X_cNu8iFwixICVQ2hJy0zWnTbGqybMCcK2HbIq4.mp4?updatedAt=1785320289211&ik-s=751ff106c8ee970ec59e61a3b4afcd4b6f1b28a7'

export const VIDEO_ITEMS: VideoItem[] = [
  {
    id: 'v1',
    title: 'Sangeet Night Highlights',
    imgUrl: 'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/Screenshot_2026-07-29-12-30-01-83_99c04817c0de5652397fc8b56c3b3817.jpg?updatedAt=1785479916567',
    duration: '0:35',
    videoUrl: DUMMY_VIDEO_URL1,
  },
  {
    id: 'v2',
    title: 'Finale Fireworks Reel',
    imgUrl: 'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/Screenshot_2026-07-29-12-31-09-85_99c04817c0de5652397fc8b56c3b3817.jpg?updatedAt=1785479912379',
    duration: '0:26',
    videoUrl: DUMMY_VIDEO_URL2,
  },
  {
    id: 'v3',
    title: 'Grand Birthday Celebration',
    imgUrl: CATEGORY_IMAGES['Wedding Ceremony'][0],
    duration: '0:25',
    videoUrl: DUMMY_VIDEO_URL3,
  },
  {
    id: 'v4',
    title: 'Royal Wedding Entry',
    imgUrl:'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Photos/Screenshot_2026-07-29-12-31-51-57_99c04817c0de5652397fc8b56c3b3817.jpg?updatedAt=1785479880250',
    duration: '0:26',
    videoUrl: DUMMY_VIDEO_URL4,
  },
]
