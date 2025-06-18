import { auth } from '@/auth'
import { prisma } from '@/prisma'
import { NextRequest } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ hashtag: string }> }
) {
  const hashtag = (await params).hashtag

  const searchParams = request.nextUrl.searchParams

  const page = searchParams.get('cursor')
  const f = searchParams.get('f')
  const LIMIT = 3
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

  const HashtagPosts = await prisma.hashtag.findFirst({
    where: { name: `#${hashtag}` },
    include: {
      posts: {
        orderBy:
          f === 'live'
            ? {
                post: {
                  createdAt: 'desc',
                },
              }
            : {},
        include: {
          post: {
            include: {
              rePost: {
                include: { ...postIncludeQuery },
              },

              ...postIncludeQuery,
            },
          },
        },
        skip: (Number(page) - 1) * LIMIT,
        take: LIMIT,
      },
    },
  })

  const totalPages = await prisma.hashtag.findFirst({
    where: { name: `#${hashtag}` },
    include: {
      _count: { select: { posts: true } },
    },
  })

  if (!totalPages) return

  const posts = HashtagPosts?.posts.map((post) => post.post)
  console.log(Number(page) * LIMIT, totalPages?._count.posts)

  const hasMore = Number(page) * LIMIT < totalPages?._count.posts
  console.log(posts)

  return Response.json({ posts, hasMore })
}
