'use server'

import { prisma } from '@/prisma'

export const fetchHashtagsWithQuery = async (query: string) => {
  const hashtags = await prisma.hashtag.findMany({
    where: {
      name: {
        contains: query,
        mode: 'insensitive',
      },
    },
    take: 3,
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
  })

  return hashtags
}
