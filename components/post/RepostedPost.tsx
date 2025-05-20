import { PostType } from '@/models/Post'
import { Card, CardContent } from '../ui/card'
import Image from 'next/image'
import { formatPostTime } from '@/lib/utils/customPostDate'
import { Dot } from 'lucide-react'
import MediaPost from '../home/MediaPost'
import { FileType } from '../home/AddPostComponent'

const RepostedPost = ({
  repostPost,
  media,
}: {
  repostPost: PostType
  media: (
    | FileType
    | { width: number; height: number; url: string; public_id: string }
  )[]
}) => {
  return (
    <Card className="py-0 px-0 mr-4 my-1">
      <CardContent className=" flex flex-col gap-1 m-0 p-0 ">
        {media.length < 1 ? (
          <>
            <div className="flex gap-2 mt-3 mx-3">
              <Image
                className="rounded-full"
                src={repostPost.creator.avatar || './logo.png'}
                alt={`${repostPost.createdAt} avatar`}
                width={24}
                height={24}
              />
              <span className="font-semibold">
                {repostPost.creator.username}
              </span>
              <span className="text-foreground/50">
                @{repostPost.creator.userAt}
              </span>
              <span className="flex items-center justify-center">
                <Dot className="p-0 m-0" size={12} />
              </span>
              <span className="text-foreground/50">
                {formatPostTime(repostPost.createdAt)}
              </span>
            </div>
            <div>
              <p className="mx-3  mb-3">{repostPost.content}</p>
              {repostPost.media.length > 1 ? (
                <MediaPost media={repostPost.media} />
              ) : null}
            </div>
          </>
        ) : (
          <div className="space-y-1 mb-3">
            <div className="flex gap-2 mt-3 mx-3">
              <Image
                className="rounded-full"
                src={repostPost.creator.avatar || './logo.png'}
                alt={`${repostPost.createdAt} avatar`}
                width={24}
                height={24}
              />
              <span className="font-semibold">
                {repostPost.creator.username}
              </span>
              <span className="text-foreground/50">
                @{repostPost.creator.userAt}
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
              {repostPost.media.length > 1 ? (
                <div className="mb-4">
                  <MediaPost media={repostPost.media} />
                </div>
              ) : null}

              <div>
                <p>{repostPost.content}</p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default RepostedPost
