'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import React from 'react'

const HashtagHighlighter = ({ text }: { text: string }) => {
  const regex = /(\s|^)(#[a-zA-Z0-9_]+)/g
  const searchParams = useSearchParams()
  const hashtagParam = searchParams.get('q')
  const elements = []
  let lastIndex = 0

  text.replace(regex, (match, spaceOrStart, hashtag, offset) => {
    elements.push(text.slice(lastIndex, offset + spaceOrStart.length))

    elements.push(
      <Link
        href={`/search?q=${encodeURIComponent(hashtag)}`}
        key={offset}
        className={`text-blue-500 hover:underline ${
          hashtag === hashtagParam ? 'font-bold' : ''
        }`}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {hashtag}
      </Link>
    )

    lastIndex = offset + match.length
    return match
  })

  elements.push(text.slice(lastIndex))

  return <p className="whitespace-pre-wrap">{elements}</p>
}

export default HashtagHighlighter
