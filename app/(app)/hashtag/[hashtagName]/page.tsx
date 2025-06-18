import BackComponent from '@/components/BackComponent'
import HashtagNavbar from '@/components/HashtagNavbar'

import Search from '@/components/Search'
import Spinner from '@/components/Spinner'

import { Ellipsis } from 'lucide-react'

import { Suspense } from 'react'

import HashtagDisplay from './HashtagDisplay'
import InfiniteFeed, { fetchHashtagPosts } from '@/components/home/InfiniteFeed'

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
              <Search />
            </div>

            <Ellipsis size={20} />
          </div>
        </BackComponent>
        <HashtagNavbar hashtagName={hashtag} />
      </div>

      <Suspense fallback={<Spinner />}>
        <HashtagDisplay hashtag={hashtag} f={f} />
      </Suspense>
      <InfiniteFeed
        initialPage={4}
        fetchFnc={fetchHashtagPosts}
        params={[hashtag, f]}
      />
    </div>
  )
}

export default HashtagPage
