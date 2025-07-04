'use client'
import React, { useState, useEffect, ChangeEvent } from 'react'
import { useQuery } from '@tanstack/react-query'

import { UserSummary } from '../types'
import { fetchUsersWithQuery } from '../lib/actions/user.action'
import { Search, SearchIcon } from 'lucide-react'
import Spinner from './Spinner'
import UserView from './user/UserView'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { fetchHashtagsWithQuery } from '@/lib/actions/hashtag.action'

const fetchUsers = async (
  query: string
): Promise<{
  hashtags: { name: string; id: number }[]
  users: UserSummary[]
}> => {
  if (!query) return { hashtags: [], users: [] }
  const hashtags = await fetchHashtagsWithQuery(query)
  const users = await fetchUsersWithQuery(query)

  return {
    hashtags: hashtags,
    users: users,
  }
}

const SearchInputWithTanStackQuery = ({
  initialValue,
}: {
  initialValue?: string
}) => {
  const [inputValue, setInputValue] = useState<string>(initialValue || '')
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')
  const router = useRouter()
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(inputValue)
    }, 500)

    return () => {
      clearTimeout(handler)
    }
  }, [inputValue])

  const {
    data: searchResults,
    isLoading,
    isError,
    error,
    isFetching,
  } = useQuery<
    {
      hashtags: { name: string; id: number }[]
      users: UserSummary[]
    },
    Error
  >({
    queryKey: ['users', 'search', debouncedSearchTerm],
    queryFn: () => fetchUsers(debouncedSearchTerm),
    enabled: debouncedSearchTerm.length > 0,
    staleTime: 5000,
  })

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(e.target.value)
  }

  return (
    <div>
      <form
        className="bg-inputGray py-2 px-4  items-center gap-4 rounded-full border-[1px] border-border  group relative flex "
        onSubmit={(e) => {
          e.preventDefault()
          router.push(`/search?q=${encodeURIComponent(inputValue)}`)
        }}
      >
        <SearchIcon size={16} />
        <input
          type="text"
          placeholder="Search"
          value={inputValue}
          onChange={handleInputChange}
          className="bg-transparent outline-none placeholder:text-textGray"
        />
        <div
          className="hidden 
        group-focus-within:block group-focus:block group-focus-visible:block  shadow-md shadow-white bg-background min-h-[15vh] absolute left-0 top-[42px] w-full z-100 rounded-lg max-h-[70vh] overflow-y-auto"
        >
          {!isLoading && !searchResults && !inputValue && (
            <p className="text-foreground/50 flex justify-center mt-6 text-sm">
              Try searching for people, lists, or keywords.
            </p>
          )}
          {(isLoading || isFetching) && <Spinner />}
          {isError && (
            <p style={{ color: 'red' }}>Something went wrong! try again.</p>
          )}
          {/*   {!isLoading &&
            !isFetching &&
            searchResults?.length === 0 &&
            inputValue && <p>No results for "{inputValue}".</p>} */}
          {searchResults?.hashtags && searchResults.hashtags.length > 0 ? (
            <div className="border-b-[1px] border-border">
              <ul>
                {searchResults.hashtags.map((hashtag) => (
                  <Link
                    key={hashtag.id}
                    href={`/search?q=${encodeURIComponent(hashtag.name)}`}
                    className="flex gap-3  p-4 hover:bg-foreground/5"
                  >
                    <Search size={20} className="stroke-2" />{' '}
                    <span>{hashtag.name}</span>
                  </Link>
                ))}
              </ul>
            </div>
          ) : (
            inputValue &&
            !isLoading &&
            !isError && (
              <div className="border-b-[1px] border-border">
                <button
                  className="p-4 hover:bg-foreground/5 cursor-pointer w-full text-left"
                  type="submit"
                >
                  Search for "{inputValue}"
                </button>
              </div>
            )
          )}
          {searchResults?.users && searchResults.users.length > 0 ? (
            <div>
              <ul>
                {searchResults.users.map((user) => (
                  <Link
                    key={user.username}
                    href={`/${user.username}`}
                    className="block p-4 hover:bg-foreground/5"
                  >
                    <UserView
                      userDisplayName={user.displayName || user.username}
                      username={user.username}
                      isFollowed
                      userAvatar={user.img || undefined}
                      key={user.username}
                    />
                  </Link>
                ))}
              </ul>
            </div>
          ) : (
            inputValue &&
            !isLoading &&
            !isError && (
              <div className="border-b-[1px] border-border">
                <Link
                  className="p-4 hover:bg-foreground/5 cursor-pointer block"
                  href={`/${inputValue}`}
                >
                  go to @{inputValue}
                </Link>
              </div>
            )
          )}
          {/*   {inputValue && (
            <Link
              className="p-4 block hover:bg-foreground/5"
              href={`/${inputValue}`}
            >
              go to @{inputValue}
            </Link>
          )} */}
        </div>
      </form>
    </div>
  )
}

export default SearchInputWithTanStackQuery
