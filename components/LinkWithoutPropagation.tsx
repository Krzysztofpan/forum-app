'use client'

import Link from 'next/link'
import { ReactNode } from 'react'

const LinkWithoutPropagation = ({
  children,
  className,
  href,
}: {
  children: ReactNode
  className: string
  href: string
}) => {
  return (
    <Link
      href={href}
      className={className}
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      {children}
    </Link>
  )
}

export default LinkWithoutPropagation
