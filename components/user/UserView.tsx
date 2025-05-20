import { FaCircleUser } from 'react-icons/fa6'

import UserFollow from './UserFollow'
import Link from 'next/link'
import Image from 'next/image'

const UserView = ({
  username,
  userAt,
  userId,
  isFollowed,
  userAvatar,
}: {
  username: string
  userAt: string
  userId?: string
  isFollowed?: boolean
  userAvatar?: string
}) => {
  return (
    <div className="grid grid-cols-[40px_1fr] gap-4">
      <Link href={`/${userAt}`}>
        {userAvatar ? (
          <Image
            src={userAvatar}
            alt={`${userAt} avatar`}
            className="rounded-full"
            width={40}
            height={40}
          />
        ) : (
          <FaCircleUser size={40} />
        )}
      </Link>
      <div className="flex justify-between">
        <div className="flex flex-col justify-start text-sm">
          <Link href={`/${userAt}`}>
            <p className="font-bold">{username}</p>
          </Link>
          <Link href={`/${userAt}`}>
            <p className="text-foreground/50">@{userAt}</p>
          </Link>
        </div>
        {!isFollowed && userId && (
          <UserFollow
            isFollowed={isFollowed as boolean}
            userId={String(userId)}
          />
        )}
      </div>
    </div>
  )
}

export default UserView
