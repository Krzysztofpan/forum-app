import Logo from '@/components/Logo'
import { ReactNode } from 'react'

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="relative h-[100vh] w-[100vw] flex justify-center items-center">
      <div className="fixed top-2 left-2">
        <Logo />
      </div>

      <main>{children}</main>
    </div>
  )
}

export default AuthLayout
