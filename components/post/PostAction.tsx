'use client'
import { toggleLikePost, toggleRepostPost } from '@/lib/actions/post.action'

import { ReactNode, useState } from 'react'

import { BiRepost } from 'react-icons/bi'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { IoStatsChart } from 'react-icons/io5'
import { PiBookmarkSimple } from 'react-icons/pi'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { PenLine } from 'lucide-react'
import Link from 'next/link'

const PostAction = ({
  post,
  userId,
  disabledView,
  specialContent,
}: {
  post: {
    _id: string
    comments: string[]
    reposts: string[]
    hearts: string[]
    view: number
    creator?: string
  }
  userId: string
  disabledView?: boolean
  specialContent?: ReactNode
}) => {
  const [isLiked, setIsLiked] = useState<boolean>(
    post.hearts.find((id) => String(id) === userId) ? true : false
  )
  const [isReposted, setIsReposted] = useState<boolean>(
    post.reposts.find((id) => String(id) === userId) ? true : false
  )

  const initialIsLiked = post.hearts.find((id) => String(id) === userId)
    ? true
    : false
  const initialIsReposted = post.reposts.find((id) => String(id) === userId)
    ? true
    : false

  const handleLikePost = async () => {
    setIsLiked(!isLiked)
    await toggleLikePost(post._id)
  }

  const handleRepost = async () => {
    const creatorId = post.creator?.toString()

    if (String(userId) != creatorId) {
      setIsReposted(!isReposted)
      await toggleRepostPost(post._id)
    }
  }

  return (
    <div className="flex justify-between text-foreground/50 items-end">
      <span className="flex gap-1 items-center">
        <FaRegComment /> {post.comments.length}
      </span>

      <Popover>
        <PopoverTrigger
          className={`flex gap-1 items-center ${
            isReposted ? 'text-green-500' : ''
          }`}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <BiRepost />{' '}
          {post.reposts.length +
            (isReposted
              ? !initialIsReposted
                ? 1
                : 0
              : initialIsReposted
              ? -1
              : 0)}
        </PopoverTrigger>
        <PopoverContent
          className="w-[114px] p-0 bg-background shadow-md shadow-foreground"
          align="end"
          side="bottom"
          sideOffset={-20}
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
              handleRepost()
            }}
            className="px-4 py-3 text-center cursor-pointer grid grid-cols-[auto_auto]  text-base font-semibold items-center hover:bg-foreground/10"
          >
            <BiRepost size={20} /> {isReposted ? 'undo repost' : 'Repost'}
          </div>
          <Link
            href={`/compose/post?repost=${post._id}`}
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="px-4 py-3 text-center cursor-pointer grid grid-cols-[auto_auto]  text-base font-semibold items-center hover:bg-foreground/10"
          >
            <PenLine size={20} /> Quote
          </Link>
        </PopoverContent>
      </Popover>

      <span
        className={`flex gap-1 items-center hover:text-red-400 ${
          isLiked ? 'text-red-500' : ''
        }`}
        onClick={(e) => {
          handleLikePost()
          e.stopPropagation()
        }}
      >
        {isLiked ? <FaHeart /> : <FaRegHeart />}
        {post.hearts.length +
          (isLiked ? (!initialIsLiked ? 1 : 0) : initialIsLiked ? -1 : 0)}
      </span>
      {!disabledView ? (
        <span className="flex gap-1 items-center">
          <IoStatsChart /> {post.view}
        </span>
      ) : null}
      <PiBookmarkSimple size={20} />
      {specialContent}
    </div>
  )
}

export default PostAction
