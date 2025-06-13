import DataNotFoundInformation from '@/components/DataNotFoundFoundInformation'
import UserView from '@/components/user/UserView'

import { prisma } from '@/prisma'

const FollowingPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>
}) => {
  const userId = (await params).userId
  const user = await prisma.user.findUnique({
    where: { username: userId },
    include: {
      followings: {
        include: {
          follower: { select: { displayName: true, username: true, id: true } },
        },
      },
    },
  })
  if (!user) return

  if (!user.followings.length) {
    return (
      <DataNotFoundInformation
        header={`@${user.username} isn't following anyone`}
        info="Once they follow accounts, they'll show up here."
      />
    )
  }

  return (
    <div>
      {user.followings.map(
        (follow: {
          follower: { username: string; displayName: string; id: string }
        }) => (
          <div className="p-4" key={follow.follower.id}>
            <UserView
              username={follow.follower.username}
              userDisplayName={follow.follower.displayName}
            />
          </div>
        )
      )}
    </div>
  )
}

export default FollowingPage
