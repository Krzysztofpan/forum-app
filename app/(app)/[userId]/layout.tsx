import connectionToDatabase from '@/lib/mongoose'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  await connectionToDatabase()
  return (
    <div className="flex gap-8 max-w-[600px] lg:max-w-[990px] w-full  relative">
      <main className="max-w-[600px] w-full">{children}</main>
      <div className="hidden lg:block  ">sdwadawwsssswdide</div>
    </div>
  )
}

export default Layout
