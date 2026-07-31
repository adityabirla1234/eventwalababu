import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/use-reduced-motion'
import { EASE_LUXE, EASE_OUT } from '@/lib/motion'

const SPARK_COLORS = ['#fff3c4', '#ffd166', '#f9a13a', '#ef6820', '#dc2626', '#b91c1c']

/** Offset of the burst point from the top of the Hero — clears the fixed h-20 (80px) navbar on every breakpoint. */
const BURST_TOP_OFFSET = { base: 92, sm: 100, lg: 108 }

function getBurstOffset() {
  if (typeof window === 'undefined') return BURST_TOP_OFFSET.base
  if (window.innerWidth >= 1024) return BURST_TOP_OFFSET.lg
  if (window.innerWidth >= 640) return BURST_TOP_OFFSET.sm
  return BURST_TOP_OFFSET.base
}

interface SparkSpec {
  id: number
  angle: number
  distance: number
  size: number
  color: string
  delay: number
}

function makeSparkField(count: number): SparkSpec[] {
  return Array.from({ length: count }, (_, i) => {
    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5) * 0.6
    return {
      id: i,
      angle,
      distance: 46 + Math.random() * 70,
      size: 3 + Math.random() * 3,
      color: SPARK_COLORS[Math.floor(Math.random() * SPARK_COLORS.length)],
      delay: Math.random() * 0.08,
    }
  })
}

interface EmberSpec {
  id: number
  delay: number
  x: number
}

function makeEmbers(count: number): EmberSpec[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    delay: 0.15 + (i / count) * 0.55 + Math.random() * 0.08,
    x: (Math.random() - 0.5) * 26,
  }))
}

/**
 * The payoff of the burst: pinned sticky notes.
 *  - Mobile / tablet (<lg): space is tight, so three two-sided flip cards
 *    carry all six tags — continuously flipping (like turning a page up)
 *    between the front and back sets, forever.
 *  - Laptop / desktop / large tablets (lg+): there's room to just show
 *    everything at once, so all six tags render as separate static cards
 *    in a single row — no flip needed.
 */
const FLIP_CARDS = [
  { front: { emoji: '📅', label: 'Since 2020' }, back: { emoji: '🎆', label: 'Fireworks & SFX' }, rotate: -6, y: 2 },
  { front: { emoji: '💍', label: 'Luxury Weddings' }, back: { emoji: '✈️', label: 'Destination Events' }, rotate: 4, y: -6 },
  { front: { emoji: '💑', label: '400+ happy couples' }, back: { emoji: '🤝', label: 'Trusted Event experts' }, rotate: -3, y: 4 },
] as const

/** Same six tags, flattened for the desktop row (all fronts, then all backs, left to right). */
const STATIC_TAGS = [...FLIP_CARDS.map((c) => c.front), ...FLIP_CARDS.map((c) => c.back)].map((tag, i) => ({
  ...tag,
  rotate: [-4, 3, -2, 4, -3, 2][i],
  y: [2, -4, 3, -2, 4, -3][i],
}))

const cardFaceClasses =
  'absolute inset-0 flex flex-col items-center justify-center gap-1 rounded-[3px] px-2 text-center shadow-[0_10px_18px_-6px_rgba(28,20,8,0.35),0_2px_4px_rgba(28,20,8,0.18)] [backface-visibility:hidden]'

const staticCardClasses =
  'relative flex size-full flex-col items-center justify-center gap-1 rounded-[3px] px-1.5 text-center shadow-[0_10px_18px_-6px_rgba(28,20,8,0.35),0_2px_4px_rgba(28,20,8,0.18)]'

const cardFaceStyle = {
  background: 'linear-gradient(160deg, #fffaf0 0%, #fdf1cf 55%, #fbe8b8 100%)',
}

