'use client'
import PostAction from '@/components/post/PostAction'
import { useIsMedium } from '@/hooks/use-medium'

import { MediaType, PostWithDetails } from '@/types'

import {
  ArrowLeftIcon,
  ArrowRight,
  ArrowRightCircle,
  ArrowRightIcon,
  ChevronsLeft,
  ChevronsRight,
  X,
} from 'lucide-react'
import Image from 'next/image'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { ReactNode, useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import Spinner from '@/components/Spinner'

const PhotoView = ({
  children,
  post,
  media,

  postMediaCount,
}: {
  children: ReactNode
  post: PostWithDetails
  media: MediaType[]

  postMediaCount: number
}) => {
  const [showLeftBar, setShowLeftBar] = useState<boolean>(true)
  const searchParams = useSearchParams()
  const [photoIdState, setPhotoIdState] = useState(
    Number(searchParams.get('photoId'))
  )

  const router = useRouter()
  const isMedium = useIsMedium()
  const pathname = usePathname()

  useEffect(() => {
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])
  useEffect(() => {
    if (isMedium) {
      setShowLeftBar(false)
    } else {
      setShowLeftBar(true)
    }
  }, [isMedium])

  const updateQuery = (newParam: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('photoId', newParam)

    window.history.replaceState(null, '', `${pathname}?${params.toString()}`)
  }

  /*   if (!selectedMedia) router.replace('/home') */

  const navbarWidth = showLeftBar ? '350px' : '0px'
  return (
    <div
      className={`fixed top-0 grid  z-[1000] bg-neutral-900/90 w-full  h-screen max-h-screen   ${
        showLeftBar ? 'md:grid-cols-[auto_350px]' : ''
      }`}
    >
      <div className="grid grid-rows-[1fr_50px] items-center justify-center relative    h-screen w-full">
        <div>
          <div
            className={`flex z-[-1] absolute top-0 left-0 transition-all`}
            style={{
              transform:
                photoIdState - 1 > 0
                  ? `translateX(calc((${
                      photoIdState - 1
                    }00vw - (${navbarWidth} * ${photoIdState - 1}))* -1))`
                  : 'none',
            }}
          >
            {media.map((mediaObj, i) => {
              return (
                <div
                  className={`h-[calc(100vh-50px)]  flex justify-center items-center`}
                  style={{
                    width: `calc(100vw - ${navbarWidth})`,
                  }}
                  key={i}
                >
                  <Image
                    key={i}
                    src={mediaObj.url}
                    alt="Selected media"
                    className={`object-contain max-h-[calc(100vh-50px)]  transition-all z-[-1] `}
                    width={mediaObj.width}
                    height={mediaObj.height}
                  />
                </div>
              )
            })}
          </div>
        </div>
        <div className=" xs:w-[500px]  mx-auto">
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
        <div className="rounded-full bg-background p-2 absolute top-4 left-4 cursor-pointer">
          <X onClick={() => router.back()} />
        </div>
        <div className="rounded-full bg-background p-2 absolute top-4 right-4 cursor-pointer hidden md:block">
          {showLeftBar ? (
            <ChevronsRight onClick={() => setShowLeftBar(false)} />
          ) : (
            <ChevronsLeft onClick={() => setShowLeftBar(true)} />
          )}
        </div>
        {/* PREV PHOTO LINK */}
        {photoIdState > 1 && (
          <div
            className="absolute left-4 rounded-full bg-background p-2 top-1/2 transition-y-[-50%]"
            onClick={() => {
              updateQuery(String(photoIdState - 1))
              setPhotoIdState((prev) => prev - 1)
            }}
          >
            <ArrowLeftIcon />
          </div>
        )}

        {/* NEXT PHOTO LINK */}
        {photoIdState < postMediaCount && (
          <div
            onClick={() => {
              updateQuery(String(photoIdState + 1))
              setPhotoIdState((prev) => prev + 1)
            }}
            className="absolute right-4 rounded-full bg-background p-2 top-1/2 transition-y-[-50%]"
          >
            <ArrowRightIcon />
          </div>
        )}
      </div>
      {showLeftBar && (
        <div
          className={`hidden  bg-background border-l-[1px] border-border md:flex overflow-auto h-screen`}
        >
          {children}
        </div>
      )}
    </div>
  )
}

export default PhotoView
