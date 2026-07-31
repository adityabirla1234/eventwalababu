import type { HTMLAttributes, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/utils'

export type ContainerSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

const sizeStyles: Record<ContainerSize, string> = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-7xl',
  xl: 'max-w-[90rem]',
  full: 'max-w-none',
}

interface ContainerProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType
  size?: ContainerSize
  children?: ReactNode
}

/** Centers content and applies consistent horizontal gutters across breakpoints. */
export function Container({
  as: Tag = 'div',
  size = 'lg',
  className,
  children,
  ...rest
}: ContainerProps) {
  return (
    <Tag
      className={cn('mx-auto w-full px-5 sm:px-8 lg:px-12', sizeStyles[size], className)}
      {...rest}
    >
      {children}
    </Tag>
  )
}
