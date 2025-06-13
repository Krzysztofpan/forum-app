import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { formatPostTime } from '@/lib/utils/customPostDate'
import { Dot } from 'lucide-react'
import MediaPost from '../home/MediaPost'
import { FileType } from '../home/AddPostComponent'
import { PostWithDetails } from '@/types'

const RepostedPost = ({
  repostPost,
  media,
  className,
}: {
  repostPost: PostWithDetails
  media: (
    | {
        width: number
        height: number
        url: string
        type: string | null
        public_id: string | null
      }
    | FileType
  )[]
  className?: string
}) => {
  return (
    <Card className={`py-0 px-0 mr-4 my-1 `}>
      <CardContent className=" flex flex-col gap-1 m-0 p-0 ">
        {repostPost.media && repostPost.media?.length > 0 ? (
          <>
            <div className={`flex gap-2 mt-3 mx-3 `}>
              <Image
                className="rounded-full"
                src={repostPost.user.img || '/logo.png'}
                alt={`${repostPost.createdAt} avatar`}
                width={24}
                height={24}
              />
              <span className="font-semibold truncate  ">
                {repostPost.user.displayName}
              </span>
              <span className="text-foreground/50 truncate ">
                @{repostPost.user.username}
              </span>
              <span className="flex items-center justify-center">
                <Dot className="p-0 m-0" size={12} />
              </span>
              <span className="text-foreground/50">
                {formatPostTime(repostPost.createdAt)}
              </span>
            </div>
            <div
              className={`${media.length > 0 ? 'flex flex-row-reverse ' : ''}`}
            >
              <p className="mx-3  mb-3 flex-1">{repostPost.desc}</p>
              <div
                className={`${
                  media.length > 0
                    ? ' m-2 w-[100px] rounded-lg overflow-hidden'
                    : ''
                }`}
              >
                {repostPost.media.length > 1 ? (
                  <MediaPost media={repostPost.media} />
                ) : repostPost.media.length === 1 ? (
                  <div
                    className={`overflow-hidden   w-full rounded-b-sm ${
                      media.length === 0 ? `${className}` : ''
                    }`}
                  >
                    <div
                      className={`relative w-full `}
                      style={{
                        aspectRatio:
                          repostPost.media[0].width /
                          repostPost.media[0].height,
                      }}
                    >
                      <Image
                        src={repostPost.media[0].url}
                        alt={
                          repostPost.media[0].public_id ||
                          repostPost.media[0].url
                        }
                        fill
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </div>
          </>
        ) : (
          <div className="space-y-1 mb-3">
            <div className="flex gap-2 mt-3 mx-3">
              <Image
                src={repostPost.user.img || '/logo-sm.png'}
                alt={`${repostPost.createdAt} avatar`}
                className="rounded-full"
                width={24}
                height={24}
              />
              <span className="font-semibold truncate">
                {repostPost.user.displayName}
              </span>
              <span className="text-foreground/50 truncate">
                @{repostPost.user.username}
              </span>
              <span className="flex items-center justify-center">
                <Dot className="p-0 m-0" size={12} />
              </span>
              <span className="text-foreground/50">
                {formatPostTime(repostPost.createdAt)}
              </span>
            </div>
            <div
              className={`${
                repostPost.media.length > 1
                  ? 'grid grid-cols-[100px_1fr] gap-2 '
                  : 'mx-2'
              }`}
            >
              <div>
                <p>{repostPost.desc}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RepostedPost
