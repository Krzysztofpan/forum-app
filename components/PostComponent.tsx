import { PostType } from '@/models/Post'
import PostContainer from './home/PostContainer'
import { FaUserCircle } from 'react-icons/fa'

import { Dot, Ellipsis, Upload } from 'lucide-react'
import MediaPost from './home/MediaPost'

import { userType } from '@/models/User'
import LinkWithoutPropagation from './LinkWithoutPropagation'
import PostAction from './post/PostAction'
import { serializePost } from '@/lib/utils/utlisFncs'
import { auth } from '@/auth'
import Image from 'next/image'
import { formatPostTime } from '@/lib/utils/customPostDate'
import RepostedPost from './post/RepostedPost'

const PostComponent = async ({
  post,
  user,
}: {
  post: PostType
  user: userType
}) => {
  const timeAgo = formatPostTime(post.createdAt)
  const session = await auth()
  if (!session || !session.user) {
    return
  }
  const userId = session?.user.id
  const serializedPost = serializePost(post)

  return (
    <PostContainer href={`/${post.creator.userAt}/status/${post._id}`}>
      <div>
        <LinkWithoutPropagation href={`/${user.userAt}`} className="">
          {user.avatar ? (
            <Image
              src={user.avatar}
              alt={`${user.userAt} avatar`}
              width={40}
              height={40}
              className="rounded-full"
            />
          ) : (
            <FaUserCircle size={40} />
          )}
        </LinkWithoutPropagation>
      </div>

      <div className="col-span-2">
        <div className="flex justify-between items-center">
          <div className="space-x-1 text-foreground/50">
            <LinkWithoutPropagation
              href={`/${user.userAt}`}
              className="font-bold text-foreground hover:underline"
            >
              {user.username}
            </LinkWithoutPropagation>
            <LinkWithoutPropagation href={`/${user.userAt}`} className="">
              <span className="">@{user.userAt}</span>
            </LinkWithoutPropagation>
            <Dot className="inline" size={12} />
            <span>{timeAgo}</span>
          </div>
          <div className="text-foreground/50">
            <Ellipsis size={18} />
          </div>
        </div>
        <div className="space-y-2 ">
          <div>{post.content}</div>
          {post.media && <MediaPost media={post.media} />}
        </div>
        {post.type === 'quote' ? (
          <RepostedPost media={post.media} repostPost={post.quotePost} />
        ) : null}
      </div>

      <div className="col-start-2">
        <PostAction
          post={{
            _id: serializedPost._id,
            comments: serializedPost.comments,
            hearts: serializedPost.hearts,
            reposts: serializedPost.reposts,
            view: serializedPost.view,
          }}
          userId={userId}
        />
      </div>
      <div className="flex justify-center items-center text-foreground/50">
        <Upload size={18} />
      </div>
    </PostContainer>
  )
}

export default PostComponent
