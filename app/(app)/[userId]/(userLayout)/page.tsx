import InfiniteFeed, { fetchPosts } from '@/components/home/InfiniteFeed'
import PostComponent from '@/components/PostComponent'

import { PostWithDetails } from '@/types'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ userId: string }>
}) {
  const userId = (await params).userId
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`
  )

  if (!res.ok) {
    return {
      title: 'User not found | Cube',
      description: 'The requested user profile does not exist.',
    }
  }

  const user = await res.json()

  return {
    title: `${user.displayName} (@${user.username}) / Cube`,
    description:
      user.bio ||
      `Profile of ${user.displayName} on Cube. Connect and explore their content.`,
    openGraph: {
      title: `${user.displayName} (@${user.username}) / Cube`,
      description: user.bio || `Profile of ${user.displayName} on Cube.`,
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/user/${user.username}`,
      type: 'profile',
      profile: {
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        username: user.username,
        gender: user.gender || undefined,
      },
      images: [
        {
          url: user.img || `${process.env.DEFAULT_AVATAR}`,
          width: 400,
          height: 400,
          alt: `${user.displayName}'s avatar`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${user.displayName} (@${user.username}) / Cube`,
      description: user.bio || `Profile of ${user.displayName} on Cube.`,
      images: [user.img || `${process.env.DEFAULT_AVATAR}`],
      creator: user.twitterHandle ? `@${user.twitterHandle}` : undefined,
    },
  }
}

const UserPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>
}) => {
  const userId = (await params).userId
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
    {}
  )

  if (!res.ok) {
    return notFound()
  }
  const user = await res.json()

  return (
    <>
      {user.posts.map((post: PostWithDetails) => (
        <PostComponent key={String(post.id)} post={post} />
      ))}
      <InfiniteFeed fetchFnc={fetchPosts} params={[`${user.id}`]} />
    </>
  )
}

export default UserPage
