import { auth } from '@/auth'
import Modal from '@/components/Modal'

import { DialogOverlay } from '@/components/ui/dialog'
import UserEditProfile from '@/components/user/UserEditProfile'

import { prisma } from '@/prisma'

const Page = async () => {
  const session = await auth()

  if (!session || !session?.user) {
    return null
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } })
  if (!user) return
  return (
    <Modal>
      <DialogOverlay className="bg-gray-500/50" />

      <UserEditProfile user={user} />
    </Modal>
  )
}

export default Page
