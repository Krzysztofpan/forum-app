import { auth } from '@/auth'
import { prisma } from '@/prisma'

import { NextResponse } from 'next/server'

// func auth only work here in this way

export const GET = auth(
  async (
    { auth },

    { params }: { params: Promise<{ postId: number }> }
  ) => {
    const { postId } = await params

    const userId = auth?.user.id

    if (userId) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const postIdNumber = Number(postId)
    if (isNaN(postIdNumber) || postIdNumber <= 0) {
      return NextResponse.json({ message: 'Invalid postId' }, { status: 400 })
    }

    const postIncludeQuery = {
      user: { select: { displayName: true, username: true, img: true } },
      _count: { select: { likes: true, rePosts: true, comments: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
      saves: { where: { userId: userId }, select: { id: true } },
    }

    try {
      const post = await prisma.post.findUnique({
        where: { id: postIdNumber },
        include: {
          rePost: {
            include: postIncludeQuery,
          },
          ...postIncludeQuery,
          media: {},
          user: {},
        },
      })

      if (!post) {
        return NextResponse.json({ message: 'Post not found' }, { status: 404 })
      }

      return NextResponse.json({ ...post }, { status: 200 })
    } catch (error) {
      console.error(error)
      return NextResponse.json({ message: 'Server error' }, { status: 500 })
    }
  }
)
