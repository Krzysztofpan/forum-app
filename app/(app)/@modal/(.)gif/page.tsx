'use client'
import Modal from '@/components/Modal'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'

import GifPicker, { TenorImage, Theme } from 'gif-picker-react'
import { useRouter } from 'next/navigation'

const GifModal = () => {
  const router = useRouter()
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

  return (
    <Modal>
      <DialogContent className="bg-transparent border-none">
        <DialogTitle></DialogTitle>
        <GifPicker
          tenorApiKey={'AIzaSyCTFpvsQur0uCv8Ra9GvvgnElOIVAgbteY'}
          width={500}
          height={600}
          theme={Theme.DARK}
          onGifClick={handleGifSelect}
          autoFocusSearch
        />
      </DialogContent>
    </Modal>
  )
}

export default GifModal
