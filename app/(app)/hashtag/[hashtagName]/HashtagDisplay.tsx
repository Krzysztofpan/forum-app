import { auth } from '@/auth'
import CloudinaryPlayerContainer from '@/components/CloudinaryPlayerContainer'
import InfiniteFeed, { fetchHashtagPosts } from '@/components/home/InfiniteFeed'
import PostComponent from '@/components/PostComponent'
import { prisma } from '@/prisma'
import Image from 'next/image'

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
  // if f equals to media this component only want to display images
  if (f === 'media') {
    const media = await prisma.media.findMany({
      where: { post: { hashtags: { some: { tag: { name: `#${hashtag}` } } } } },
    })

    return (
      <div className="grid grid-cols-3 gap-1 m-1">
        {media.map((mediaObj) => {
          if (mediaObj.type === 'video') {
            return (
              <div className="relative aspect-square" key={mediaObj.id}>
                <CloudinaryPlayerContainer url={mediaObj.url} />
              </div>
            )
          }

          return (
            <div className="relative aspect-square" key={mediaObj.id}>
              <Image src={mediaObj.url} alt={mediaObj.url} fill />
            </div>
          )
        })}
      </div>
    )
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
            : {
                post: {
                  view: 'desc',
                },
              },
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
      <InfiniteFeed
        initialPage={4}
        fetchFnc={fetchHashtagPosts}
        params={[hashtag, f]}
      />
    </>
  )
}

export default HashtagDisplay
