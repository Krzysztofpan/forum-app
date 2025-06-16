'use client'
import Link from 'next/link'

import { Ellipsis, Search } from 'lucide-react'
import { FaRegUser, FaUser } from 'react-icons/fa6'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
//import Logo from '../Logo'

import { GoBell, GoBellFill, GoHome, GoHomeFill } from 'react-icons/go'
import { PiBookmarkSimple, PiBookmarkSimpleFill } from 'react-icons/pi'
import { Button } from '../ui/button'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from '../ui/dropdown-menu'
import { DropdownMenuItem } from '@radix-ui/react-dropdown-menu'
import { logout } from '@/lib/actions/auth.action'

import useScroll from '@/hooks/useScroll'
import { User } from '@prisma/client'

const HomeNavbar = ({ user }: { user: User }) => {
  const path = usePathname()
  const isScrolled = useScroll()
  return (
    <nav
      className={`flex bg-background pb-1 border-t-[1px] xs:pt-2 xs:pb-8 xs:h-screen xs:flex-col justify-between z-50 sm:z-10 ${
        isScrolled ? 'opacity-30 xs:opacity-100' : ''
      }`}
    >
      <div className="flex  w-full justify-between xs:flex-col sm:gap-4 text-lg items-end xxl:items-start  xs:px-2">
        <div className="group hidden xs:block w-full cursor-pointer">
          <Link
            href="/home"
            className="flex gap-5 text-xl justify-end xxl:justify-start  xxl:items-center mx-4 mt-3 "
          >
            <Image src="/logo-sm.png" width={25} height={25} alt="Cube" />
          </Link>
        </div>
        <Link href="/home" className="group xxl:w-full cursor-pointer">
          <div
            className={`flex gap-5 text-xl items-center  hover:bg-foreground/10  py-3 px-4 rounded-full group-hover:bg-foreground/10 w-fit   ${
              path === '/home' ? 'font-bold ' : null
            }`}
          >
            {path === '/home' ? (
              <GoHomeFill className="sm:scale-130 " />
            ) : (
              <GoHome className="sm:scale-130" />
            )}
            <span className="hidden xxl:inline">Home</span>
          </div>
        </Link>
        <div className="group xxl:w-full cursor-pointer">
          <Link
            href="/explore"
            className={`flex gap-5 text-xl items-center  hover:bg-foreground/10  py-3 px-4 rounded-full group-hover:bg-foreground/10 w-fit  ${
              path === '/explore' ? 'font-bold' : null
            }   justify-end xxl:justify-start`}
          >
            <Search
              className={` ${path === '/explore' ? 'stroke-[3] ' : null}`}
            />
            <span className="hidden xxl:inline">Explore</span>
          </Link>
        </div>
        <Link href="/notifications" className="group xxl:w-full cursor-pointer">
          <div
            className={`flex gap-5 text-xl items-center  px-4 py-3 hover:bg-foreground/10  rounded-full group-hover:bg-foreground/10 w-fit  ${
              path === '/notifications' ? 'font-bold' : null
            }`}
          >
            {path === '/notifications' ? (
              <GoBellFill className="sm:scale-130" />
            ) : (
              <GoBell className="sm:scale-130" />
            )}
            <span className="hidden xxl:inline">Notifications</span> w
          </div>
        </Link>
        <Link
          href={`/${user.username}`}
          className="group xxl:w-full cursor-pointer"
        >
          <div
            className={`flex gap-5 text-xl items-center  px-4 py-3 hover:bg-foreground/10  rounded-full group-hover:bg-foreground/10 w-fit  ${
              path === `/${String(user.username)}` ? 'font-bold' : null
            }`}
          >
            {path.includes(`/${String(user.username)}`) &&
            !path.includes('status') ? (
              <FaUser className="sm:scale-130" />
            ) : (
              <FaRegUser className="sm:scale-130" />
            )}
            <span className="hidden xxl:inline">Profile</span>
          </div>
        </Link>
        <Link href="/bookmarks" className="group xxl:w-full cursor-pointer ">
          <div
            className={`flex  gap-5 text-xl items-center px-4 py-3 hover:bg-foreground/10 rounded-full group-hover:bg-foreground/10 w-fit  ${
              path === '/bookmarks' ? 'font-bold' : null
            }`}
          >
            {path === '/bookmarks' ? (
              <PiBookmarkSimpleFill className="sm:scale-130" />
            ) : (
              <PiBookmarkSimple className="sm:scale-130" />
            )}
            <span className="hidden xxl:inline">Bookmarks</span>
          </div>
        </Link>
        {/*  <Link href={'/compose/post'}>
        <Button className="hidden xxl:inline-flex w-full py-6 rounded-full text-lg mt-4 mb-8">
          Post
        </Button>
      </Link> */}
      </div>
      <div className="hidden xs:block  xxl:grid xxl:grid-cols-[1fr_20px]">
        <div className="flex items-center justify-center xxl:grid xxl:grid-cols-[40px_190px] xxl:gap-3 ">
          <Image
            src={user.img || '/logo.png'}
            alt="logo"
            className="rounded-full aspect-square"
            width={40}
            height={40}
          />
          <div className="xxl:flex flex-col hidden ">
            <span className="font-bold">{user.displayName}</span>
            <span className="text-foreground/50">@{user.username}</span>
          </div>
        </div>
        <div className="hidden xxl:flex items-center justify-center ">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Ellipsis />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Button onClick={logout} variant="ghost">
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavbar
