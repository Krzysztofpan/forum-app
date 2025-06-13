'use client'
import { useState } from 'react'
import { Button } from '../ui/button'
import useScroll from '@/hooks/useScroll'

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import Image from 'next/image'
import { ResponsiveSidebar } from '../ResponsiveSidebar'
const DisplayPosts = ({ avatar }: { avatar: string | null }) => {
  const [displayPosts, setDisplayPosts] = useState<'For you' | 'Following'>(
    'For you'
  )
  const isScrolled = useScroll()

  return (
    <div className="flex flex-col border-b-[1px] border-b-solid sticky top-0 bg-background/70 backdrop-blur-lg z-50 mx-[1px]">
      <div className="grid xs:hidden grid-cols-[1fr_auto_1fr] items-center px-4 pt-2 sticky top-0">
        <Image
          src={avatar || '/logo-sm.png'}
          className="rounded-full"
          alt="userImage"
          width={32}
          height={32}
        />

        <Image src="/logo-sm.png" alt="icon" width={22} height={22} />
      </div>
      <div className={` ${isScrolled ? '' : ''}`}>
        <Button
          className={`w-1/2 py-7 text-md relative cursor-pointer rounded-[0px] ${
            displayPosts === 'For you'
              ? 'after:w-14 after:h-1 after:bg-blue-400 after:rounded-full after:absolute after:bottom-0'
              : ''
          }`}
          onClick={() => setDisplayPosts('For you')}
          variant="ghost"
        >
          For you
        </Button>
        <Button
          className={`w-1/2 py-7 text-md relative cursor-pointer rounded-[0px]  ${
            displayPosts === 'Following'
              ? 'after:w-14 after:h-1 after:bg-blue-400 after:rounded-full after:absolute after:bottom-0'
              : ''
          }`}
          variant="ghost"
          onClick={() => setDisplayPosts('Following')}
        >
          Following
        </Button>
      </div>
    </div>
  )
}

export default DisplayPosts
