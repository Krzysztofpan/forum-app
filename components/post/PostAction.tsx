'use client'
import { likePost, rePost, savePost } from '@/lib/actions/post.action'
import { useOptimistic, useTransition } from 'react'
import { BiRepost } from 'react-icons/bi'
import { FaHeart, FaRegComment, FaRegHeart } from 'react-icons/fa6'
import { IoBookmarkSharp, IoStatsChart } from 'react-icons/io5'
import { PiBookmarkSimple } from 'react-icons/pi'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { PenLine } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type PostActionProps = {
  username: string
  postId: number
  count: { rePosts: number; likes: number; comments: number }
  isLiked: boolean
  isRePosted: boolean
  isSaved: boolean
  view: number
}

const PostAction = ({
  postId,
  count,
  isLiked,
  isRePosted,
  isSaved,
  view,
}: PostActionProps) => {
  const router = useRouter()
  const [pending, startTransition] = useTransition()

  // Stan zarządzany tylko przez useOptimistic
  const [optimisticCount, addOptimisticCount] = useOptimistic(
    {
      likes: count.likes,
      isLiked,
      rePosts: count.rePosts,
      isRePosted,
      isSaved,
    },
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

  const likeAction = () => {
    startTransition(async () => {
      addOptimisticCount('like')
      await likePost(postId)
      // Nie wywołuj setState!
    })
  }

  const rePostAction = () => {
    startTransition(async () => {
      addOptimisticCount('rePost')
      await rePost(postId)
      // Nie wywołuj setState!
    })
  }

  const savePostAction = () => {
    startTransition(async () => {
      addOptimisticCount('save')
      const res = await savePost(postId)
      if (res?.success) {
        toast(res.message, {
          position: 'bottom-center',
          style: { backgroundColor: 'rgb(8, 104, 187)', color: 'white' },
        })
      }
    })
  }

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
        <span className="group-hover:bg-blue-500/30 rounded-full p-2">
          <FaRegComment />
        </span>
        {count.comments}
      </Link>

      <Popover>
        <PopoverTrigger
          className={`flex group items-center cursor-pointer hover:text-green-500 ${
            optimisticCount.isRePosted ? 'text-green-500' : ''
          }`}
          onClick={(e) => {
            e.stopPropagation()
          }}
        >
          <span className="p-2 group-hover:bg-green-500/20 rounded-full">
            <BiRepost />
          </span>
          {optimisticCount.rePosts}
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
            className="px-4 py-3 text-center cursor-pointer grid grid-cols-[auto_auto] text-base font-semibold items-center hover:bg-foreground/10"
          >
            <BiRepost size={20} />{' '}
            {optimisticCount.isRePosted ? 'undo repost' : 'Repost'}
          </div>
          <Link
            href={`/compose/post?repost=${postId}`}
            onClick={(e) => {
              e.stopPropagation()
            }}
            className="px-4 py-3 text-center cursor-pointer grid grid-cols-[auto_auto] text-base font-semibold items-center hover:bg-foreground/10"
          >
            <PenLine size={20} /> Quote
          </Link>
        </PopoverContent>
      </Popover>

      <span
        className={`group flex items-center cursor-pointer hover:text-red-400 ${
          optimisticCount.isLiked ? 'text-red-500' : ''
        }`}
        onClick={(e) => {
          likeAction()
          e.stopPropagation()
        }}
      >
        <span className="group-hover:bg-red-500/30 rounded-full p-2">
          {optimisticCount.isLiked ? <FaHeart /> : <FaRegHeart />}
        </span>
        {optimisticCount.likes}
      </span>

      <span className="flex gap-1 items-center">
        <IoStatsChart /> {view}
      </span>

      <span
        onClick={(e) => {
          savePostAction()
          e.stopPropagation()
        }}
        className="rounded-full hover:bg-blue-400/50 p-1"
      >
        {optimisticCount.isSaved ? (
          <IoBookmarkSharp size={20} className="text-blue-500" />
        ) : (
          <PiBookmarkSimple size={20} />
        )}
      </span>
    </div>
  )
}

export default PostAction
