import { useEffect, useRef, useState } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useMediaQuery } from '@/hooks/use-media-query'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

// `f-mp4` pins a real H.264/AAC MP4 explicitly, rather than `f-auto` letting
// ImageKit choose a format/codec per device. `f-auto` is a plausible second
// culprit behind "plays on desktop, never plays on this one Android phone":
// it can hand back different codecs to different devices, and a codec the
// phone's hardware decoder doesn't support fails silently — no error event
// most of the time, just a poster that never advances. Pinning the format
// removes that variable entirely.
const VIDEO_SRC =
  'https://ik.imagekit.io/dwze584zkp/EventWalaBabu/Home%20page%20video/ContainerHomePage.mp4?tr=w-1920,q-70,f-mp4&updatedAt=1785226432294'

interface HeroLoopVideoProps {
  className?: string
  poster?: string
  /**
   * Which breakpoint this instance is for. The mobile (`ContainerScrollCompact`,
   * in Hero.tsx) and desktop (`ContainerScroll`, in AboutPreview.tsx) call
   * sites both render unconditionally and use Tailwind's `lg:hidden` /
   * `hidden lg:flex` to show only one at a time — but `display: none` does
   * NOT stop an already-mounted <video>'s network activity, so without this
   * prop both would silently buffer the same file at once on every device.
   * This makes the *video specifically* truly not mount on the breakpoint
   * it isn't needed on, rather than relying on CSS alone.
   */
  variant: 'mobile' | 'desktop'
}

/**
 * Looping background video — autoplay, no seek/skip controls, filling the
 * same role the static photo used to. Starts muted (browsers block
 * autoplay-with-sound without a prior user gesture), with a small toggle
 * button so anyone who wants sound can turn it on in one click.
 *
 * Loading choreography — deliberately simple:
 *  1. An IntersectionObserver on the wrapper tracks when the card first
 *     scrolls into view.
 *  2. The moment that happens, `.play()` is called once (guarded by
 *     `hasStartedRef`) and never called again for this mount — no
 *     play/pause toggling on every subsequent visibility change. This
 *     section sits inside a scroll-linked transform (see
 *     `container-scroll-animation.tsx`), which can flip `isIntersecting`
 *     repeatedly as the user scrolls back and forth; pausing/resuming a
 *     `<video>` on every one of those flips is real decode/GPU work this
 *     component has no reason to repeat once playback has already started.
 *  3. No manual "wait until N seconds are buffered" gate sits in front of
 *     `.play()`, and no `<link rel="preload">` is injected manually either
 *     — `preload="metadata"` on the element plus a direct `.play()` call
 *     is what actually prompts the browser to fetch and buffer seriously,
 *     without competing against the browser's own resource-priority
 *     decisions for the rest of the page. The native `<video>` element
 *     already pauses internally and waits when it runs out of buffer,
 *     then resumes on its own once more data arrives — that stall/resume
 *     handling doesn't need to be reimplemented here.
 *  4. `loop` handles the seamless repeat.
 *  5. If `.play()` is rejected or the element errors out, it's retried a
 *     few times with backoff rather than failing silently forever.
 *
 * `prefers-reduced-motion`: shows the static poster frame instead of
 * autoplaying, since there is deliberately no pause control otherwise.
 */
const MAX_PLAY_RETRIES = 4

export function HeroLoopVideo({ className, poster, variant }: HeroLoopVideoProps) {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reducedMotion = useReducedMotion()
  const videoRef = useRef<HTMLVideoElement>(null)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const retriesRef = useRef(0)
  const hasStartedRef = useRef(false)
  const [inView, setInView] = useState(false)
  const [muted, setMuted] = useState(true)
  const [failed, setFailed] = useState(false)

  const shouldMount = variant === 'desktop' ? isDesktop : !isDesktop

  useEffect(() => {
    if (!shouldMount || reducedMotion) return
    const wrapper = wrapperRef.current
    if (!wrapper) return
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 })
    observer.observe(wrapper)
    return () => observer.disconnect()
  }, [shouldMount, reducedMotion])

  useEffect(() => {
    if (!shouldMount || reducedMotion || failed || hasStartedRef.current || !inView) return
    const video = videoRef.current
    if (!video) return

    hasStartedRef.current = true
    video.play().catch(() => {
      // Autoplay can still be transiently rejected (e.g. the tab was
      // backgrounded mid-request). Retry with backoff rather than
      // silently giving up — this is the recovery path for that, not
      // for a genuinely broken source (onError below handles that case).
      hasStartedRef.current = false
      if (retriesRef.current >= MAX_PLAY_RETRIES) return
      retriesRef.current += 1
      setTimeout(() => {
        hasStartedRef.current = true
        video.play().catch(() => {
          hasStartedRef.current = false
        })
      }, 600 * retriesRef.current)
    })
  }, [inView, reducedMotion, shouldMount, failed])

  if (!shouldMount) return null

  if (reducedMotion || failed) {
    return (
      <div className={className}>
        {poster && <img src={poster} alt="" className="size-full object-cover" />}
      </div>
    )
  }

  return (
    <div ref={wrapperRef} className={`relative ${className ?? ''}`}>
      <video
        ref={videoRef}
        src={VIDEO_SRC}
        poster={poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        disablePictureInPicture
        disableRemotePlayback
        controlsList="nodownload nofullscreen noremoteplayback"
        onContextMenu={(e) => e.preventDefault()}
        onError={() => setFailed(true)}
        aria-hidden="true"
        className="pointer-events-none size-full object-cover"
      />
      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? 'Unmute video' : 'Mute video'}
        aria-pressed={!muted}
        className="absolute bottom-3 right-3 z-10 flex size-9 items-center justify-center rounded-full border border-white/20 bg-[var(--color-onyx-950)]/70 text-white transition-colors hover:border-[var(--color-gold-400)] hover:text-[var(--color-gold-400)]"
      >
        {muted ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
      </button>
    </div>
  )
}
