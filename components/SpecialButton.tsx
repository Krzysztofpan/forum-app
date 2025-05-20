'use client'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const SpecialButton = ({
  children,
  link,
}: {
  children: ReactNode
  link: string
}) => {
  const router = useRouter()
  const pathname = usePathname()
  return (
    <div
      className={`${
        pathname === link
          ? 'font-bold after:w-18 after:bg-blue-400 after:h-[4px] after:rounded-full after:bottom-0 after:absolute '
          : ''
      } hover:bg-foreground/10 cursor-pointer m-0 flex justify-center items-center py-3 text-base`}
      onClick={() => {
        router.push(link)
      }}
    >
      {children}
    </div>
  )
}

export default SpecialButton
