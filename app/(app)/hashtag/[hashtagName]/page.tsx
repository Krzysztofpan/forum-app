import BackComponent from '@/components/BackComponent'

import Spinner from '@/components/Spinner'

import { Ellipsis } from 'lucide-react'

import { Suspense } from 'react'

import HashtagDisplay from './HashtagDisplay'

import SearchNavbar from '@/components/SearchNavbar'
import SearchInputWithTanStackQuery from '@/components/SearchInputWithTanstack'

const HashtagPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ hashtagName: string }>
  searchParams: Promise<{ f: string }>
}) => {
  const hashtag = (await params).hashtagName
  const f = (await searchParams).f

  return (
    <div>
      <div>
        <BackComponent>
          <div className="flex gap-8 items-center mx-2">
            <div className="flex-1">
              <SearchInputWithTanStackQuery />
            </div>

            <Ellipsis size={20} />
          </div>
        </BackComponent>
        <SearchNavbar path={`hashtag/${hashtag}`} />
      </div>

      <Suspense fallback={<Spinner />}>
        <HashtagDisplay hashtag={hashtag} f={f} />
      </Suspense>
    </div>
  )
}

export default HashtagPage
