import { auth } from '@/auth'
import { prisma } from '@/prisma'
import Image from 'next/image'

import Link from 'next/link'

const Recommendations = async () => {
  const session = await auth()

  if (!session || !session.user.id) return
  const userId = session.user.id

  const followingIds = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  })

  const followedUserIds = followingIds.map((f) => f.followingId)

  const friendRecommendations = await prisma.user.findMany({
    where: {
      id: { not: userId, notIn: followedUserIds },
      followings: { some: { followerId: { in: followedUserIds } } },
    },
    take: 3,
    select: { id: true, displayName: true, username: true, img: true },
  })

  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      {friendRecommendations.map((person) => (
        <div className="flex items-center justify-between" key={person.id}>
          {/* IMAGE AND USER INFO */}
          <div className=" flex items-center gap-2">
            <div className="relative  h-10 w-10 rounded-full overflow-hidden">
              <Image
                src={person.img || '/general/avatar.png'}
                alt={person.username}
                fill
              />
            </div>
            <div>
              <h1 className="text-md font-bold">{person.displayName}</h1>
              <span className="text-textGray text-sm">@{person.username}</span>
            </div>
          </div>
          {/* BUTTON */}
          <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
            Follow
          </button>
        </div>
      ))}

      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  )
}

export default Recommendations
