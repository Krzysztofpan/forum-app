import { auth } from '@/auth'
import PostView from '@/components/post/PostView'

import { prisma } from '@/prisma'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ postId: string }>
}
export default async function PostPage({ params }: PageProps) {
  const postId = (await params).postId
  const session = await auth()

  if (!session || !session.user) return

  const userId = session.user.id
  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, img: true } },
    _count: { select: { likes: true, rePosts: true, comments: true } },
    likes: { where: { userId: userId }, select: { id: true } },
    rePosts: { where: { userId: userId }, select: { id: true } },
    saves: { where: { userId: userId }, select: { id: true } },
    media: { where: {} },
  }
  const post = await prisma.post.findFirst({
    where: { id: Number(postId) },
    include: {
      ...postIncludeQuery,
      rePost: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, rePosts: true, comments: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
          media: {
            select: {
              id: true,
              width: true,
              height: true,
              url: true,
              public_id: true,
              type: true,
              userId: true,
              postId: true,
            },
          },
        },
      },
      parentPost: {
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, rePosts: true, comments: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
          media: {
            select: {
              id: true,
              width: true,
              height: true,
              url: true,
              public_id: true,
              type: true,
              userId: true,
              postId: true,
            },
          },
        },
      },

      comments: {
        orderBy: { createdAt: 'desc' },
        include: {
          user: { select: { displayName: true, username: true, img: true } },
          _count: { select: { likes: true, rePosts: true, comments: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
          media: {
            select: {
              id: true,
              width: true,
              height: true,
              url: true,
              public_id: true,
              type: true,
              userId: true,
              postId: true,
            },
          },
        },
      },
    },
  })

  if (!post) {
    // obsłuż błąd (np. 404)
    return notFound()
  }

  return <PostView post={post} />
}
