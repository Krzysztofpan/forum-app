import InfiniteFeed, { fetchPosts } from '@/components/home/InfiniteFeed'
import PostComponent from '@/components/PostComponent'

import { PostWithDetails } from '@/types'
import { notFound } from 'next/navigation'

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
