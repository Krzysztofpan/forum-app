import { auth } from '@/auth'
import PostView from '@/components/post/PostView'

import { prisma } from '@/prisma'
import { notFound } from 'next/navigation'

interface PageProps {
  params: Promise<{ postId: string }>
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ postId: string }>
}) {
  const postId = (await params).postId

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${postId}`
  )

  if (!res.ok) {
    return {
      title: 'Post not found | Cube',
      description: 'The requested post does not exist or has been removed.',
    }
  }

  const post = await res.json()

  const description = post.desc
    ? post.desc.length > 150
      ? post.desc.slice(0, 147) + '...'
      : post.desc
    : `Post by ${post.user.displayName} on Cube.`

  // URL do posta
  const postUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${post.user.username}/status/${post.id}`

  // Obraz do podglądu (jeśli post ma obrazek)
  const imageUrl =
    post.media[0]?.url || `${`${process.env.NEXT_PUBLIC_BASE_URL}/logo-sm.png`}`

  return {
    title: `${post.user.displayName} on X: "${
      post.desc ? post.desc.slice(0, 50) : 'Post'
    }" | Cube`,
    description,
    openGraph: {
      title: `${post.user.displayName} on X: "${
        post.desc ? post.desc.slice(0, 50) : 'Post'
      }" | Cube`,
      description,
      url: postUrl,
      type: 'article',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `Image for post by ${post.user.displayName}`,
        },
      ],
      article: {
        publishedTime: post.createdAt,
        authors: [`${post.user.displayName}`],
      },
    },
    twitter: {
      card: 'summary_large_image',
      title: `${post.user.displayName} on X: "${
        post.desc ? post.desc.slice(0, 50) : 'Post'
      }" | Cube`,
      description,
      images: [imageUrl],
      creator: post.user.twitterHandle
        ? `@${post.user.twitterHandle}`
        : undefined,
    },
  }
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
  const post = await prisma.$transaction(async (tx) => {
    await tx.post.update({
      where: { id: Number(postId) },
      data: { view: { increment: 1 } },
    })

    return tx.post.findFirst({
      where: { id: Number(postId) },
      include: {
        ...postIncludeQuery,
        rePost: {
          include: {
            ...postIncludeQuery,
          },
        },
        parentPost: {
          include: {
            ...postIncludeQuery,
          },
        },
        comments: {
          orderBy: { createdAt: 'desc' },
          include: {
            ...postIncludeQuery,
          },
        },
      },
    })
  })

  if (!post) {
    // obsłuż błąd (np. 404)
    return notFound()
  }

  return <PostView post={post} />
}
