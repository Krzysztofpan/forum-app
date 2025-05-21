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
import { userType } from '@/models/User'

const HomeNavbar = ({ user }: { user: Omit<userType, 'createdAt'> }) => {
  const path = usePathname()

  return (
    <nav className="mx-1 sm:mx-2  flex items-end xl:items-start flex-col gap-3  sticky top-0 h-fit w-full  max-w-[265px] ">
      <div className="group w-full cursor-pointer">
        <Link
          href="/home"
          className="flex gap-5 text-xl justify-end xl:justify-start  xl:items-center mx-4 mt-3 "
        >
          <Image src="/logo-sm.png" width={25} height={25} alt="Cube" />
        </Link>
      </div>
      <Link href="/home" className="group xl:w-full cursor-pointer">
        <div
          className={`flex gap-5 text-xl items-center  hover:bg-foreground/10  py-3 px-4 rounded-full group-hover:bg-foreground/10 w-fit   ${
            path === '/home' ? 'font-bold ' : null
          }`}
        >
          {path === '/home' ? (
            <GoHomeFill className="scale-130 " />
          ) : (
            <GoHome className="scale-130" />
          )}
          <span className="hidden xl:inline">Home</span>
        </div>
      </Link>
      <div className="group xl:w-full cursor-pointer">
        <Link
          href="/explore"
          className={`flex gap-5 text-xl items-center  hover:bg-foreground/10  py-3 px-4 rounded-full group-hover:bg-foreground/10 w-fit  ${
            path === '/explore' ? 'font-bold' : null
          }   justify-end xl:justify-start`}
        >
          <Search
            className={` ${path === '/explore' ? 'stroke-[3] ' : null}`}
          />
          <span className="hidden xl:inline">Explore</span>
        </Link>
      </div>
      <Link href="/notifications" className="group xl:w-full cursor-pointer">
        <div
          className={`flex gap-5 text-xl items-center  px-4 py-3 hover:bg-foreground/10  rounded-full group-hover:bg-foreground/10 w-fit  ${
            path === '/notifications' ? 'font-bold' : null
          }`}
        >
          {path === '/notifications' ? (
            <GoBellFill className="scale-130" />
          ) : (
            <GoBell className="scale-130" />
          )}
          <span className="hidden xl:inline">Notifications</span>
        </div>
      </Link>
      <Link href={`/${user.userAt}`} className="group xl:w-full cursor-pointer">
        <div
          className={`flex gap-5 text-xl items-center  px-4 py-3 hover:bg-foreground/10  rounded-full group-hover:bg-foreground/10 w-fit  ${
            path === `/${String(user.userAt)}` ? 'font-bold' : null
          }`}
        >
          {path === `/${String(user.userAt)}` ? (
            <FaUser className="scale-130" />
          ) : (
            <FaRegUser className="scale-130" />
          )}
          <span className="hidden xl:inline">Profile</span>
        </div>
      </Link>
      <Link href="/bookmarks" className="group xl:w-full cursor-pointer ">
        <div
          className={`flex  gap-5 text-xl items-center px-4 py-3 hover:bg-foreground/10 rounded-full group-hover:bg-foreground/10 w-fit  ${
            path === '/bookmarks' ? 'font-bold' : null
          }`}
        >
          {path === '/bookmarks' ? (
            <PiBookmarkSimpleFill className="scale-130" />
          ) : (
            <PiBookmarkSimple className="scale-130" />
          )}
          <span className="hidden xl:inline">Bookmarks</span>
        </div>
      </Link>
      {/*  <Link href={'/compose/post'}>
        <Button className="hidden xl:inline-flex w-full py-6 rounded-full text-lg mt-4 mb-8">
          Post
        </Button>
      </Link> */}
      <div className="xl:grid xl:grid-cols-[1fr_20px]">
        <div className="xl:grid xl:grid-cols-[40px_190px] xl:gap-3">
          <Image
            src={user.avatar || '/logo.png'}
            alt="logo"
            className="rounded-full aspect-square"
            width={40}
            height={40}
          />
          <div className="xl:flex flex-col hidden ">
            <span className="font-bold">{user.username}</span>
            <span className="text-foreground/50">@{user.userAt}</span>
          </div>
        </div>
        <div className="hidden xl:flex items-center justify-center ">
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
