import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/prisma'

// Obsługa metody GET
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  const searchParams = request.nextUrl.searchParams

  const withReplies = searchParams.get('r')
  try {
    const userId = (await params).userId

    const user = await prisma.user.findUnique({
      where: { username: userId },
      include: {
        _count: { select: { followers: true, followings: true, posts: true } },
        followers: { where: { followerId: userId } },
        followings: { where: { followingId: userId } },
        posts: {
          where: withReplies ? {} : { parentPostId: null },
          include: {
            user: {},
            likes: {},
            rePosts: {},
            saves: {},
            _count: { select: { likes: true, rePosts: true } },
            rePost: {
              include: {
                user: {},
                likes: {},
                rePosts: {},
                saves: {},
                _count: { select: { likes: true, rePosts: true } },
              },
            },
          },

          take: 9,
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error: any) {
    console.log(error)

    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
