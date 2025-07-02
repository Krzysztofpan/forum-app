import { auth } from '@/auth'
import { prisma } from '@/prisma'

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const page = searchParams.get('cursor')
  const f = searchParams.get('f')
  const query = searchParams.get('q')
  const pf = searchParams.get('pf')
  if (!query) return
  const LIMIT = 3
  const session = await auth()

  if (!session || !session.user) return
  const userId = session.user.id

  const postIncludeQuery = {
    user: {
      select: { displayName: true, username: true, img: true },
    },
    _count: { select: { likes: true, rePosts: true, comments: true } },
    likes: { where: { userId: userId }, select: { id: true } },
    rePosts: { where: { userId: userId }, select: { id: true } },
    saves: { where: { userId: userId }, select: { id: true } },
  }

  const whereCondition = {
    AND: [
      {
        OR: [
          { user: { username: { contains: query } } },
          { desc: { contains: query } },
        ],
      },
      { parentPostId: null },
      pf ? { user: { followers: { some: { followingId: userId } } } } : {},
    ],
  }

  const posts = await prisma.post.findMany({
    where: whereCondition,
    take: LIMIT,
    skip: (Number(page) - 1) * LIMIT,
    include: {
      rePost: {
        include: {
          ...postIncludeQuery,
          media: {},
        },
      },

      ...postIncludeQuery,
      media: {},
    },
    orderBy:
      f === 'live'
        ? {
            createdAt: 'desc',
          }
        : {},
  })

  const totalPosts = await prisma.post.count({ where: whereCondition })

  const hasMore = Number(page) * LIMIT < totalPosts

  return Response.json({ posts, hasMore })
}
