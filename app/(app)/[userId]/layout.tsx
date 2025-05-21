import ComponentsLayout from '@/components/ComponentsLayout'
import connectionToDatabase from '@/lib/mongoose'
import { ReactNode } from 'react'

const Layout = async ({ children }: { children: ReactNode }) => {
  await connectionToDatabase()
  return (
    <ComponentsLayout>
      <main className="max-w-[600px] w-full">{children}</main>
    </ComponentsLayout>
  )
}

export default Layout
