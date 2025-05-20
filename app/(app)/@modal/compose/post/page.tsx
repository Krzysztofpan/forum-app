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
        <DialogContent className="sm:w-[600px] p-0 sm:max-w-full max-h-[800px] overflow-auto">
          <DialogTitle></DialogTitle>
          <AddPostComponent
            type="quote"
            placeholder="Add a comment"
            className="mx-0 "
            repostPost={repostedPost}
          />
        </DialogContent>
      </Modal>
    </AddPostContextProvider>
  )
}

export default ModalPostCreate
