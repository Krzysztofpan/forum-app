import { auth } from '@/auth'
import CloudinaryPlayerContainer from '@/components/CloudinaryPlayerContainer'
import InfiniteFeed, { fetchWithSearch } from '@/components/home/InfiniteFeed'
import PostComponent from '@/components/PostComponent'
import UserView from '@/components/user/UserView'
import { prisma } from '@/prisma'
import { CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'

import Link from 'next/link'

const SearchView = async ({
  searchParams,
}: {
  searchParams: { q: string; f?: string; pf?: string }
}) => {
  const session = await auth()

  if (!session || !session.user) return

  const userId = session.user.id

  const query = searchParams.q
  const f = searchParams.f
  const pf = searchParams.pf
  const users = await prisma.user.findMany({
    where: {
      AND: [
        { username: { contains: query } },
        pf ? { followers: { some: { followingId: userId } } } : {},
      ],
    },

    select: {
      img: true,
      username: true,
      displayName: true,
      id: true,
      _count: { select: { followers: { where: { followingId: userId } } } },
    },
    take: 3,
  })
  // if f equals to media this component only want to display images
  if (f === 'media') {
    const media = await prisma.media.findMany({
      where: {
        post: {
          AND: [
            {
              OR: [
                { user: { username: { contains: query } } },
                { desc: { contains: query } },
              ],
            },
            { parentPostId: null },
          ],
        },
      },
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

  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, img: true } },
    _count: { select: { likes: true, rePosts: true, comments: true } },
    likes: { where: { userId: userId }, select: { id: true } },
    rePosts: { where: { userId: userId }, select: { id: true } },
    saves: { where: { userId: userId }, select: { id: true } },
    media: { where: {} },
  }

  const posts = await prisma.post.findMany({
    where: {
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
    },

    include: {
      rePost: {
        include: postIncludeQuery,
      },

      ...postIncludeQuery,
    },
    orderBy:
      f === 'live'
        ? {
            createdAt: 'desc',
          }
        : {},
    take: 9,
  })

  if (!users) return

  return (
    <div>
      {users.length > 0 && (
        <>
          {' '}
          <h1 className="font-bold text-2xl p-3 pb-0">People</h1>
          <div className="mt-3 ">
            {users.map((user) => (
              <Link
                key={user.id}
                href={`/${user.username}`}
                className="block hover:bg-foreground/5 py-3 px-3"
              >
                <UserView
                  key={user.id}
                  userDisplayName={user.displayName}
                  username={user.displayName}
                  userAvatar={user?.img || ''}
                  userId={user.id}
                  isFollowed={!!user._count.followers}
                />
              </Link>
            ))}
            <Link
              className="px-3 py-4 text-blue-400 cursor-pointer hover:bg-foreground/5 block border-b-[1px] border-border"
              href={'/home'}
            >
              View all
            </Link>
          </div>
        </>
      )}

      {posts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
      <InfiniteFeed
        fetchFnc={fetchWithSearch}
        params={[query, f ? f : '', pf ? pf : '']}
      />
    </div>
  )
}

export default SearchView
