import { ReactNode } from 'react'

const HomeContentContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-8 max-w-[600px] w-full  relative">
      <main className="max-w-[600px] w-full border-x-[1px] border-border min-h-[100vh]">
        {children}
      </main>
    </div>
  )
}

export default HomeContentContainer
