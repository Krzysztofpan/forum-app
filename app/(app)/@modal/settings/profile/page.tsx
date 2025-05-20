import { auth } from '@/auth'
import Modal from '@/components/Modal'

import { DialogContent } from '@/components/ui/dialog'
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
      <DialogContent className="p-0 m-0 max-w-[600px]! ">
        <UserEditProfile user={serializedUser} />
      </DialogContent>
    </Modal>
  )
}

export default Page
