import { ReactNode } from 'react'
import SearchInput from './SearchInput'

const ComponentsLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex gap-8 max-w-[600px] lg:max-w-[990px] w-full">
      {children}

      <div className="hidden lg:block w-full  max-w-[350px]   mt-2 shrink-[2]">
        <SearchInput /> ss
      </div>
    </div>
  )
}

export default ComponentsLayout
