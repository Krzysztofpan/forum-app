import AddPostComponent from '@/components/home/AddPostComponent'
import Modal from '@/components/Modal'
import { DialogContent, DialogTitle } from '@/components/ui/dialog'
import { AddPostContextProvider } from '@/context/AddPostContext'

import { notFound } from 'next/navigation'

const ModalPostCreate = async ({
  searchParams,
}: {
  searchParams: Promise<{ repost?: string }>
}) => {
  const repostId = (await searchParams).repost
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts/${repostId}`,
    {
      // fetch na serwerze w Next.js domyślnie jest bez cache,
      // ale możesz dodać np. revalidate jeśli chcesz ISR
    }
  )
  if (!res.ok) {
    // obsłuż błąd (np. 404)
    return notFound()
  }

  const repostedPost = await res.json()
  return (
    <AddPostContextProvider>
      <Modal>
        <DialogContent className=" p-0  max-h-[800px] overflow-y-auto overflow-x-hidden sm:max-w-[600px] md:min-w-[600px]">
          <DialogTitle></DialogTitle>
          <AddPostComponent
            type="quote"
            placeholder="Add a comment"
            className="mx-0 w-full"
            repostPost={repostedPost}
          />
        </DialogContent>
      </Modal>
    </AddPostContextProvider>
  )
}

export default ModalPostCreate
