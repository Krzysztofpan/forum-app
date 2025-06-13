import PostComponent from '@/components/PostComponent'

import { PostWithDetails } from '@/types'

const PostWithRepliesPage = async ({
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
    // obsłuż błąd (np. 404)
    return <p>User nie znaleziony</p>
  }
  const user = await res.json()
  const posts = user.posts
  return (
    <>
      {posts.map((post: PostWithDetails) => (
        <PostComponent key={String(post.id)} post={post} />
      ))}
    </>
  )
}

export default PostWithRepliesPage
