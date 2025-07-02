import { redirect } from 'next/navigation'

import BackComponent from '@/components/BackComponent'
import { Ellipsis } from 'lucide-react'

import SearchView from './SearchView'
import { Suspense } from 'react'
import Spinner from '@/components/Spinner'
import SearchNavbar from '@/components/SearchNavbar'

import SearchInputWithTanStackQuery from '@/components/SearchInputWithTanstack'
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q: string; f?: string; pf?: string }>
}) {
  const { q: query, f: filter, pf: page } = await searchParams

  const title = `${query} - Search / Cube`
  const description = `Explore articles, guides, and resources matching your search query "${query}". Find the information you need quickly and easily.`

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL
  const canonicalUrl = `${baseUrl}/search?q=${encodeURIComponent(query)}${
    filter ? `&f=${encodeURIComponent(filter)}` : ''
  }${page ? `&pf=${page}` : ''}`

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'Cube',
      type: 'website',
      images: [
        {
          url: `${process.env.LOGO_URL}`,
          width: 630,
          height: 630,
          alt: `Search results preview for "${query}"`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: `${process.env.LOGO_URL}`,
    },
    viewport: 'width=device-width, initial-scale=1',
    lang: 'en',
  }
}

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ q: string; f?: string; pf: string }>
}) => {
  const { q, f, pf } = await searchParams

  if (!q) redirect('/explore')

  return (
    <div>
      <BackComponent>
        <div className="flex gap-8 items-center mx-2">
          <div className="flex-1">
            <SearchInputWithTanStackQuery initialValue={q} />
          </div>

          <Ellipsis size={20} />
        </div>
      </BackComponent>
      <SearchNavbar path={`search`} searchParam={`q=${q}`} />
      <main className="">
        <Suspense
          fallback={
            <div className="flex h-[50vh] justify-center items-center">
              <Spinner />
            </div>
          }
        >
          <SearchView searchParams={{ q, f, pf }} />
        </Suspense>
      </main>
    </div>
  )
}

export default SearchPage
