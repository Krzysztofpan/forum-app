'use client'

import { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { Button } from './ui/button'
import { MdOutlineAddAPhoto } from 'react-icons/md'
import { X } from 'lucide-react'

const Comp = ({
  id,
  aspect,
  setAspect,
  setIsCrop,
  setMedia,
  setEdit,
  edit,
  croppedImageUrl,
  setCroppedImageUrl,
  setCroppedImageDataURL,
}: {
  id: string
  aspect: number
  setIsCrop: Dispatch<SetStateAction<boolean>>
  setMedia: Dispatch<
    SetStateAction<{
      url: string
      type: string
      dataURL: string
      width: number
      height: number
    }>
  >
  croppedImageUrl?: string | null
  setCroppedImageUrl?: Dispatch<SetStateAction<string | null>>
  setAspect: Dispatch<SetStateAction<number>>
  setEdit: Dispatch<SetStateAction<'banner' | 'avatar'>>
  edit: 'banner' | 'avatar'
  setCroppedImageDataURL?: Dispatch<SetStateAction<string | null>>
}) => {
  return (
    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex gap-4 ">
      <Button
        variant="outline"
        className="rounded-full cursor-pointer z-10 aspect-square bg-background/30! hover:bg-background/20! border! h-auto"
        asChild
      >
        <label htmlFor={id} className="cursor-pointer  ">
          <MdOutlineAddAPhoto className="scale-120 cursor-pointer " />

          <input
            type="file"
            id={id}
            accept="image/*"
            className="hidden"
            onChange={async (event: ChangeEvent<HTMLInputElement>) => {
              const files: FileList = event.target.files as FileList

              const img = new Image()
              img.onload = () => {
                const maxWidth = 550
                const maxHeight = 500
                let width, height

                if (img.width > img.height) {
                  height = maxHeight
                  if (aspect === 1) {
                    width = (img.width / img.height) * maxHeight
                  } else {
                    width = (img.width / img.height) * maxHeight
                  }
                } else if (img.width === img.height) {
                  if (aspect === 1) {
                    width = 500
                    height = 500
                  } else {
                    width = 550
                    height = 550
                  }
                } else {
                  // Obraz wyższy lub kwadratowy - szerokość 600, wysokość proporcjonalna
                  width = maxWidth
                  if (aspect === 1) {
                    height = (img.height / img.width) * maxHeight
                  } else {
                    height = (img.height / img.width) * maxWidth
                  }
                }

                setMedia((c) => ({ ...c, width, height }))
              }

              img.src = URL.createObjectURL(files[0])

              setMedia({
                url: img.src,
                height: 0,
                width: 0,
                dataURL: '',
                type: '',
              })
              setEdit(edit)
              setAspect(aspect)
              setIsCrop(true)
            }}
          />
        </label>
      </Button>
      {croppedImageUrl && setCroppedImageUrl && setCroppedImageDataURL && (
        <Button
          variant="outline"
          className="rounded-full cursor-pointer z-10 aspect-square h-auto bg-background/30! hover:bg-background/20! border!"
          onClick={() => {
            setCroppedImageDataURL(null)
            setCroppedImageUrl(null)
          }}
        >
          <X className="scale-120 " />
        </Button>
      )}
    </div>
  )
}

export default Comp
