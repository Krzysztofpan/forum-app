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
    title: `People following ${user?.displayName} (@${user.username}) | Cube`,
    description: `See who follows @${username} on YourAppName. Connect with followers and grow your community!`,
    openGraph: {
      title: `People following ${user?.displayName} (@${user.username}) | Cube`,
      description: `Discover all the people who follow @${username} on Cube.`,
      url: `https://${process.env.NEXT_PUBLIC_BASE_URL}/user/${username}/followers`,
      images: [
        {
          url: process.env.LOGO_URL,
          width: 630,
          height: 630,
          alt: 'Followers preview',
        },
      ],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `Followers of @${username} | Cube`,
      description: `Check out everyone who follows @${username} on Cube.`,
      images: [process.env.LOGO_URL],
    },
    alternates: {
      canonical: `https://${process.env.NEXT_PUBLIC_BASE_URL}/${user.username}/followers`,
    },

    // Meta tag robots – pozwala na indeksowanie i śledzenie linków
    robots: {
      index: true,
      follow: true,
    },
  }
}
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
          <Link
            href={`/${follow.following.username}`}
            className="block p-4 hover:bg-foreground/5 cursor-pointer"
            key={follow.following.id}
          >
            <UserView
              username={follow.following.username}
              userDisplayName={follow.following.displayName}
              userAvatar={follow.following.img || ''}
            />
          </Link>
        )
      )}
    </div>
  )
}

export default FollowersPage
