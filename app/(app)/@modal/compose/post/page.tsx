import { auth } from '@/auth'
import AddPostComponent from '@/components/home/AddPostComponent'
import Modal from '@/components/Modal'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { AddPostContextProvider } from '@/context/AddPostContext'
import { prisma } from '@/prisma'

import { notFound } from 'next/navigation'

const ModalPostCreate = async ({
  searchParams,
}: {
  searchParams: Promise<{ repost?: string; parentId?: string }>
}) => {
  const session = await auth()

  if (!session || !session.user) {
    return
  }

  const userAvatar = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { img: true },
  })

  const repostId = (await searchParams).repost
  const parentId = (await searchParams).parentId

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${repostId || parentId}`
  )
  if (!res.ok) {
    return notFound()
  }

  const Post = await res.json()
  return (
    <AddPostContextProvider>
      <Modal>
        <DialogContent className=" p-0  max-h-[800px] overflow-y-auto overflow-x-hidden sm:max-w-[600px] md:min-w-[600px]">
          <DialogTitle></DialogTitle>
          <AddPostComponent
            type={repostId ? 'quote' : 'comment'}
            avatar={userAvatar?.img || '/logo.png'}
            placeholder="Add a comment"
            className="mx-0 w-full"
            repostPost={repostId && Post}
            parentPost={parentId && Post}
          />
        </DialogContent>
      </Modal>
    </AddPostContextProvider>
  )
}

export default ModalPostCreate
