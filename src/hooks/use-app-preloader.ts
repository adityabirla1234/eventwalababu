import { useEffect } from 'react'

declare global {
  interface Window {
    /** Set inline in index.html, as early as possible — see the comment there. */
    __appLoadStart?: number
  }
}

/** Must match the `transition: opacity 0.5s` duration on #app-preloader in index.html. */
const FADE_MS = 500

/**
 * Keeps the static HTML preloader (#app-preloader in index.html) visible for
 * at least this long, measured from true page-load start — so on a fast
 * connection/local dev it still reads as an intentional branded moment
 * rather than a one-frame flicker. On a slow connection, the preloader was
 * already visible for the whole JS download/parse window before this effect
 * even runs, so this rarely adds any extra wait in practice.
 */
const MIN_VISIBLE_MS = 600

/**
 * Call once, near the root of the app. Fades out and removes the preloader
 * after the minimum visible duration has elapsed. Only ever runs once per
 * full page load (the preloader element is static markup in index.html, not
 * part of the React tree, so client-side route changes never re-trigger it).
 */
export function useAppPreloader() {
  useEffect(() => {
    const el = document.getElementById('app-preloader')
    if (!el) return

    const start = window.__appLoadStart ?? Date.now()
    const remaining = Math.max(0, MIN_VISIBLE_MS - (Date.now() - start))

    const showTimer = setTimeout(() => {
      el.classList.add('is-hidden')
      setTimeout(() => el.remove(), FADE_MS)
    }, remaining)

    return () => clearTimeout(showTimer)
  }, [])
}
