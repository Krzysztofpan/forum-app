'use client'
import 'next-cloudinary/dist/cld-video-player.css'
import { CldImage, CldVideoPlayer } from 'next-cloudinary'
import Image from 'next/image'
import Link from 'next/link'

const MediaPost = ({
  media,
  username,
  postId,
}: {
  media: {
    url: string
    height: number
    width: number
    public_id: string | null
    type: string | null
  }[]
  username?: string
  postId?: number
}) => {
  return (
    <div
      className={`rounded-lg overflow-hidden ${
        media.length > 1 ? 'grid grid-cols-2 gap-[2px] ' : ' '
      }`}
    >
      {media.map(
        (
          mediaObj: {
            url: string
            height: number
            width: number
            public_id: string | null
          },
          i: number
        ) => {
          if (
            mediaObj.url.includes('res.cloudinary.com') &&
            mediaObj.url.includes('/image')
          ) {
            return (
              <Link
                scroll={false}
                href={`/${username}/status/${postId}/photos?photoId=${i + 1}`}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                className={`block relative  ${
                  media.length > 3
                    ? 'aspect-[1.78]'
                    : media.length > 2 && media.length < 4
                    ? i == 0
                      ? 'row-span-2'
                      : 'aspect-[1.78]'
                    : media.length > 1
                    ? `aspect-[0.88] `
                    : `max-h-[510px]`
                }`}
                style={
                  media.length < 2
                    ? {
                        aspectRatio: mediaObj.width / mediaObj.height,
                      }
                    : {}
                }
                key={mediaObj.url}
              >
                <CldImage
                  src={mediaObj.url}
                  alt={mediaObj.url}
                  fill
                  className={`${
                    media.length > 2
                      ? `${i > 0 ? 'object-cover' : 'h-full'}`
                      : media.length > 1
                      ? 'object-cover    w-full '
                      : '  rounded-lg'
                  } ${
                    mediaObj.width >= mediaObj.height
                      ? 'w-full'
                      : `${media.length > 1 ? 'object-cover w-full  ' : ''}`
                  } `}
                />
              </Link>
            )
          } else if (mediaObj.url.includes('media.tenor.com')) {
            return (
              <Link
                scroll={false}
                href={`/${username}/status/${postId}/photos?photoId=${i + 1}`}
                key={mediaObj.url}
                className="block object-contain"
              >
                <Image
                  src={mediaObj.url}
                  id={mediaObj.url}
                  alt={mediaObj.url}
                  width={mediaObj.width}
                  height={mediaObj.height}
                  className={` aspect-[${mediaObj.width}/${
                    mediaObj.height
                  }] w-fit max-h-[510px] rounded-lg ${
                    mediaObj.width >= mediaObj.height ? 'w-full' : 'h-[510px]'
                  }`}
                />
              </Link>
            )
          } else {
            return (
              <div
                className="  relative max-h-[510px]
              "
                key={mediaObj.url}
                style={{
                  aspectRatio: `${mediaObj.width}/${mediaObj.height}`,
                }}
                onClick={(e) => {
                  e.stopPropagation()
                }}
              >
                <CldVideoPlayer
                  src={mediaObj.url}
                  id={mediaObj.public_id || mediaObj.url}
                  className="h-full object-cover"
                  height={mediaObj.height}
                  width={mediaObj.width}
                  /*  transformation={{
                  crop: 'fill',
                  gravity: 'auto',
                  width: mediaObj.width,
                  height: mediaObj.height,
                }} */
                />
              </div>
            )
          }
        }
      )}
    </div>
  )
}

export default MediaPost
