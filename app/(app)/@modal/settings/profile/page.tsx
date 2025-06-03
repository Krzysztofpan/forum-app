import { auth } from '@/auth'
import Modal from '@/components/Modal'

import { DialogOverlay } from '@/components/ui/dialog'
import UserEditProfile from '@/components/user/UserEditProfile'

import { serializeUser } from '@/lib/utils/utlisFncs'

import User from '@/models/User'

const Page = async () => {
  const session = await auth()
  if (!session || !session?.user) {
    return null
  }

  const user = await User.findById(session.user.id)
  const serializedUser = serializeUser(user)

  return (
    <Modal>
      <DialogOverlay className="bg-gray-500/50" />

      <UserEditProfile user={serializedUser} />
    </Modal>
  )
}

export default Page
