import { auth } from '@/auth'
import HomeNavbar from '@/components/home/Navbar'
import { serializeUser } from '@/lib/utils/utlisFncs'
import User from '@/models/User'

import { ReactNode } from 'react'

const AppLayout = async ({
  children,
  modal,
}: {
  children: ReactNode
  modal: ReactNode
}) => {
  const session = await auth()

  if (!session || !session?.user) {
    return null
  }

  const user = await User.findById(session.user.id)

  const serializedUser = serializeUser(user)
  return (
    <>
      <div className="mx-auto flex justify-center  ">
        <div className=" mx-1 flex justify-end  ">
          <HomeNavbar user={serializedUser} />
        </div>
        {children}
      </div>
      {modal}
    </>
  )
}

export default AppLayout
