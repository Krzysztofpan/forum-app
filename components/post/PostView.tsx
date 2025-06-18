import StickyTopComponent from '../StickyTopComponent'

import { Dot } from 'lucide-react'

import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import PostAction from './PostAction'

import { auth } from '@/auth'
import AddPostComponent from '../home/AddPostComponent'
import PostComponent from '../PostComponent'
import BackComponent from '../BackComponent'
import UserView from '../user/UserView'

import MediaPost from '../home/MediaPost'
import Image from 'next/image'

import { Post } from '@/types'
import { prisma } from '@/prisma'
import HashtagHighlighter from '../HashtagHighlighter'

const PostView = async ({ post }: { post: Post }) => {
  const session = await auth()
  if (!session || !session.user) return

  /*   const user = await User.findById(session.user.id) */
  const userId = String(session?.user.id)
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  })

  if (!user) return
  const formattedDate = format(post.createdAt, 'MMMM dd yyyy', {
    locale: enUS,
  })
  const hour = format(post.createdAt, 'HH:mm', {
    locale: enUS,
  })

  return (
    <div className="border-x-[1px] border-solid max-w-[600px] w-full min-h-[100vh]">
      <StickyTopComponent className=" font-bold text-lg ">
        <BackComponent>
          <div className="flex items-center py-4">
            <p className="font-bold text-xl items-center">Post</p>
          </div>
        </BackComponent>
      </StickyTopComponent>

      <div className="mx-5 space-y-4">
        <UserView
          username={post.user.username}
          userDisplayName={post.user.displayName || post.user.username}
          isFollowed={!!user.followings.length}
          userId={userId}
          userAvatar={post.user.img || '/logo-sm.png'}
        />
        {/*  <p className="my-4 text-lg">{post.desc}</p> */}
        <HashtagHighlighter text={post.desc as string} />
        {post.media[0] ? (
          post.media.length > 1 ? (
            <MediaPost media={post.media} />
          ) : (
            <div
              className="w-full relative h rounded-lg overflow-hidden"
              style={{
                aspectRatio: post.media[0].width / post.media[0].height,
              }}
            >
              <Image
                src={post.media[0].url}
                alt={`image-${post.media[0]?.public_id}`}
                fill
              />
            </div>
          )
        ) : null}
        {/*  {post.rePost ? (
          <RepostedPost media={post.media} repostPost={post.rePost} />
        ) : null} */}
        <div></div>
        <div className="flex text-foreground/50 gap-0">
          {hour} <Dot className="p-0 m-0" /> {formattedDate} <Dot />{' '}
          <span className="text-foreground font-bold">{post.view} </span> Views
        </div>
        <div className="border-y-[1px] border-border p-3  ">
          <PostAction
            username={post.user.username}
            view={post.view}
            postId={post.id}
            count={post._count}
            isLiked={!!post.likes.length}
            isRePosted={!!post.rePosts.length}
            isSaved={!!post.saves.length}
            /*  specialContent={<Upload size={20} />} */
          />
        </div>
      </div>
      <div className="border-b-[1px] border-border">
        <AddPostComponent
          type="comment"
          placeholder="Post your reply"
          parentIdProp={post.id}
          avatar={user.img || '/logo-sm.png'}
        />
      </div>

      <div>
        {post.comments.map((post) => (
          <PostComponent key={String(post.id)} post={post} />
        ))}
      </div>
    </div>
  )
}

export default PostView
