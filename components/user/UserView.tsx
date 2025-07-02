'use client'
import { FaCircleUser } from 'react-icons/fa6'

import UserFollow from './UserFollow'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const UserView = ({
  username,
  userDisplayName,
  userId,
  isFollowed,
  userAvatar,
  vertical = false,
}: {
  username: string
  userDisplayName: string
  userId?: string
  isFollowed?: boolean
  userAvatar?: string
  vertical?: boolean
}) => {
  const router = useRouter()
  return (
    <div className="grid grid-cols-[40px_1fr] gap-4  cursor-pointer">
      <div
        onClick={(e) => {
          e.stopPropagation()
          router.push(`/${username}`)
        }}
      >
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={`${username} avatar`}
            className="rounded-full aspect-square"
            width={40}
            height={40}
          />
        ) : (
          <FaCircleUser size={40} />
        )}
      </div>
      <div className={`flex justify-between`}>
        <div
          className={`flex ${
            vertical ? 'flex-row gap-2' : 'flex-col'
          }  justify-start `}
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/${username}`)
            }}
          >
            <p className="font-bold truncate  ">{userDisplayName}</p>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation()
              router.push(`/${username}`)
            }}
          >
            <p className="text-foreground/50 truncate ">@{username}</p>
          </div>
        </div>
        {!isFollowed && userId && (
          <UserFollow
            username={username}
            isFollowed={isFollowed as boolean}
            userId={String(userId)}
          />
        )}
      </div>
    </div>
  )
}

export default UserView
