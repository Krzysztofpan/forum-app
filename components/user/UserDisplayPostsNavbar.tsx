'use client'
import { usePathname } from 'next/navigation'
import { Button } from '../ui/button'
import Link from 'next/link'

const UserDisplayPostsNavbar = ({ userId }: { userId: string }) => {
  const pathname = usePathname()
  return (
    <div className="grid grid-cols-3 ">
      <Button
        className={`text-base p-6 rounded-none cursor-pointer relative ${
          pathname === `/${userId}`
            ? 'text-foreground font-semibold after:w-1/4 after:h-[4px] after:bg-blue-400 after:rounded-full after:bottom-0 after:absolute '
            : 'text-foreground/50 font-normal'
        }`}
        variant="ghost"
        asChild
      >
        <Link href={`/${userId}`}>Posts</Link>
      </Button>
      <Button
        className={`text-base p-6 rounded-none cursor-pointer relative ${
          pathname === `/${userId}/with_replies`
            ? 'text-foreground font-semibold after:w-1/4 after:h-[4px] after:bg-blue-400 after:rounded-full after:bottom-0 after:absolute '
            : 'text-foreground/50 font-normal'
        }`}
        variant="ghost"
        asChild
      >
        <Link href={`/${userId}/with_replies`}>Replies</Link>
      </Button>
      <Button
        className={`text-base p-6 rounded-none cursor-pointer ${
          pathname === `/${userId}/media`
            ? 'text-foreground font-semibold after:w-1/4 after:h-[4px] after:bg-blue-400 after:rounded-full after:bottom-0 after:absolute  '
            : 'text-foreground/50 font-normal'
        }
            `}
        variant="ghost"
      >
        Media
      </Button>
    </div>
  )
}

export default UserDisplayPostsNavbar
