'use client'
import { auth } from '@/auth'
import DataNotFoundInformation from '@/components/DataNotFoundFoundInformation'
import InfiniteFeed, { fetchBookmarks } from '@/components/home/InfiniteFeed'
import PostComponent from '@/components/PostComponent'
import { prisma } from '@/prisma'
import { Search } from 'lucide-react'
import { useState } from 'react'

const BookmarksPosts = () => {
  const [query, setQuery] = useState('')
  /* const session = await auth()
  
  if (!session || !session.user) return
  const userId = session.user.id
  const postIncludeQuery = {
    user: { select: { displayName: true, username: true, img: true } },
    _count: { select: { likes: true, rePosts: true, comments: true } },
    likes: { where: { userId: userId }, select: { id: true } },
    rePosts: { where: { userId: userId }, select: { id: true } },
    saves: { where: { userId: userId }, select: { id: true } },
    media: { where: {} },
  }
  const savedPosts = await prisma.savedPosts.findMany({
    where: { userId },
    include: { post: { include: { ...postIncludeQuery } } },
    orderBy: { createdAt: 'desc' },
    take: 9,
  }) */

  return (
    <div className="">
      <form>
        <div className="my-1 flex border-[1px] border-border mx-4 rounded-3xl gap-1 items-center py-3 px-3 text-sm focus-within:border-blue-500">
          <Search size={15} className="text-foreground/50 " />
          <input
            type="text"
            className="placeholder:text-foreground focus:outline-none focus-within:outline-none focus-visible:outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Bookmarks"
          />
        </div>

        <InfiniteFeed
          initialPage={1}
          fetchFnc={fetchBookmarks}
          params={[query]}
        />
      </form>
    </div>
  )
}

export default BookmarksPosts
