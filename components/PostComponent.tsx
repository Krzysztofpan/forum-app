import PostContainer from './home/PostContainer'
import { FaUserCircle } from 'react-icons/fa'

import { Dot, Ellipsis, Upload } from 'lucide-react'
import MediaPost from './home/MediaPost'

import LinkWithoutPropagation from './LinkWithoutPropagation'
import PostAction from './post/PostAction'

import Image from 'next/image'
import { formatPostTime } from '@/lib/utils/customPostDate'

import { BiRepost } from 'react-icons/bi'
import { PostWithDetails } from '@/types'
import RepostedPost from './post/RepostedPost'

import HashtagHighlighter from './HashtagHighlighter'

const PostComponent = ({ post }: { post: PostWithDetails }) => {
  const timeAgo = formatPostTime(post.createdAt)

  const originalPost = !post.desc ? post.rePost || post : post

  return (
    <PostContainer
      href={`/${originalPost.user.username}/status/${originalPost.id}`}
    >
      {post.rePostId && !post.desc && (
        <span className="col-span-3 flex text-foreground/50 items-center gap-1 ml-6 ">
          <BiRepost size={20} />{' '}
          <span className="font-semibold text-sm">
            {post.user.displayName} reposted
          </span>
        </span>
      )}
      <div>
        <LinkWithoutPropagation
          href={`/${originalPost.user.username}`}
          className=""
        >
          {post.user.img ? (
            <Image
              src={originalPost.user.img || '/logo-sm.png'}
              alt={`${originalPost.user.username} avatar`}
              width={40}
              height={40}
              className="rounded-full aspect-square"
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
              href={`/${originalPost.user.username}`}
              className="font-bold text-foreground hover:underline  truncate"
            >
              {originalPost.user.username}
            </LinkWithoutPropagation>
            <LinkWithoutPropagation
              href={`/${originalPost.user.username}`}
              className=""
            >
              <span className="truncate">@{originalPost.user.username}</span>
            </LinkWithoutPropagation>
            <Dot className="inline" size={12} />
            <span>{timeAgo}</span>
          </div>
          <div className="text-foreground/50">
            <Ellipsis size={18} />
          </div>
        </div>
        <div className="space-y-2 ">
          <HashtagHighlighter text={originalPost.desc as string} />

          {originalPost.media && <MediaPost media={originalPost.media} />}
        </div>
        {post.rePostId && post.rePost ? (
          <RepostedPost media={post.media} repostPost={post.rePost} />
        ) : null}
      </div>

      <div className="col-start-2">
        <PostAction
          username={originalPost.user.username}
          view={originalPost.view}
          postId={originalPost.id}
          count={originalPost._count}
          isLiked={!!originalPost.likes.length}
          isRePosted={!!originalPost.rePosts.length}
          isSaved={!!originalPost.saves.length}
        />
      </div>
      <div className="flex justify-center items-center text-foreground/50">
        <Upload size={18} />
      </div>
    </PostContainer>
  )
}

export default PostComponent
