'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostComponent from '../PostComponent'
import { PostWithDetails } from '@/types'
export const fetchPosts = async (
  pageParam: number,
  userProfileId?: string,
  withReplies?: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts?cursor=${pageParam}&user=${userProfileId}&r=${withReplies}`
  )

  return res.json()
}
export const fetchHashtagPosts = async (
  pageParam: number,
  hashtag: string,
  f?: string
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/hashtag/${hashtag}?cursor=${pageParam}&f=${f}`
  )

  return res.json()
}

type FetchFncType = (
  pageParam: number,
  ...params: string[]
) => Promise<{ posts: PostWithDetails[]; hasMore: boolean }>

const InfiniteFeed = ({
  fetchFnc,
  params = [],
  initialPage,
}: {
  fetchFnc: FetchFncType
  params?: string[]
  initialPage?: number
}) => {
  const {
    data: posts,
    error,
    status,
    hasNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', params],
    queryFn: ({ pageParam = initialPage || 4 }) =>
      fetchFnc(pageParam, ...params),
    initialPageParam: initialPage || 4,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + 4 : undefined,
  })

  if (error) return <div>Something went wrong!</div>
  if (status === 'pending') return <div>Loading...</div>

  const allPosts = posts?.pages?.flatMap((page) => page.posts) || []

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={<h1>Posts are loading...</h1>}
      endMessage={<h1>All posts loaded!</h1>}
    >
      {allPosts.map((post) => {
        return <PostComponent withParent key={post.id} post={post} />
      })}
    </InfiniteScroll>
  )
}

export default InfiniteFeed
