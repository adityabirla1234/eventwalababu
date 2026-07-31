import { cn } from '@/lib/utils'

/** Small inline spinner for buttons/cards. */
export function Spinner({ className }: { className?: string }) {
  return (
    <svg
      className={cn('size-5 animate-spin text-[var(--color-accent)]', className)}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path
        d="M22 12a10 10 0 0 0-10-10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  )
}

/** Skeleton block for content placeholders (respects reduced motion via CSS). */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn('animate-pulse rounded-[var(--radius-sm)] bg-[var(--color-muted)]', className)}
      aria-hidden="true"
    />
  )
}

/**
 * Full-viewport branded loader — shown during route-level suspense (lazy
 * chunk loads on navigation). Logo-only, matching the static #app-preloader
 * markup in index.html, so a route change never shows the wordmark text
 * that the initial-boot preloader intentionally omits.
 */
export function PageLoader({ label = 'Loading' }: { label?: string }) {
  return (
    <div
      className="fixed inset-0 z-[var(--z-toast)] flex items-center justify-center bg-[var(--color-background)]"
      role="status"
      aria-live="polite"
    >
      <img
        src="/preloader-logo.png"
        alt=""
        width={520}
        height={271}
        className="w-[min(220px,55vw)] animate-[app-loader-pulse_1.8s_ease-in-out_infinite]"
      />
      <span className="sr-only">{label}</span>
      <style>{`
        @keyframes app-loader-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.72; transform: scale(0.96); }
        }
        @media (prefers-reduced-motion: reduce) {
          img { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
