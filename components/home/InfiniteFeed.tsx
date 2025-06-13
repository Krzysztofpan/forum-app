'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostComponent from '../PostComponent'

const fetchPosts = async (pageParam: number, userProfileId?: string) => {
  const res = await fetch(
    `http://localhost:3000/api/posts?cursor=${pageParam}&user=${userProfileId}`
  )

  return res.json()
}

const InfiniteFeed = ({ userProfileId }: { userProfileId?: string }) => {
  const {
    data: posts,
    error,
    status,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 2 }) => fetchPosts(pageParam, userProfileId),
    initialPageParam: 2,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 2 : undefined,
  })

  if (error) return 'Something went wrong!'

  if (status === 'pending') return 'Loading...'
  console.log(posts)

  const allPosts = posts?.pages?.flatMap((page) => page.posts) || []

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h1>Posts are loading...</h1>}
      endMessage={<h1>All posts loaded!</h1>}
    >
      {allPosts.map((post) => (
        <PostComponent key={post.id} post={post} />
      ))}
    </InfiniteScroll>
  )
}

export default InfiniteFeed
