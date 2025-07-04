import BackComponent from '@/components/BackComponent'
import StickyTopComponent from '@/components/StickyTopComponent'
import { Search } from 'lucide-react'
import BookmarksPosts from './BookmarksPosts'
import { Suspense } from 'react'
import Spinner from '@/components/Spinner'
import InfiniteFeed, { fetchBookmarks } from '@/components/home/InfiniteFeed'

const Bookmarks = () => {
  return (
    <div>
      <StickyTopComponent>
        <BackComponent>
          <span className="font-bold text-xl">Bookmarks</span>
        </BackComponent>
      </StickyTopComponent>

      <Suspense
        fallback={
          <div className="flex h-[50vh] items-center justify-center">
            <Spinner />
          </div>
        }
      >
        <BookmarksPosts />
     
      </Suspense>
    </div>
  )
}

export default Bookmarks