/** Pin used by both the flip cards and the static desktop-row cards. */
function CardPin() {
  return (
    <>
      <span
        aria-hidden="true"
        className="absolute -top-2 left-1/2 z-10 size-3.5 -translate-x-1/2 rounded-full shadow-[0_2px_3px_rgba(0,0,0,0.35)]"
        style={{
          background: 'radial-gradient(circle at 32% 32%, #fff3d2 0%, var(--color-gold-400) 45%, var(--color-gold-600) 100%)',
        }}
      />
      <span aria-hidden="true" className="absolute top-1 left-1/2 z-10 h-2 w-px -translate-x-1/2 bg-[#8a6a1f]/40" />
    </>
  )
}

/**
 * A single pinned note showing one tag — no flip, used in the desktop/large-
 * tablet row where all six tags fit on screen at once. Shares the same
 * launch-in entrance (pop from the burst point) as the mobile flip cards.
 */
function StaticStickyNote({
  emoji,
  label,
  rotate,
  y,
  index,
  phase,
  reducedMotion,
}: {
  emoji: string
  label: string
  rotate: number
  y: number
  index: number
  phase: 'idle' | 'launching' | 'burst'
  reducedMotion: boolean
}) {
  const settled = reducedMotion || phase === 'burst'

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, scale: 0.4, y: y - 22, rotate: rotate * 2.4 }}
      animate={
        reducedMotion
          ? { opacity: 1, scale: 1, y, rotate }
          : settled
            ? { opacity: 1, scale: 1, y, rotate }
            : { opacity: 0, scale: 0.4, y: y - 22, rotate: rotate * 2.4 }
      }
      transition={
        reducedMotion ? { duration: 0 } : { duration: 0.5, ease: EASE_LUXE, delay: 0.05 + index * 0.05 }
      }
      className="relative h-[96px] w-[92px]"
    >
      <CardPin />
      <div className={staticCardClasses} style={cardFaceStyle}>
        <span className="text-base leading-none" aria-hidden="true">
          {emoji}
        </span>
        <p className="font-serif text-[9.5px] font-semibold leading-tight tracking-wide text-[#3a2c12]">{label}</p>
      </div>
    </motion.div>
  )
}

