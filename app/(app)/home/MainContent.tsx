import PostComponent from '@/components/PostComponent'
import { auth } from '@/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/prisma'

const MainContent = async () => {
  const session = await auth()

  if (!session || !session.user) {
    return redirect('/auth/login')
  }
  /* const posts = await Post.find({ type: { $in: ['post', 'quote'] } })
    .populate({
      path: 'comments',
      populate: {
        path: 'comments',
      },
    })
    .sort({ createdAt: -1 })
    .populate('creator')
    .populate({
      path: 'quotePost',
      populate: ['creator', 'comments'],
    })
    .limit(10) */
  const userId = session.user.id
  const whereCondition = {
    parentPostId: null,
    rePostId: null,
    /*  userId: {
      in: [
        userId,
        ...(
          await prisma.follow.findMany({
            where: { followerId: userId },
            select: { followingId: true },
          })
        ).map((follow) => follow.followingId),
      ],
    }, */
  }

  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, img: true } },
    _count: { select: { likes: true, rePosts: true, comments: true } },
    likes: { where: { userId: userId }, select: { id: true } },
    rePosts: { where: { userId: userId }, select: { id: true } },
    saves: { where: { userId: userId }, select: { id: true } },
    media: { where: {} },
  }

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      rePost: {
        include: postIncludeQuery,
      },
      parentPost: {
        include: {
          ...postIncludeQuery,
        },
      },
      ...postIncludeQuery,
    },

    take: 9,
    skip: 0,
    orderBy: { createdAt: 'desc' },
  })

  return (
    <div>
      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </div>
  )
}

export default MainContent
