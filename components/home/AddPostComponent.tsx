'use client'
import { CgProfile } from 'react-icons/cg'
import { Textarea } from '../ui/textarea'
import { Image as ImageEmoji, Smile } from 'lucide-react'
import { MdOutlineGifBox } from 'react-icons/md'

import { Button } from '../ui/button'
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from 'emoji-picker-react'
import { useAddPostContext } from '@/context/AddPostContext'
import MediaContainer from './MediaContainer'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import ButtonWithTooltip from '../ButtonWithTooltip'

import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import PollComponent from './PollComponent'
import CircularProgressBar from '../CircularProgressBar'
import { addPost } from '@/lib/actions/post.action'
import { useEffect, useTransition } from 'react'
import Spinner from '../Spinner'

import RepostedPost from '../post/RepostedPost'
import Image from 'next/image'

import { PostWithDetails } from '@/types'
import { toast } from 'sonner'
import UserView from '../user/UserView'
import Link from 'next/link'

export type FileType = {
  url: string
  type: string
  dataURL: string
}

export type GifType = {
  url: string
  type: 'gif'
  width: number
  height: number
}
const AddPostComponent = ({
  placeholder,
  type,
  className,
  repostPost,
  avatar,
  parentPost,
  parentIdProp,
}: {
  placeholder?: string
  type: 'post' | 'comment' | 'quote'
  className?: string
  repostPost?: PostWithDetails
  avatar?: string
  parentIdProp?: number
  parentPost?: PostWithDetails
}) => {
  const {
    media,
    handleMediaChange,
    setContent,
    content,
    isPoll,
    setIsPoll,
    firstInput,
    secondInput,
    setMedia,
    setFirstInput,
    setSecondInput,
    setDimensions,
    handleAddMedia: addMedia,
  } = useAddPostContext()
  const router = useRouter()
  const [pending, startTransition] = useTransition()
  function handleClickEmoji(emoji: EmojiClickData) {
    setContent(content + emoji.emoji)
  }

  const searchParams = useSearchParams()
  const pathname = usePathname()
  useEffect(() => {
    const gifData = localStorage.getItem('selectedGif')
    if (gifData) {
      addMedia(JSON.parse(gifData))
      localStorage.removeItem('selectedGif')
    }
  }, [addMedia])
  async function handleSubmit(formData: FormData) {
    startTransition(async () => {})
    if (!isPoll) {
      setIsPoll(false)
      setMedia([])
      setContent('')
      setFirstInput('')
      setSecondInput('')
      setDimensions({ width: 0, height: 0 })
      const repost = searchParams.get('repost')
      const parentId = parentIdProp || searchParams.get('parentId')
      const res = await addPost(
        formData,
        type,
        media,
        parentId || undefined,
        repost || undefined
      )

      if (res.success) {
        toast(res.message, {
          position: 'bottom-center',
        })
      } else {
        toast(res.message, {
          position: 'bottom-center',
          style: { color: 'red' },
        })
      }

      if (
        type === 'quote' ||
        (type === 'comment' && pathname.includes('/compose/post'))
      ) {
        return router.back()
      }
    }
  }

  return (
    <form
      className={`grid grid-cols-[40px_1fr] mx-2 mt-1 gap-2 ${className}`}
      action={handleSubmit}
    >
      {parentPost && (
        <>
          <div className="col-span-2">
            <UserView
              userDisplayName={
                parentPost.user.displayName || parentPost.user.username
              }
              username={parentPost.user.username}
              userAvatar={parentPost.user.img || '/logo.png'}
              vertical
            />
          </div>
          <div className="flex items-center justify-center col-span-1">
            <div className="h-full w-[2px] bg-gray-500"></div>
          </div>
          <div>
            <p className="">{parentPost.desc}</p>
            <div className="text-foreground/50 py-3 ">
              Replying to{' '}
              <Link
                href={`/${parentPost.user.username}`}
                className="text-blue-400 cursor-pointer"
              >
                @{parentPost.user.username}
              </Link>
            </div>
          </div>
        </>
      )}
      <div className="mt-2 row-span-4">
        <Image
          className="w-full rounded-full aspect-square"
          src={avatar || '/logo.png'}
          alt="user avatar"
          width={40}
          height={40}
        />
      </div>
      <div className="mr-4">
        <Textarea
          name="content"
          className="resize-none bg-transparent placeholder:text-xl  px-0 py-3 m-0  text-xl break-words text-wrap w-[0px] min-w-full"
          placeholder={
            placeholder
              ? placeholder
              : !isPoll
              ? `What's happening?`
              : 'Ask a question'
          }
          value={content}
          onChange={(e) => setContent(e.target.value)}
          maxLength={280}
        />
        {isPoll && <PollComponent />}
      </div>
      {media.length > 0 && <MediaContainer />}
      {repostPost && (
        <RepostedPost
          media={media}
          repostPost={repostPost}
          className="h-[290px]"
        />
      )}
      {type === 'post' ? <hr className="mr-4" /> : null}
      <div className="flex justify-between mr-4 mt-1">
        <div className="flex">
          <ButtonWithTooltip
            trigger={
              <Button
                variant="ghost"
                className="px-3 "
                type="button"
                disabled={isPoll || media.length === 4}
                asChild
              >
                <label
                  htmlFor={
                    type === 'quote' ? 'file-upload-quote' : 'file-upload'
                  }
                  className="cursor-pointer"
                >
                  <ImageEmoji className="text-blue-400  scale-120  cursor-pointer" />

                  <input
                    type="file"
                    id={type === 'quote' ? 'file-upload-quote' : 'file-upload'}
                    accept="image/*,video/*"
                    className="hidden"
                    onChange={handleMediaChange}
                    multiple
                    disabled={media.length >= 4}
                  />
                </label>
              </Button>
            }
          >
            Media
          </ButtonWithTooltip>
          <ButtonWithTooltip
            trigger={
              <Button
                type="button"
                variant="ghost"
                className="m-0 p-0 rounded-full  "
                disabled={isPoll || media.length === 4}
                onClick={() => router.push('/gif')}
              >
                <MdOutlineGifBox className="text-blue-400  scale-120" />
              </Button>
            }
          >
            GIF
          </ButtonWithTooltip>

          <Popover modal>
            <PopoverTrigger>
              <ButtonWithTooltip
                trigger={
                  <div className="m-0 p-0 rounded-full  ">
                    <Smile className="text-blue-400 scale-120" size={17} />
                  </div>
                }
              >
                Emoji
              </ButtonWithTooltip>
            </PopoverTrigger>
            <PopoverContent className="relative border-none bg-transparent">
              <EmojiPicker
                theme={Theme.DARK}
                emojiStyle={EmojiStyle.TWITTER}
                className="text-[10px] "
                width={300}
                height={400}
                onEmojiClick={handleClickEmoji}
                autoFocusSearch
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex gap-2">
          {content.length > 0 && (
            <CircularProgressBar
              percentage={
                content.length <= 280 ? content.length / 2.8 : 280 / 2.8
              }
            />
          )}
          <Button
            type="submit"
            className="rounded-full px-5 font-bold text-base cursor-pointer"
            disabled={
              isPoll
                ? !firstInput || !secondInput || !content || pending
                : !content || pending
            }
          >
            {pending ? <Spinner /> : type === 'post' ? 'Post' : 'Reply'}
          </Button>
        </div>
      </div>
    </form>
  )
}

export default AddPostComponent
