import { Search } from 'lucide-react'
import { Input } from './ui/input'

const SearchInput = () => {
  return (
    <div className="pt-4 flex flex-col gap-4 sticky top-0 h-max w-full">
      <div className="flex border-[1px] rounded-full items-center px-2 focus-within:border-blue-400 h-[40px] ">
        <Search size={18} />
        <Input
          placeholder="Search"
          className="border-none bg-transparent! focus-visible:ring-0 "
        />
      </div>
    </div>
  )
}

export default SearchInput
