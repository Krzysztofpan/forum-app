import { auth } from '@/auth'
import InfiniteFeed, { fetchPosts } from '@/components/home/InfiniteFeed'
import PostComponent from '@/components/PostComponent'
import { getRootPostWithDistance } from '@/lib/actions/post.action'

import { PostWithDetails } from '@/types'

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
