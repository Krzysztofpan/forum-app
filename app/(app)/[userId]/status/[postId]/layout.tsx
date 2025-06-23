import BackComponent from '@/components/BackComponent'
import StickyTopComponent from '@/components/StickyTopComponent'
import { AddPostContextProvider } from '@/context/AddPostContext'
import { ReactNode } from 'react'

const PostLayout = ({ children }: { children: ReactNode }) => {
  return (
    <AddPostContextProvider>
      <StickyTopComponent className=" font-bold text-lg ">
        <BackComponent>
          <div className="flex items-center py-4">
            <p className="font-bold text-xl items-center">Post</p>
          </div>
        </BackComponent>
      </StickyTopComponent>
      {children}
    </AddPostContextProvider>
  )
}

export default PostLayout
