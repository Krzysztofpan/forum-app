import { AddPostContextProvider } from '@/context/AddPostContext'
import { ReactNode } from 'react'

const PostLayout = ({ children }: { children: ReactNode }) => {
  return <AddPostContextProvider>{children}</AddPostContextProvider>
}

export default PostLayout
