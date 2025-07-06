'use server'
import { prisma } from '@/prisma'

type CreateNotificationParams = {
  userId: string
  actorId?: string
  postId?: number
  type: 'POST_LIKED' | 'COMMENT_ADDED' | 'POST_REPOSTED' | 'NEW_FOLLOWER'
}

export async function createNotification({
  userId,
  actorId,
  postId,
  type,
}: CreateNotificationParams) {
  return prisma.notification.create({
    data: {
      userId,
      actorId,
      postId,
      type,
    },
  })
}
export async function getUserNotifications(userId: string) {
  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, img: true } },
    _count: { select: { likes: true, rePosts: true, comments: true } },
    likes: { where: { userId: userId }, select: { id: true } },
    rePosts: { where: { userId: userId }, select: { id: true } },
    saves: { where: { userId: userId }, select: { id: true } },
    media: { where: {} },
  }
  return prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' },
    include: {
      actor: {
        select: { id: true, username: true, displayName: true, img: true },
      },

      user: {},
      post: {
        include: {
          ...postIncludeQuery,
        },
      },
    },
  })
}
