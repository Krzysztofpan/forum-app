'use client'

import { FileType } from '@/components/home/AddPostComponent'
import { blobToDataURL } from '@/lib/blobToUrl'
import {
  ChangeEvent,
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from 'react'

type ContextType = {
  media: FileType[]
  setMedia: Dispatch<SetStateAction<FileType[] | []>>
  handleAddMedia: (file: FileType) => void
  handleMediaChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleDeleteMedia: (id: number) => void
  dimensions: { width: number; height: number } | null
  setDimensions: Dispatch<
    SetStateAction<{ width: number; height: number } | null>
  >
  content: string
  setContent: Dispatch<SetStateAction<string>>
  isPoll: boolean
  setIsPoll: Dispatch<SetStateAction<boolean>>
  firstInput: string
  setFirstInput: Dispatch<SetStateAction<string>>
  secondInput: string
  setSecondInput: Dispatch<SetStateAction<string>>
}

const AddPostContext = createContext<ContextType | undefined>(undefined)

export function AddPostContextProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<string>('')
  const [media, setMedia] = useState<FileType[] | []>([])
  const [dimensions, setDimensions] = useState<{
    width: number
    height: number
  } | null>({ width: 0, height: 0 })
  const [isPoll, setIsPoll] = useState(false)
  const [firstInput, setFirstInput] = useState('')
  const [secondInput, setSecondInput] = useState('')
  const handleMediaChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const files: FileList = event.target.files as FileList

    if (files.length + media.length > 4) {
      return
    }

    const mediaPromises = Array.from(files).map(async (file) => {
      console.log(file)
      const dataURL = await blobToDataURL(file)
      return { url: URL.createObjectURL(file), type: file.type, dataURL }
    })

    const mediaArray = (await Promise.all(mediaPromises)) as FileType[]

    setMedia((prevMedia) => [...prevMedia, ...mediaArray])
  }

  function handleAddMedia(file: FileType) {
    setMedia([...media, file])
  }

  const handleDeleteMedia = (id: number) => {
    const newMedia = media.filter((_, index) => index !== id)
    setMedia(newMedia)
  }
  return (
    <AddPostContext.Provider
      value={{
        media,
        setMedia,
        handleAddMedia,
        handleMediaChange,
        handleDeleteMedia,
        dimensions,
        setDimensions,
        content,
        setContent,
        isPoll,
        setIsPoll,
        firstInput,
        setFirstInput,
        secondInput,
        setSecondInput,
      }}
    >
      {children}
    </AddPostContext.Provider>
  )
}

export function useAddPostContext() {
  const context = useContext(AddPostContext)

  if (!context) {
    throw new Error('Using context outside Provider')
  }

  return context
}
