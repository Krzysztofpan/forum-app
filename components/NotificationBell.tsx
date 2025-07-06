'use client'

import { useEffect, useState } from 'react'

import { pusherClient } from '@/lib/pusher-client'
import PostComponent from './PostComponent'
import { PostWithDetails } from '@/types'
import Image from 'next/image'
import LinkWithoutPropagation from './LinkWithoutPropagation'
import { FaUserCircle } from 'react-icons/fa'
import { getUserNotifications } from '@/lib/notifications'

import { useRouter } from 'next/navigation'
import Spinner from './Spinner'

type Notification = {
  id: string
  type: string
  read: boolean
  createdAt: Date
  postId?: number
  actor: {
    displayName: string
    username: string
    img: string | null
  } | null
  post?: {
    id: number
    desc?: string
  }
  user?: {
    username: string
  }
}

export default function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  useEffect(() => {
    const getNotifications = async () => {
      setIsLoading(true)
      const res = await getUserNotifications(userId)

      setNotifications(res as Notification[])
      setIsLoading(false)
    }

    getNotifications()
  }, [])

  useEffect(() => {
    if (!userId) return
    const channel = pusherClient.subscribe(`private-user-${userId}`)

    channel.bind('new-notification', (data: Notification) => {
      setNotifications((prev) => [data, ...prev])
    })

    return () => {
      pusherClient.unsubscribe(`private-user-${userId}`)
    }
  }, [userId])

  /*   const unreadCount = notifications.filter((n) => !n.read).length */
  if (isLoading) {
    return (
      <div className="h-[50vh] flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  if (!notifications.length)
    return (
      <h1 className="text-center text-3xl font-bold my-3">
        You don't have any notifications
      </h1>
    )

  return (
    <div className="relative">
      {notifications.map((w) => {
        if (w.type === 'COMMENT_ADDED') {
          return (
            <PostComponent key={w.post?.id} post={w.post as PostWithDetails} />
          )
        }

        if (w.type === 'NEW_FOLLOWER') {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation()

                router.push(`/${w.user?.username}`)
              }}
              className="grid grid-cols-[50px_1fr] p-5 border-b-[1px] border-border cursor-pointer hover:bg-foreground/5"
              key={w.id}
            >
              <div>
                <LinkWithoutPropagation
                  href={`/${w.actor?.username}`}
                  className=""
                >
                  {w.actor?.img ? (
                    <>
                      <Image
                        src={w.actor.img || '/logo-sm.png'}
                        alt={`${w.actor.username} avatar`}
                        width={40}
                        height={40}
                        className="rounded-full aspect-square"
                      />
                    </>
                  ) : (
                    <FaUserCircle size={40} />
                  )}
                </LinkWithoutPropagation>
              </div>
              <div>
                <p className="truncate flex gap-1">
                  {w.actor?.displayName} @{w.actor?.username} followed you!
                </p>
              </div>
            </div>
          )
        }
        if (w.type === 'POST_REPOSTED') {
          return (
            <div
              key={w.id}
              className="grid grid-cols-[50px_1fr] p-5 border-b-[1px] border-border cursor-pointer hover:bg-foreground/5"
              onClick={(e) => {
                e.stopPropagation()

                router.push(`/${w.user?.username}/status/${w.post?.id}`)
              }}
            >
              <div>
                <LinkWithoutPropagation
                  href={`/${w.actor?.username}`}
                  className=""
                >
                  {w.actor?.img ? (
                    <>
                      <Image
                        src={w.actor.img || '/logo-sm.png'}
                        alt={`${w.actor.username} avatar`}
                        width={40}
                        height={40}
                        className="rounded-full aspect-square"
                      />
                    </>
                  ) : (
                    <FaUserCircle size={40} />
                  )}
                </LinkWithoutPropagation>
              </div>
              <div>
                <p className="truncate flex gap-1">
                  {w.actor?.displayName} @{w.actor?.username} rePosted your
                  Post!
                </p>
              </div>
            </div>
          )
        }
        if (w.type === 'POST_LIKED') {
          return (
            <div
              onClick={(e) => {
                e.stopPropagation()

                router.push(`/${w.user?.username}/status/${w.postId}`)
              }}
              className="grid grid-cols-[50px_1fr] p-5 border-b-[1px] border-border cursor-pointer hover:bg-foreground/5"
              key={w.id}
            >
              <div>
                <LinkWithoutPropagation
                  href={`/${w.actor?.username}`}
                  className=""
                >
                  {w.actor?.img ? (
                    <>
                      <Image
                        src={w.actor.img || '/logo-sm.png'}
                        alt={`${w.actor.username} avatar`}
                        width={40}
                        height={40}
                        className="rounded-full aspect-square"
                      />
                    </>
                  ) : (
                    <FaUserCircle size={40} />
                  )}
                </LinkWithoutPropagation>
              </div>
              <div>
                <p className="truncate flex gap-1">
                  {w.actor?.displayName} @{w.actor?.username} liked your post!
                </p>
              </div>
            </div>
          )
        }
      })}
    </div>
  )
}
