'use client'

import SearchRightBar from '@/app/(app)/search/SearchRightBar'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import SearchInputWithTanStackQuery from './SearchInputWithTanstack'

const RightLayout = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  return (
    <div className="pt-4 flex flex-col gap-4 sticky top-0 h-max">
      {pathname.startsWith('/search') ? (
        <SearchRightBar />
      ) : (
        <SearchInputWithTanStackQuery />
      )}
      {children}
    </div>
  )
}

export default RightLayout
