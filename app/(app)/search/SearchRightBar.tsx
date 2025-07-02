'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const SearchRightBar = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  return (
    <div className="pt-4 flex flex-col gap-4 sticky top-0 h-max w-full">
      <div className="px-4 py-2 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4  ">
        <h1 className="text-xl font-bold">Search filters</h1>
      </div>
      <div className="px-4 py-2 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4  ">
        <div className="space-y-2">
          <h2 className="font-bold">People</h2>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label htmlFor="fromAnyone">From anyone</label>
              <input
                type="radio"
                checked={!searchParams.get('pf')}
                name="people"
                className="scale-125 cursor-pointer"
                onClick={() => {
                  if (searchParams.get('pf')) {
                    router.push(`/search?q=${searchParams.get('q')}`)
                  }
                }}
              />
            </div>
            <div className="flex justify-between items-center">
              <label htmlFor="fromFollow">People you follow</label>
              <input
                type="radio"
                checked={!!searchParams.get('pf')}
                onClick={() => {
                  if (!searchParams.get('pf')) {
                    router.push(`/search?q=${searchParams.get('q')}&pf=on`)
                  }
                }}
                name="people"
                className="scale-125 cursor-pointer"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SearchRightBar
