import PostComponent from '@/components/PostComponent'
import UserLayout from './Userlayout'
import { PostType } from '@/models/Post'
import { notFound } from 'next/navigation'

const UserPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>
}) => {
  const userId = (await params).userId
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
    {
      // fetch na serwerze w Next.js domyślnie jest bez cache,
      // ale możesz dodać np. revalidate jeśli chcesz ISR
      cache: 'no-store',
    }
  )

  if (!res.ok) {
    // obsłuż błąd (np. 404)
    return notFound()
  }
  const user = await res.json()
  const posts = user.posts.filter((post: PostType) => post.type === 'post')
  return (
    <UserLayout user={user}>
      {posts.map((post: PostType) => (
        <PostComponent key={String(post._id)} post={post} user={user} />
      ))}
    </UserLayout>
  )
}

export default UserPage
