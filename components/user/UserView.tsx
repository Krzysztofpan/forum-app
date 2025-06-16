import { FaCircleUser } from 'react-icons/fa6'

import UserFollow from './UserFollow'
import Link from 'next/link'
import Image from 'next/image'

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
  return (
    <div className="grid grid-cols-[40px_1fr] gap-4">
      <Link href={`/${username}`}>
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
      </Link>
      <div className={`flex justify-between`}>
        <div
          className={`flex ${
            vertical ? 'flex-row gap-2' : 'flex-col'
          }  justify-start `}
        >
          <Link href={`/${username}`}>
            <p className="font-bold truncate  ">{userDisplayName}</p>
          </Link>
          <Link href={`/${username}`}>
            <p className="text-foreground/50 truncate ">@{username}</p>
          </Link>
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
