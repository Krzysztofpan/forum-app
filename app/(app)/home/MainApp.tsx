import AddPostComponent from '@/components/home/AddPostComponent'
import DisplayPosts from '../../../components/home/DisplayPosts'
import MainContent from './MainContent'
import { auth } from '@/auth'

import { prisma } from '@/prisma'
import InfiniteFeed, { fetchPosts } from '@/components/home/InfiniteFeed'
import { Suspense } from 'react'
import Spinner from '@/components/Spinner'

const MainApp = async () => {
  const session = await auth()

  if (!session || !session.user) return
  /*  const user = await User.findById(session.user.id) */
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  if (!user) return
  return (
    <div className=" min-h-[100vh]">
      <DisplayPosts avatar={user.img} />
      <AddPostComponent type="post" avatar={user?.img || undefined} />
      <div className="border-b-[1px] border-b-solid mt-2"></div>
      <Suspense
        fallback={
          <div className="flex items-center justify-center">{<Spinner />}</div>
        }
      >
        <MainContent />
        <InfiniteFeed initialPage={4} fetchFnc={fetchPosts} />
      </Suspense>
    </div>
  )
}

export default MainApp
