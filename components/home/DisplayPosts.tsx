'use client'
import { useState } from 'react'
import { Button } from '../ui/button'

const DisplayPosts = () => {
  const [displayPosts, setDisplayPosts] = useState<'For you' | 'Following'>(
    'For you'
  )
  return (
    <div className="flex border-b-[1px] border-b-solid sticky top-0 bg-background/70 backdrop-blur-lg z-50 mx-[1px]">
      <Button
        className={`w-1/2 py-7 text-md relative cursor-pointer ${
          displayPosts === 'For you'
            ? 'after:w-14 after:h-1 after:bg-blue-400 after:rounded-full after:absolute after:bottom-0'
            : ''
        }`}
        onClick={() => setDisplayPosts('For you')}
        variant="ghost"
      >
        For you
      </Button>
      <Button
        className={`w-1/2 py-7 text-md relative cursor-pointer ${
          displayPosts === 'Following'
            ? 'after:w-14 after:h-1 after:bg-blue-400 after:rounded-full after:absolute after:bottom-0'
            : ''
        }`}
        variant="ghost"
        onClick={() => setDisplayPosts('Following')}
      >
        Following
      </Button>
    </div>
  )
}

export default DisplayPosts
