'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import InfiniteScroll from 'react-infinite-scroll-component'
import PostComponent from '../PostComponent'
import { MediaType, PostWithDetails } from '@/types'
import Spinner from '../Spinner'

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

export const fetchWithSearch = async (
  pageParam: number,
  query: string,
  f?: string,
  pf?: string
) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/posts/withSearch?cursor=${pageParam}&q=${encodeURIComponent(
      query
    )}&f=${f}&pf=${pf}`
  )

  return res.json()
}

export const fetchBookmarks = async (pageParam: number, query: string) => {
  const res = await fetch(
    `${
      process.env.NEXT_PUBLIC_BASE_URL
    }/api/posts/withBookmarks?cursor=${pageParam}&q=${encodeURIComponent(
      query
    )}`
  )

  return res.json()
}

type FetchFncType = (
  pageParam: number,

  ...params: string[]
) => Promise<{ posts: (PostWithDetails | MediaType)[]; hasMore: boolean }>

const InfiniteFeed = ({
  fetchFnc,

  params = [],
  initialPage = 4,
}: {
  fetchFnc: FetchFncType
  displayMedia?: boolean
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
    queryFn: ({ pageParam = initialPage }) => fetchFnc(pageParam, ...params),
    initialPageParam: initialPage,
    getNextPageParam: (lastPage, pages) =>
      lastPage.hasMore ? pages.length + initialPage : undefined,
  })

  if (error) return <div>Something went wrong!</div>
  if (status === 'pending')
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner />
      </div>
    )

  const allPosts = posts?.pages?.flatMap((page) => page.posts) || []

  return (
    <InfiniteScroll
      dataLength={allPosts.length}
      next={fetchNextPage}
      hasMore={!!hasNextPage}
      loader={
        <div className="h-[50vh] flex items-center justify-center">
          <Spinner />
        </div>
      }
      endMessage={<h1>All posts loaded!</h1>}
    >
      {allPosts.map((post) => {
        post = post as PostWithDetails
        return <PostComponent withParent key={post.id} post={post} />
      })}
    </InfiniteScroll>
  )
}

export default InfiniteFeed
