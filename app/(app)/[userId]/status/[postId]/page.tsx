import PostView from '@/components/post/PostView'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ postId: string }>
}
export default async function PostPage({ params }: PageProps) {
  const postId = (await params).postId
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`,
    {}
  )

  if (!res.ok) {
    // obsłuż błąd (np. 404)
    return notFound()
  }

  const post = await res.json()

  return <PostView post={post} />
}
