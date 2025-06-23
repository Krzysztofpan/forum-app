import { Dot } from 'lucide-react'

import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import PostAction from './PostAction'

import { auth } from '@/auth'
import AddPostComponent from '../home/AddPostComponent'
import PostComponent from '../PostComponent'

import UserView from '../user/UserView'

import MediaPost from '../home/MediaPost'
/* import Image from 'next/image' */

import { PostWithDetails } from '@/types'

import HashtagHighlighter from '../HashtagHighlighter'

import PostScrollWrapper from './PostScrollWrapper'
import ScrollByHeight from './ScrollByHeight'
import { getParentPosts } from '@/lib/actions/post.action'
import Link from 'next/link'
import Image from 'next/image'

const PostView = async ({
  post,
  withoutMedia = false,
  classes,
}: {
  post: PostWithDetails
  withoutMedia?: boolean
  classes?: string
}) => {
  const session = await auth()
  if (!session || !session.user) return

  const userId = String(session?.user.id)

  const parentPosts = await getParentPosts(post, userId)

  const formattedDate = format(post.createdAt, 'MMMM dd yyyy', {
    locale: enUS,
  })
  const hour = format(post.createdAt, 'HH:mm', {
    locale: enUS,
  })

  return (
    <>
      <div
        className={`max-w-[600px] w-full min-h-[100vh]   ${
          parentPosts ? 'mt-3' : ''
        }`}
      >
        <PostScrollWrapper comments={parentPosts} />
        <div className="mx-5 space-y-4">
          <UserView
            username={post.user.username}
            userDisplayName={post.user.displayName || post.user.username}
            isFollowed={true}
            userId={userId}
            userAvatar={post.user.img || '/logo-sm.png'}
          />
          {/*  <p className="my-4 text-lg">{post.desc}</p> */}
          <HashtagHighlighter text={post.desc as string} />
          {post.media[0] && !withoutMedia ? (
            post.media.length > 1 ? (
              <MediaPost
                media={post.media}
                postId={post.id}
                username={post.user.username}
              />
            ) : post.media[0].type === 'image' ||
              post.media[0].type === 'gif' ? (
              <Link
                href={`/${post.user.username}/status/${post.id}/photos?photoId=1`}
                className="w-full relative  rounded-lg overflow-hidden block"
                style={{
                  aspectRatio: post.media[0].width / post.media[0].height,
                }}
              >
                <Image
                  src={post.media[0].url}
                  alt={`image-${post.media[0]?.public_id}`}
                  fill
                />
              </Link>
            ) : (
              <MediaPost
                media={post.media}
                postId={post.id}
                username={post.user.username}
              />
            )
          ) : null}
          {/*  {post.rePost ? (
          <RepostedPost media={post.media} repostPost={post.rePost} />
        ) : null} */}
          <div></div>
          <div className="flex text-foreground/50 gap-0">
            {hour} <Dot className="p-0 m-0" /> {formattedDate} <Dot />{' '}
            <span className="text-foreground font-bold">{post.view} </span>{' '}
            Views
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
            avatar={post.user.img || '/logo-sm.png'}
          />
        </div>

        <div>
          {post.comments.map((post) => (
            <PostComponent key={String(post.id)} post={post} />
          ))}
        </div>
      </div>
      <ScrollByHeight containerId="post-scroll-wrapper" />
    </>
  )
}

export default PostView
