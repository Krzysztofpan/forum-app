import { auth } from '@/auth'
import InfiniteFeed, { fetchPosts } from '@/components/home/InfiniteFeed'
import PostComponent from '@/components/PostComponent'
import { getRootPostWithDistance } from '@/lib/actions/post.action'

import { PostWithDetails } from '@/types'
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
    title: `Post with replies by ${user.displayName} (@${user.username}) / Cube`,
    description:
      user.bio ||
      `Profile of ${user.displayName} on Cube. Connect and explore their content and replies.`,
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
const PostWithRepliesPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>
}) => {
  const userId = (await params).userId
  const session = await auth()

  if (!session || !session.user) return
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}?r='y'`,
    {}
  )

  if (!res.ok) {
    // obsłuż błąd (np. 404)
    return <p>User nie znaleziony</p>
  }
  const user = await res.json()
  let posts = user.posts

  return (
    <>
      {posts.map(async (post: PostWithDetails, i: number) => {
        if (post.parentPost?.parentPostId) {
          const rootPost = (await getRootPostWithDistance(
            post.parentPost,
            session.user.id
          )) as { post: PostWithDetails; distance: number }

          return (
            <PostComponent
              withParent
              key={String(post.id)}
              post={post}
              rootPostWithDistance={rootPost}
            />
          )
        }

        return <PostComponent withParent key={String(post.id)} post={post} />
      })}
      <InfiniteFeed fetchFnc={fetchPosts} params={[`${user.id}`, 'y']} />
    </>
  )
}

export default PostWithRepliesPage
