import { auth } from '@/auth'
import BackComponent from '@/components/BackComponent'
import CalendarDate from '@/components/CalendarDate'
import StickyTopComponent from '@/components/StickyTopComponent'
import { Button } from '@/components/ui/button'
import UserDisplayPostsNavbar from '@/components/user/UserDisplayPostsNavbar'
import UserFollow from '@/components/user/UserFollow'

import User, { userType } from '@/models/User'
import { Ellipsis, Search } from 'lucide-react'

import Image from 'next/image'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import React, { ReactNode } from 'react'
import { Link as LinkIcon } from 'lucide-react'
export default async function UserLayout({
  children,
  user,
}: {
  children: ReactNode
  user: userType
}) {
  const session = await auth()
  if (!session || !session.user) {
    return redirect('/login')
  }

  const account = await User.findById(session.user.id)

  const isFollowed = account.following.some(
    (id: string) => String(id) == String(user._id)
  )

  return (
    <div className="border-x-[1px] border-x-solid  min-h-[100vh] relative">
      <StickyTopComponent>
        <BackComponent>
          <div>
            <p className="font-semibold text-xl">{user.username}</p>
            <p className="text-xs text-foreground/50 font-thin">
              {user.posts.length} posts
            </p>
          </div>
        </BackComponent>
      </StickyTopComponent>
      <div className="w-full bg-foreground/30 aspect-[3/1] relative">
        {user.banner ? (
          <Image src={user.banner} alt={`${user.userAt} banner`} fill />
        ) : null}
      </div>
      <div className="translate-y-[-50%] absolute left-4 ">
        <Image
          src={user.avatar || '/logo-sm.png'}
          alt="logo"
          className="rounded-full z-30 bg-background p-1 aspect-square"
          width={135}
          height={135}
        />
      </div>
      <div className="m-3 flex justify-end gap-2">
        {user._id === session.user.id ? (
          <Button asChild variant="outline" className="rounded-full">
            <Link href="/settings/profile">Edit Profile</Link>
          </Button>
        ) : (
          <>
            <Button
              variant="outline"
              className="rounded-full p-0 m-0 aspect-square"
            >
              <span>
                <Ellipsis className="aspect-square" size={30} />
              </span>
            </Button>
            <Button
              variant="outline"
              className="rounded-full p-0 m-0 aspect-square"
            >
              <span>
                <Search className="aspect-square" size={30} />
              </span>
            </Button>
            <UserFollow isFollowed={isFollowed} userId={String(user._id)} />
          </>
        )}
      </div>
      <div className="mt-4 p-4">
        <p className="font-bold text-xl">{user.username}</p>
        <p className="text-sm text-foreground/50 font-thin">@{user.userAt}</p>
        <p className="text-sm my-3">{user.bio}</p>
        <div className="flex items-center gap-4 ">
          {user.website && (
            <Link href={user.website} target="_blank" className="flex gap-2">
              <LinkIcon size={18} className="text-foreground/50" />{' '}
              <span className="text-blue-400 hover:underline">
                {user.website.slice(12, user.website.length - 1)}
              </span>
            </Link>
          )}

          <CalendarDate date={user.createdAt} />
        </div>
        <div className="flex gap-4">
          <Link href={`/${user.userAt}/following`} className="hover:underline">
            <span className="font-semibold">{user.following.length}</span>{' '}
            <span className="text-foreground/50 text-sm font-light">
              Following
            </span>
          </Link>
          <Link href={`/${user.userAt}/followers`} className="hover:underline">
            <span className="font-semibold">{user.followers.length}</span>{' '}
            <span className="text-foreground/50 text-sm font-light">
              Followers
            </span>
          </Link>
        </div>
      </div>
      <UserDisplayPostsNavbar userId={user.userAt} />
      <main className="border-t-[1px] border-border">{children}</main>
    </div>
  )
}
