'use client'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const PostContainer = ({
  children,
  href,
}: {
  children: ReactNode
  href: string
}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <article
      className="grid grid-cols-[40px_1fr_30px] py-2 px-3 gap-2 border-b-[1px] border-b-border  cursor-pointer"
      onClick={handleClick}
    >
      {children}
    </article>
  )
}

export default PostContainer
