import { auth } from '@/auth'
import PostComponent from '@/components/PostComponent'
import { prisma } from '@/prisma'

const HashtagDisplay = async ({
  hashtag,
  f,
}: {
  hashtag: string
  f: string
}) => {
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
  const postWithHash = await prisma.hashtag.findFirst({
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
        take: 9,
      },
    },
  })

  if (!postWithHash) return 'No post on this hashtag'
  return (
    <>
      {postWithHash.posts.map((post) => (
        <PostComponent key={post.post.id} post={post.post} />
      ))}
    </>
  )
}

export default HashtagDisplay
