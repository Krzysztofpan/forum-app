import { SearchIcon } from 'lucide-react'

const Search = ({ query }: { query?: string }) => {
  return (
    <form className="bg-inputGray py-2 px-4 flex items-center gap-4 rounded-full border-[1px] border-border">
      {/* <Image src="icons/explore.svg" alt="search" width={16} height={16} /> */}
      <SearchIcon size={16} />
      <input
        defaultValue={query}
        type="text"
        placeholder="Search"
        className="bg-transparent outline-none placeholder:text-textGray"
      />
    </form>
  )
}

export default Search
