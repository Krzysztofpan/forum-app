import { auth } from '@/auth'
import { prisma } from '@/prisma'

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const userProfileId = searchParams.get('user')
  const page = searchParams.get('cursor')
  const r = searchParams.get('r')
  const LIMIT = 3
  const session = await auth()

  if (!session || !session.user) return
  const userId = session.user.id
  const whereCondition =
    userProfileId !== 'undefined' && userProfileId !== null
      ? { parentPostId: r ? undefined : null, userId: userProfileId }
      : {
          parentPostId: null,
        }

  const postIncludeQuery = {
    user: {
      select: { displayName: true, username: true, img: true },
    },
    _count: { select: { likes: true, rePosts: true, comments: true } },
    likes: { where: { userId: userId }, select: { id: true } },
    rePosts: { where: { userId: userId }, select: { id: true } },
    saves: { where: { userId: userId }, select: { id: true } },
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
    orderBy: { createdAt: 'desc' },
  })

  const totalPosts = await prisma.post.count({ where: whereCondition })

  const hasMore = Number(page) * LIMIT < totalPosts

  return Response.json({ posts, hasMore })
}
