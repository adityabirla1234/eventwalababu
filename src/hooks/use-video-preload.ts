import { useCallback, useRef } from 'react'

/**
 * Roughly enough bytes to cover the first ~10 seconds of a typical
 * web-optimized H.264 video at a moderate bitrate (~2 Mbps). It's an
 * estimate, not a frame-accurate cut — the goal is "instant playback start,"
 * not an exact 10.000s boundary, so a generous approximation is fine.
 */
const PRELOAD_BYTES = 2_500_000

/** Debounce so a mouse merely passing over a tile doesn't trigger a fetch. */
const HOVER_INTENT_MS = 150

/**
 * Module-level (not per-component) so the same video is never fetched twice
 * across remounts, re-hovers, or multiple gallery tiles sharing a URL.
 */
const requested = new Set<string>()

/**
 * Hybrid range-request preloading for gallery videos.
 *
 * On hover (desktop) or touchstart (mobile/tablet), fires a `Range`-header
 * fetch for the first ~10 seconds of video bytes. The response isn't used
 * directly — the point is to warm the browser's HTTP cache for that URL/byte
 * range, so when the `<video>` element itself starts buffering moments later
 * (on open, or on play), its own overlapping range requests are served from
 * cache instead of the network. That's what makes playback start instantly
 * with no stall, without needing a custom Media Source Extensions player.
 *
 * Once playback begins, the native `<video>` element takes over ordinary
 * progressive buffering — browsers request subsequent byte ranges from the
 * server as playback approaches the buffered edge, which is standard HTML5
 * video behavior for any server that advertises `Accept-Ranges: bytes`
 * (true of virtually every real video host/CDN). This hook only needs to
 * own the "instant start" head start, not the ongoing streaming.
 */
export function useVideoPreload(src: string | undefined) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const controllerRef = useRef<AbortController | null>(null)

  const runPreload = useCallback(() => {
    if (!src || requested.has(src)) return
    requested.add(src)

    const controller = new AbortController()
    controllerRef.current = controller

    fetch(src, {
      headers: { Range: `bytes=0-${PRELOAD_BYTES}` },
      signal: controller.signal,
    }).catch(() => {
      // Network hiccup, offline, or the host ignored the Range header (some
      // dev/test hosts do). Either way, fall back silently — the <video>
      // element will still play normally, just without the warm-cache head
      // start, so this must never surface as a user-facing error.
      requested.delete(src)
    })
  }, [src])

  /** Call on `onMouseEnter` / `onTouchStart`. */
  const startPreload = useCallback(() => {
    if (!src || requested.has(src)) return
    timerRef.current = setTimeout(runPreload, HOVER_INTENT_MS)
  }, [src, runPreload])

  /** Call on `onMouseLeave` / `onTouchEnd`. Cancels a not-yet-fired debounce or an in-flight fetch. */
  const cancelPreload = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    controllerRef.current?.abort()
  }, [])

  return { startPreload, cancelPreload }
}
