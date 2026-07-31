import { useMediaQuery } from '@/hooks/use-media-query'

/** Returns true when the user has requested reduced motion at the OS/browser level. */
export function useReducedMotion(): boolean {
  return useMediaQuery('(prefers-reduced-motion: reduce)')
}
