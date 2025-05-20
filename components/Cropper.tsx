import React, { useState, useCallback } from 'react'
import Cropper, { Area } from 'react-easy-crop'

interface Media {
  url: string
  type: string
  dataURL: string
  width: number
  height: number
}

interface CropperImgProps {
  imageSrc: string
  onCropComplete: (croppedAreaPixels: Area) => void
  aspect: number
  media: Media
}

const CropperImg: React.FC<CropperImgProps> = ({
  imageSrc,
  onCropComplete,
  aspect,
  media,
}) => {
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const [zoom, setZoom] = useState<number>(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null)

  const handleCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels)
      if (onCropComplete) onCropComplete(croppedAreaPixels)
    },
    [onCropComplete]
  )

  const w = (media.width - 600) / 2
  const h = (media.height - 550) / 2

  return (
    <div className="flex justify-center items-center background-[#0e0d0d] p-0 m-0">
      {media.width > 0 && media.height > 0 ? (
        <div
          style={{
            position: 'relative',
            width: 600,
            height: 550,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width:
                aspect === 1
                  ? media.width > media.height
                    ? media.width
                    : 500
                  : 550,
              height:
                aspect === 1
                  ? media.width > media.height
                    ? 500
                    : media.height
                  : media.height,
              position: 'relative',
              transform:
                aspect === 1
                  ? media.width === media.height
                    ? 'translateX(50px) translateY(25px)'
                    : media.width > media.height
                    ? `translateX(-${w}px)`
                    : `translateY(-${h}px) translateX(50px)`
                  : media.width === media.height
                  ? 'translateX(25px)'
                  : media.height > media.width
                  ? 'translateY(-22.5%) translateX(25px)'
                  : 'translateX(25px)',
            }}
          >
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
              showGrid={false}
              objectFit={
                aspect === 1
                  ? media.height > media.width
                    ? 'horizontal-cover'
                    : undefined
                  : undefined
              }
              cropSize={aspect === 1 ? { width: 500, height: 500 } : undefined}
              style={{
                containerStyle: {
                  backgroundColor: '#0e0d0d',
                },
                mediaStyle: {
                  aspectRatio: media.width / media.height,
                  height:
                    aspect === 1
                      ? media.height > media.width
                        ? media.height
                        : 500
                      : undefined,
                  width:
                    aspect === 1
                      ? media.width > media.height
                        ? media.width
                        : 500
                      : 550,
                  padding: '0',
                  margin: '0',
                },
              }}
            />
          </div>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default CropperImg
