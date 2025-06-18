'use client'
import { usePathname, useSearchParams } from 'next/navigation'

import Link from 'next/link'
import { Button } from './ui/button'

const HashtagNavbar = ({ hashtagName }: { hashtagName: string }) => {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  console.log(pathname, searchParams.get('f'))

  return (
    <div className="grid grid-cols-3 border-b-[1px] border-border">
      <Button
        className={`text-base p-6 rounded-none cursor-pointer relative ${
          pathname === `/hashtag/${hashtagName}` && !searchParams.get('f')
            ? 'text-foreground font-semibold after:w-1/4 after:h-[4px] after:bg-blue-400 after:rounded-full after:bottom-0 after:absolute '
            : 'text-foreground/50 font-normal'
        }`}
        variant="ghost"
        asChild
      >
        <Link href={`/hashtag/${hashtagName}`}>Top</Link>
      </Button>
      <Button
        className={`text-base p-6 rounded-none cursor-pointer relative ${
          pathname === `/hashtag/${hashtagName}` &&
          searchParams.get('f') === 'live'
            ? 'text-foreground font-semibold after:w-1/4 after:h-[4px] after:bg-blue-400 after:rounded-full after:bottom-0 after:absolute '
            : 'text-foreground/50 font-normal'
        }`}
        variant="ghost"
        asChild
      >
        <Link href={`/hashtag/${hashtagName}?f=live`}>Latest</Link>
      </Button>
      <Button
        className={`text-base p-6 rounded-none cursor-pointer ${
          pathname === `/hashtag/${hashtagName}?f=media`
            ? 'text-foreground font-semibold after:w-1/4 after:h-[4px] after:bg-blue-400 after:rounded-full after:bottom-0 after:absolute  '
            : 'text-foreground/50 font-normal'
        }
            `}
        variant="ghost"
      >
        <Link href={`/hashtag/${hashtagName}?f=media`}>Media</Link>
      </Button>
    </div>
  )
}

export default HashtagNavbar
