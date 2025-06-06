'use client'

import Modal from '@/components/Modal'
import {
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog'
import { useModalOpen } from '@/context/ModalContext'

import { useIsMobile } from '@/hooks/use-mobile'

import GifPicker, { TenorImage, Theme } from 'gif-picker-react'
import { X } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const GifModal = () => {
  const router = useRouter()
  const isMobile = useIsMobile()
  const { setIsOpen } = useModalOpen()
  const handleGifSelect = (gif: TenorImage) => {
    const obj = {
      url: gif.url,
      type: 'gif',
      height: gif.height,
      width: gif.width,
    }

    localStorage.setItem('selectedGif', JSON.stringify(obj))
    router.back()
  }

  useEffect(() => {
    setIsOpen(true)

    return () => setIsOpen(false)
  }, [])

  return (
    <Modal>
      <DialogOverlay className="p-0! m-0!" />
      <DialogContent
        className={`bg-transparent border-none z-[100] max-w-screen  ${
          isMobile ? 'm-0! p-0! pt-15!  gap-0 rounded-none' : ''
        }`}
      >
        <DialogTitle></DialogTitle>
        <GifPicker
          width={!isMobile ? 500 : '100vw'}
          height={!isMobile ? 600 : '100vh'}
          tenorApiKey={'AIzaSyCTFpvsQur0uCv8Ra9GvvgnElOIVAgbteY'}
          theme={Theme.DARK}
          onGifClick={handleGifSelect}
          autoFocusSearch
        />
        <X
          className="absolute top-8 right-1 text-foreground/50"
          onClick={() => router.back()}
        />
      </DialogContent>
    </Modal>
  )
}

export default GifModal
