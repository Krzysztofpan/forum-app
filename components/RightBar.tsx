import Link from 'next/link'
import PopularTags from './PopularTags'
import Recommendations from './Recommendations'

import SearchInputWithTanStackQuery from '@/components/SearchInputWithTanstack'
import { headers } from 'next/headers'
import SearchRightBar from '@/app/(app)/search/SearchRightBar'
import RightLayout from './RightLayout'

const RightBar = async () => {
  return (
    <RightLayout>
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
    </RightLayout>
  )
}

export default RightBar
