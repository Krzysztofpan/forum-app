import { useAddPostContext } from '@/context/AddPostContext'
import { X } from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { notFound } from 'next/navigation'

const MediaContainer = () => {
  const { media, dimensions, setDimensions, handleDeleteMedia } =
    useAddPostContext()

  if (!dimensions) return notFound()

  return (
    <div className={`grid h-full   mr-4 gap-3 w-full`}>
      {media.length === 1 ? (
        <div>
          {media.map(({ type, url }, i) => (
            <div key={url} className={`  relative mr-4`}>
              {type.includes('image') || type.includes('gif') ? (
                <img
                  src={url}
                  className={`object-center w-full max-h-[700px] rounded-xl object-cover  ${
                    media.length > 1
                      ? 'aspect-[5/6]'
                      : `${
                          dimensions.width / dimensions.height < 3 / 4
                            ? 'aspect-[3/4]'
                            : null
                        }`
                  } `}
                  alt="image"
                  onLoad={(e) => {
                    const img = e.target as HTMLInputElement
                    setDimensions({
                      width: img.width as number,
                      height: img.height as number,
                    })
                  }}
                />
              ) : (
                <video
                  src={url}
                  controls
                  className={`className="object-contain object-center  w-full rounded-xl ${
                    media.length > 1
                      ? 'aspect-[5/6]'
                      : `  ${
                          dimensions.width / dimensions.height < 3 / 4
                            ? 'aspect-[3/4]'
                            : null
                        }`
                  }`}
                  onLoadedMetadata={(e) => {
                    const video = e.target as HTMLVideoElement

                    setDimensions({
                      width: video.videoWidth,
                      height: video.videoHeight,
                    })
                  }}
                />
              )}
              <X
                className="absolute top-1 right-1 p-1 bg-background/40 rounded-full cursor-pointer hover:bg-background/30"
                onClick={() => handleDeleteMedia(i)}
                size={30}
              />
            </div>
          ))}
        </div>
      ) : (
        <Carousel
          opts={{
            align: 'start',
          }}
          className="w-full pr-4"
        >
          <CarouselContent>
            {media.map(({ type, url }, i) => (
              <CarouselItem key={url} className={`basis-1/2  relative`}>
                {type.includes('image') || type.includes('gif') ? (
                  <img
                    src={url}
                    className={`object-center w-full max-h-[700px] rounded-xl object-cover  ${
                      media.length > 1
                        ? 'aspect-[5/6]'
                        : `${
                            dimensions.width / dimensions.height < 3 / 4
                              ? 'aspect-[3/4]'
                              : null
                          }`
                    } `}
                    alt="image"
                    onLoad={(e) => {
                      const img = e.target as HTMLInputElement
                      setDimensions({
                        width: img.width as number,
                        height: img.height as number,
                      })
                    }}
                  />
                ) : (
                  <video
                    src={url}
                    controls
                    className={`className="object-contain object-center  w-full rounded-xl ${
                      media.length > 1
                        ? 'aspect-[5/6]'
                        : `  ${
                            dimensions.width / dimensions.height < 3 / 4
                              ? 'aspect-[3/4]'
                              : null
                          }`
                    }`}
                    onLoadedMetadata={(e) => {
                      const video = e.target as HTMLVideoElement

                      setDimensions({
                        width: video.videoWidth,
                        height: video.videoHeight,
                      })
                    }}
                  />
                )}
                <X
                  className="absolute top-1 right-1 p-1 bg-background/40 rounded-full cursor-pointer hover:bg-background/30"
                  onClick={() => handleDeleteMedia(i)}
                  size={30}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            variant="secondary"
            className="absolute top-1/2 left-1 p-1 bg-black/50 rounded-full "
          />
          <CarouselNext
            variant="secondary"
            className="absolute top-1/2 right-4 p-1 bg-background/50 rounded-full"
          />
        </Carousel>
      )}
    </div>
  )
}

export default MediaContainer