function FlipStickyNote({
  front,
  back,
  rotate,
  y,
  index,
  phase,
  reducedMotion,
}: {
  front: { emoji: string; label: string }
  back: { emoji: string; label: string }
  rotate: number
  y: number
  index: number
  phase: 'idle' | 'launching' | 'burst'
  reducedMotion: boolean
}) {
  const settled = reducedMotion || phase === 'burst'

  return (
    <motion.div
      initial={reducedMotion ? undefined : { opacity: 0, scale: 0.4, y: y - 22, rotate: rotate * 2.4 }}
      animate={
        reducedMotion
          ? { opacity: 1, scale: 1, y, rotate }
          : settled
            ? { opacity: 1, scale: 1, y, rotate }
            : { opacity: 0, scale: 0.4, y: y - 22, rotate: rotate * 2.4 }
      }
      transition={
        reducedMotion
          ? { duration: 0 }
          : { duration: 0.55, ease: EASE_LUXE, delay: 0.05 + index * 0.07 }
      }
      className="relative h-[92px] w-[90px] sm:h-[118px] sm:w-[114px]"
      style={{ perspective: 900 }}
    >
      {/* Pin — fixed in place; only the note beneath it flips */}
      <CardPin />

      {/* Flipper — continuously rotates 0 -> 180 -> 360 (forever), pausing on each face to hold */}
      <motion.div
        className="relative size-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={settled && !reducedMotion ? { rotateX: [0, 0, 180, 180, 360, 360] } : { rotateX: 0 }}
        transition={
          settled && !reducedMotion
            ? {
                duration: 7,
                times: [0, 0.4, 0.5, 0.9, 1, 1],
                ease: EASE_LUXE,
                repeat: Infinity,
                repeatType: 'loop',
                delay: 0.6 + index * 0.25,
              }
            : { duration: 0 }
        }
      >
        <div className={cardFaceClasses} style={cardFaceStyle}>
          <span className="text-base leading-none sm:text-lg" aria-hidden="true">
            {front.emoji}
          </span>
          <p className="font-serif text-[9.5px] font-semibold leading-tight tracking-wide text-[#3a2c12] sm:text-[10.5px]">
            {front.label}
          </p>
        </div>
        <div className={cardFaceClasses} style={{ ...cardFaceStyle, transform: 'rotateX(180deg)' }}>
          <span className="text-base leading-none sm:text-lg" aria-hidden="true">
            {back.emoji}
          </span>
          <p className="font-serif text-[9.5px] font-semibold leading-tight tracking-wide text-[#3a2c12] sm:text-[10.5px]">
            {back.label}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

/**
 * Signature hero moment: a single ember launches from the base of the Hero,
 * rises with a comet trail, and bursts just below the fixed navbar — the
 * burst resolves into a cluster of pinned sticky notes carrying six tags.
 * Below `lg` (mobile/tablet), that's three two-sided cards continuously
 * flipping between two sets of three; at `lg` and up (laptop, desktop,
 * large tablets) there's room to show all six at once, so they render as
 * six static cards in a single row instead. Runs on every device (mobile,
 * tablet, desktop); only `prefers-reduced-motion` disables both the launch
 * sequence and the flip loop, in which case the notes are shown immediately
 * in their resting ("already pinned") state, front face only.
 *
 * Every animated piece is wrapped in a plain, non-motion `left-1/2
 * -translate-x-1/2` anchor div. Framer Motion takes full ownership of an
 * element's `transform` once it animates x/y/scale on it, which would
 * silently drop a Tailwind translate-x class on that same element — so
 * centering is done one level up, on an element Framer never touches.
 *
 * Built with Framer Motion + DOM (not canvas) so the notes stay crisp and
 * their position stays trivially in sync with the burst point — the only
 * thing that needs measuring is the launch distance, via ResizeObserver on
 * this component's own wrapper (mirrors the pattern in HeroFireworks.tsx).
 */
export function HeroBrandBurst({ className }: { className?: string }) {
  const reducedMotion = useReducedMotion()
  const wrapperRef = useRef<HTMLDivElement>(null)
  const [travelDistance, setTravelDistance] = useState<number | null>(null)
  const [burstOffset, setBurstOffset] = useState(BURST_TOP_OFFSET.base)
  const [phase, setPhase] = useState<'idle' | 'launching' | 'burst'>('idle')

  const sparks = useMemo(() => makeSparkField(22), [])
  const embers = useMemo(() => makeEmbers(8), [])

  useLayoutEffect(() => {
    const wrapper = wrapperRef.current
    if (!wrapper) return

    function measure() {
      const offset = getBurstOffset()
      setBurstOffset(offset)
      setTravelDistance(Math.max((wrapper?.clientHeight ?? 0) - offset - 24, 120))
    }

    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (reducedMotion || travelDistance === null) return
    const launchTimer = window.setTimeout(() => setPhase('launching'), 500)
    return () => window.clearTimeout(launchTimer)
  }, [reducedMotion, travelDistance])

  const travelDuration = 0.85
  const showSequence = !reducedMotion && travelDistance !== null

  return (
    <div ref={wrapperRef} aria-hidden="true" className={className ?? 'absolute inset-0'}>
      {/* Sticky-note cluster — resting state for reduced-motion, staggered pop-in otherwise */}
      <div className="absolute left-1/2 -translate-x-1/2" style={{ top: burstOffset }}>
        {/* Mobile / tablet (<lg): 3 two-sided flip cards cycling through all 6 tags */}
        <div className="flex items-start gap-2.5 sm:gap-3 lg:hidden">
          {FLIP_CARDS.map((card, i) => (
            <FlipStickyNote
              key={card.front.label}
              front={card.front}
              back={card.back}
              rotate={card.rotate}
              y={card.y}
              index={i}
              phase={phase}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>

        {/* Laptop / desktop / large tablets (lg+): all 6 tags shown at once, static, in a row */}
        <div className="hidden items-start gap-3 lg:flex">
          {STATIC_TAGS.map((tag, i) => (
            <StaticStickyNote
              key={tag.label}
              emoji={tag.emoji}
              label={tag.label}
              rotate={tag.rotate}
              y={tag.y}
              index={i}
              phase={phase}
              reducedMotion={reducedMotion}
            />
          ))}
        </div>
      </div>

      {showSequence && (
        <>
          {/* Rocket + comet trail */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: burstOffset }}>
            <motion.div
              initial={{ y: travelDistance, opacity: 0 }}
              animate={
                phase === 'launching'
                  ? { y: 0, opacity: [0, 1, 1, 0] }
                  : phase === 'idle'
                    ? { y: travelDistance, opacity: 0 }
                    : { y: 0, opacity: 0 }
              }
              transition={
                phase === 'launching'
                  ? {
                      duration: travelDuration,
                      ease: EASE_OUT,
                      opacity: { duration: travelDuration, times: [0, 0.15, 0.85, 1] },
                    }
                  : { duration: 0.2 }
              }
              onAnimationComplete={() => {
                if (phase === 'launching') setPhase('burst')
              }}
              className="flex flex-col items-center"
            >
              <div className="size-1.5 rounded-full bg-[#fff3c4] shadow-[0_0_10px_3px_rgba(249,161,58,0.8)]" />
              <div className="h-16 w-px bg-gradient-to-b from-[#fff3c4] via-[#f9a13a]/70 to-transparent" />
            </motion.div>
          </div>

          {/* Peeling embers along the ascent */}
          {embers.map((ember) => (
            <div key={ember.id} className="absolute left-1/2 -translate-x-1/2" style={{ top: burstOffset }}>
              <motion.div
                initial={{ y: travelDistance, x: 0, opacity: 0 }}
                animate={
                  phase === 'launching'
                    ? { y: travelDistance * (1 - ember.delay), x: ember.x, opacity: [0, 0.9, 0] }
                    : { opacity: 0 }
                }
                transition={
                  phase === 'launching'
                    ? { duration: 0.5, delay: ember.delay * travelDuration, ease: EASE_OUT }
                    : { duration: 0.2 }
                }
                className="size-1 rounded-full bg-[#ffd166]"
              />
            </div>
          ))}

          {/* Flash pulse at the moment of ignition */}
          <div className="absolute left-1/2 -translate-x-1/2" style={{ top: burstOffset - 8 }}>
            <motion.div
              initial={{ opacity: 0, scale: 0.4 }}
              animate={phase === 'burst' ? { opacity: [0.9, 0], scale: [0.4, 2.4] } : { opacity: 0, scale: 0.4 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
              className="size-16 rounded-full bg-[radial-gradient(circle,_#fff3c4_0%,_#f9a13a_45%,_transparent_75%)] blur-md"
            />
          </div>

          {/* Radiating burst sparks */}
          {sparks.map((s) => (
            <div key={s.id} className="absolute left-1/2 -translate-x-1/2" style={{ top: burstOffset }}>
              <motion.div
                initial={{ x: 0, y: 0, opacity: 0, scale: 1 }}
                animate={
                  phase === 'burst'
                    ? {
                        x: Math.cos(s.angle) * s.distance,
                        y: Math.sin(s.angle) * s.distance * 0.75,
                        opacity: [0, 1, 0],
                        scale: [1, 0.4],
                      }
                    : { x: 0, y: 0, opacity: 0 }
                }
                transition={phase === 'burst' ? { duration: 0.75, delay: s.delay, ease: EASE_OUT } : { duration: 0.2 }}
                style={{
                  width: s.size,
                  height: s.size,
                  backgroundColor: s.color,
                  boxShadow: `0 0 6px 1px ${s.color}`,
                }}
                className="rounded-full"
              />
            </div>
          ))}
        </>
      )}
    </div>
  )
}
