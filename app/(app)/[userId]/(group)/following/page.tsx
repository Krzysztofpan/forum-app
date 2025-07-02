import DataNotFoundInformation from '@/components/DataNotFoundFoundInformation'
import UserView from '@/components/user/UserView'

import { prisma } from '@/prisma'
import Link from 'next/link'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const username = (await params).userId
  const user = await prisma.user.findFirst({ where: { username: username } })

  if (!user) {
    return {
      title: 'User not found',
    }
  }

  return {
    title: `People followed by ${user?.displayName} (@${user.username}) | Cube`,
    description: `See who @${username} is following on Cube. Connect with their network and grow your community!`,
    openGraph: {
      title: `People followed by ${user?.displayName} (@${user.username}) | Cube`,
      description: `Discover all the users that @${username} follows on Cube.`,
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/${username}/following`,
      images: [
        {
          url: process.env.LOGO_URL,
          width: 630,
          height: 630,
          alt: 'Following preview',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Following by @${username} | Cube`,
      description: `Check out everyone @${username} is following on Cube.`,
      images: [process.env.LOGO_URL],
    },

    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_BASE_URL}/${user.username}/following`,
    },

    // Meta tag robots – pozwala na indeksowanie i śledzenie linków
    robots: {
      index: true,
      follow: true,
    },
  }
}

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
          <Link
            href={`/${follow.follower.username}`}
            className="p-4 hover:bg-foreground/5 cursor-pointer block"
            key={follow.follower.id}
          >
            <UserView
              username={follow.follower.username}
              userDisplayName={follow.follower.displayName}
            />
          </Link>
        )
      )}
    </div>
  )
}

export default FollowingPage
