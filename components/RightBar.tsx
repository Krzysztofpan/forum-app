import Link from 'next/link'
import PopularTags from './PopularTags'
import Recommendations from './Recommendations'
import Search from './Search'
import SearchInputWithTanStackQuery from '@/components/SearchInputWithTanstack'

const RightBar = () => {
  return (
    <div className="pt-4 flex flex-col gap-4 sticky top-0 h-max">
      <SearchInputWithTanStackQuery />
      <Recommendations />
      <PopularTags />
      <div className="text-textGray text-sm flex gap-x-4 flex-wrap ">
        <Link href="/">Terms of Service</Link>
        <Link href="/">Privacy Policy</Link>
        <Link href="/">Cookie Policy</Link>
        <Link href="/">Accessibility</Link>
        <Link href="/">Ads Info</Link>

        <span>&copy; 2025 L Corp.</span>
      </div>
    </div>
  )
}

export default RightBar
