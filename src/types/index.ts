import type { ReactNode } from 'react'

export interface NavItem {
  label: string
  href: string
}

export interface WithChildren {
  children?: ReactNode
}

export interface WithClassName {
  className?: string
}
