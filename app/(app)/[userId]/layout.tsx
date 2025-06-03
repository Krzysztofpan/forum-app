import connectionToDatabase from '@/lib/mongoose'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  await connectionToDatabase()
  return <main className="max-w-[600px] w-full">{children}</main>
}

export default Layout
