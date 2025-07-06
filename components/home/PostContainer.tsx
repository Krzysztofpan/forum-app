'use client'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const PostContainer = ({
  children,
  href,
  withChildren = false,
}: {
  children: ReactNode
  href: string
  withChildren?: boolean
}) => {
  const router = useRouter()

  const handleClick = () => {
    router.push(href)
  }

  return (
    <article
      className={`grid grid-cols-[40px_1fr_30px]  px-5 gap-2 cursor-pointer hover:bg-foreground/5 ${
        !withChildren ? 'border-b-[1px] border-b-border py-3' : 'pt-3'
      }`}
      onClick={handleClick}
    >
      {children}
    </article>
  )
}

export default PostContainer
