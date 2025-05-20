'use client'
import { ReactNode } from 'react'
import { Dialog } from './ui/dialog'
import { useRouter } from 'next/navigation'

const Modal = ({ children }: { children: ReactNode }) => {
  const router = useRouter()

  return (
    <Dialog defaultOpen onOpenChange={() => router.back()}>
      {children}
    </Dialog>
  )
}

export default Modal
