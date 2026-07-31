import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'
import { BRAND_NAME } from '@/lib/navigation'
import navbarLogo from '@/assets/navbar-logo.png'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className="block shrink-0" aria-label={`${BRAND_NAME} — Home`}>
      <img src={navbarLogo} alt={BRAND_NAME} className={cn('h-8 w-auto sm:h-9', className)} />
    </Link>
  )
}
