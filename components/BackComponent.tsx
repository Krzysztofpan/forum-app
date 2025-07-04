'use client'

import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { Button } from './ui/button'
import { ArrowLeft } from 'lucide-react'

const BackComponent = ({ children }: { children: ReactNode }) => {
  const router = useRouter()
  return (
    <div className="grid grid-cols-[60px_1fr] py-1 mx-2 items-center">
      <div className="flex items-center justify-start">
        <Button
          onClick={() => router.back()}
          variant="ghost"
          className="rounded-full"
        >
          <ArrowLeft size={30} className="scale-130" />
        </Button>
      </div>

      {children}
    </div>
  )
}

export default BackComponent
