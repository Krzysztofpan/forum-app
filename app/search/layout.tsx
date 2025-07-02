import { auth } from '@/auth'
import HomeNavbar from '@/components/home/Navbar'
import RightBar from '@/components/RightBar'

import { ModalContextProvider } from '@/context/ModalContext'
import QueryProvider from '@/context/QueryProvider'

import { prisma } from '@/prisma'

import { ReactNode } from 'react'
import SearchRightBar from './SearchRightBar'

const SearchLayout = async ({
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

  /* const user = await User.findById(session.user.id) */
  const user = await prisma.user.findUnique({ where: { id: session.user.id } })

  if (!user) {
    return
  }
  /* const serializedUser = serializeUser(user) */
  return (
    <QueryProvider>
      <div>
        {modal}
        <div className="flex flex-col-reverse xs:flex-row xs:max-w-screen-md  lg:max-w-screen-lg xl:max-w-screen-xl xxl:max-w-screen-xxl mx-auto xl:justify-between">
          <div className="xxl:px-8 xs:h-screen sticky bottom-0 xs:top-0 z-50">
            <HomeNavbar user={user} />
          </div>

          <div className="flex-1 max-w-[600px] lg:max-w-lg lg:min-w-[600px] xs:border-x-[1px] xs:border-borderGray">
            {children}
          </div>
          <div className="hidden lg:flex h-screen ml-4 md:ml-8 flex-1 sticky top-0">
            <SearchRightBar  />
          </div>
        </div>
      </div>
    </QueryProvider>
  )
}

export default SearchLayout
