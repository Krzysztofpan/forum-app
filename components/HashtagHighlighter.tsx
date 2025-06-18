'use client'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import React from 'react'

const HashtagHighlighter = ({ text }: { text: string }) => {
  const regex = /(\s|^)(#[a-zA-Z0-9_]+)/g
  const params = useParams()
  const hashtagParam = params.hashtagName
  const elements = []
  let lastIndex = 0

  text.replace(regex, (match, spaceOrStart, hashtag, offset) => {
    elements.push(text.slice(lastIndex, offset + spaceOrStart.length))

    elements.push(
      <Link
        href={`/hashtag/${hashtag.split('#')[1]}`}
        key={offset}
        className={`text-blue-500 hover:underline ${
          hashtag.split('#')[1] === hashtagParam ? 'font-bold' : ''
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
