import PostComponent from '@/components/PostComponent'
import UserLayout from '../Userlayout'
import { PostType } from '@/models/Post'

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
    <UserLayout user={user}>
      {posts.map((post: PostType) => (
        <PostComponent key={String(post._id)} post={post} user={user} />
      ))}
    </UserLayout>
  )
}

export default PostWithRepliesPage
