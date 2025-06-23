'use client'
import { likePost, rePost } from '@/lib/actions/post.action'

import { useOptimistic, useState, useTransition } from 'react'

import { BiRepost } from 'react-icons/bi'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { IoStatsChart } from 'react-icons/io5'
import { PiBookmarkSimple } from 'react-icons/pi'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { PenLine } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useModalOpen } from '@/context/ModalContext'

const PostAction = ({
  postId,
  count,
  isLiked,
  isRePosted,
  isSaved,
  view,
}: {
  username: string
  postId: number
  count: { rePosts: number; likes: number; comments: number }
  isLiked: boolean
  isRePosted: boolean
  isSaved: boolean
  view: number
}) => {
  const [state, setState] = useState({
    likes: count.likes,
    isLiked: isLiked,
    rePosts: count.rePosts,
    isRePosted,
    isSaved,
  })

  const router = useRouter()
  const [pending, startTransition] = useTransition()
  const likeAction = () => {
    startTransition(async () => {
      addOptimisticCount('like')
      const res = await likePost(postId)
      if (res?.success) {
        setState({
          ...state,
          likes: state.isLiked ? state.likes - 1 : state.likes + 1,
          isLiked: !state.isLiked,
        })
      }
    })
  }

  const rePostAction = () => {
    startTransition(async () => {
      addOptimisticCount('rePost')
      await rePost(postId)
      setState((prev) => {
        return {
          ...prev,
          rePosts: prev.isRePosted ? prev.rePosts - 1 : prev.rePosts + 1,
          isRePosted: !prev.isRePosted,
        }
      })
    })
  }

  const [optimisticCount, addOptimisticCount] = useOptimistic(
    state,
    (prev, type: 'like' | 'rePost' | 'save') => {
      if (type === 'like') {
        return {
          ...prev,
          likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
          isLiked: !prev.isLiked,
        }
      }
      if (type === 'rePost') {
        return {
          ...prev,
          rePosts: prev.isRePosted ? prev.rePosts - 1 : prev.rePosts + 1,
          isRePosted: !prev.isRePosted,
        }
      }
      if (type === 'save') {
        return {
          ...prev,
          isSaved: !prev.isSaved,
        }
      }

      return prev
    }
  )

  return (
    <div className="flex justify-between text-foreground/50 items-center">
      <Link
        className="flex items-center cursor-pointer hover:text-blue-500 group"
        scroll={false}
        href={`/compose/post?parentId=${postId}`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        <span className="group-hover:bg-blue-500/30 rounded-full  p-2">
          <FaRegComment />
        </span>{' '}
        {count.comments}
      </Link>

      <Popover>
        <PopoverTrigger
          className={`flex gap-1 items-center ${
            optimisticCount.isRePosted ? 'text-green-500' : ''
          }`}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <BiRepost /> {optimisticCount.rePosts}
        </PopoverTrigger>
        <PopoverContent
          className="w-[114px] p-0 bg-background shadow-md shadow-foreground z-[10000]"
          align="end"
          side="bottom"
          sideOffset={-20}
        >
          <div
            onClick={(e) => {
              e.stopPropagation()
              rePostAction()
            }}
            className="px-4 py-3 text-center cursor-pointer grid grid-cols-[auto_auto]  text-base font-semibold items-center hover:bg-foreground/10"
          >
            <BiRepost size={20} /> {isRePosted ? 'undo repost' : 'Repost'}
          </div>
          <Link
            href={`/compose/post?repost=${postId}`}
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
          optimisticCount.isLiked ? 'text-red-500' : ''
        }`}
        onClick={(e) => {
          likeAction()
          e.stopPropagation()
        }}
      >
        {optimisticCount.isLiked ? <FaHeart /> : <FaRegHeart />}
        {optimisticCount.likes}
      </span>

      <span className="flex gap-1 items-center">
        <IoStatsChart /> {view}
      </span>

      <PiBookmarkSimple size={20} />
      {/*   {specialContent} */}
    </div>
  )
}

export default PostAction
