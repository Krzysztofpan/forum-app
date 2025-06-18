import DataNotFoundInformation from '@/components/DataNotFoundFoundInformation'
import UserView from '@/components/user/UserView'

import { prisma } from '@/prisma'

const FollowersPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>
}) => {
  const userId = (await params).userId

  const user = await prisma.user.findUnique({
    where: { username: userId },
    include: {
      followers: {
        include: {
          following: {
            select: { displayName: true, username: true, id: true, img: true },
          },
        },
      },
    },
  })
  if (!user) return

  if (!user.followers.length) {
    return (
      <DataNotFoundInformation
        header={`@${user.username} isn't following anyone`}
        info="Once they follow accounts, they'll show up here."
      />
    )
  }
  return (
    <div className="">
      {user.followers.map(
        (follow: {
          following: {
            username: string
            displayName: string
            id: string
            img: string | null
          }
        }) => (
          <div className="p-4 r" key={follow.following.id}>
            <UserView
              username={follow.following.username}
              userDisplayName={follow.following.displayName}
              userAvatar={follow.following.img || ''}
            />
          </div>
        )
      )}
    </div>
  )
}

export default FollowersPage
