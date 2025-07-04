import { auth } from '@/auth'
import { prisma } from '@/prisma'

import { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const page = searchParams.get('cursor')

  const query = searchParams.get('q')

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
    media: {},
  }
  const whereCondition = {
    AND: [{ userId }, { post: { desc: { contains: query || '' } } }],
  }

  const savedPosts = await prisma.savedPosts.findMany({
    where: whereCondition,
    include: { post: { include: { ...postIncludeQuery } } },
    orderBy: { createdAt: 'desc' },
    take: 3,
    skip: (Number(page) - 1) * LIMIT,
  })

  const totalPosts = await prisma.savedPosts.count({ where: whereCondition })

  const hasMore = Number(page) * LIMIT < totalPosts
  const posts = savedPosts.map((savedPosts) => savedPosts.post)
  return Response.json({ posts, hasMore })
}
