import { PostType } from '@/models/Post'
import StickyTopComponent from '../StickyTopComponent'

import { Dot, Upload } from 'lucide-react'

import { enUS } from 'date-fns/locale'
import { format } from 'date-fns'
import PostAction from './PostAction'
import { serializePost } from '@/lib/utils/utlisFncs'
import { auth } from '@/auth'
import AddPostComponent from '../home/AddPostComponent'
import PostComponent from '../PostComponent'
import BackComponent from '../BackComponent'
import UserView from '../user/UserView'
import User from '@/models/User'
import MediaPost from '../home/MediaPost'
import Image from 'next/image'
import RepostedPost from './RepostedPost'

const PostView = async ({ post }: { post: PostType }) => {
  const session = await auth()
  if (!session || !session.user) return
  const user = await User.findById(session.user.id)
  const userId = String(session?.user.id)
  const formattedDate = format(post.createdAt, 'MMMM dd yyyy', {
    locale: enUS,
  })
  const hour = format(post.createdAt, 'HH:mm', {
    locale: enUS,
  })

  const serializedPost = serializePost(post)

  const isFollowed = user.following.some(
    (id: string) => String(id) == String(post.creator._id)
  )

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
          userAt={post.creator.userAt}
          username={post.creator.username}
          isFollowed={isFollowed}
          userId={userId}
          userAvatar={post.creator.avatar}
        />
        <p className="my-4 text-lg">{post.content}</p>

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
                alt={`image-${post.media[0].public_id}`}
                fill
              />
            </div>
          )
        ) : null}
        {post.type === 'quote' && post.quotePost ? (
          <RepostedPost media={post.media} repostPost={post.quotePost} />
        ) : null}
        <div></div>
        <div className="flex text-foreground/50 gap-0">
          {hour} <Dot className="p-0 m-0" /> {formattedDate} <Dot />{' '}
          <span className="text-foreground font-bold">{post.view} </span> Views
        </div>
        <div className="border-y-[1px] border-border p-3  ">
          <PostAction
            post={{
              _id: serializedPost._id,
              comments: serializedPost.comments,
              hearts: serializedPost.hearts,
              reposts: serializedPost.reposts,
              view: serializedPost.view,
              creator: String(post.creator._id),
            }}
            userId={userId}
            disabledView={true}
            specialContent={<Upload size={20} />}
          />
        </div>
      </div>
      <div className="border-b-[1px] border-border">
        <AddPostComponent type="comment" placeholder="Post your reply" />
      </div>
      <div>
        {post.comments.map((post) => (
          <PostComponent
            key={String(post._id)}
            post={post}
            user={post.creator}
          />
        ))}
      </div>
    </div>
  )
}

export default PostView
