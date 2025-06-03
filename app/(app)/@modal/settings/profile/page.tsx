import { auth } from '@/auth'
import Modal from '@/components/Modal'

import { DialogContent, DialogOverlay } from '@/components/ui/dialog'
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
      <DialogContent className=" p-0 m-0 rounded-none border-none md:rounded-sm  max-w-[690px]! md:max-w-[600px]! w-full h-full   md:px-0  md:h-auto">
        <UserEditProfile user={serializedUser} />
      </DialogContent>
    </Modal>
  )
}

export default Page
