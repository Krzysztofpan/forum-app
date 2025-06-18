import { prisma } from '@/prisma'
import Image from 'next/image'
import Link from 'next/link'

const PopularTags = async () => {
  const topHashtags = await prisma.hashtag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      posts: {
        _count: 'desc',
      },
    },
    take: 3,
  })

  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textGrayLight">
        What&apos; Happening
      </h1>

      {/* TOPICS */}
      {topHashtags.map((hashtag) => (
        <Link href={`/hashtag/${hashtag.name.split('#')[1]}`} key={hashtag.id}>
          <h2 className="text-textGrayLight font-bold">{hashtag.name}</h2>
          <span className="text-sm text-textGray">
            {hashtag._count.posts} posts
          </span>
        </Link>
      ))}

      {/*   <Link href="/" className="text-iconBlue">
        Show More
      </Link> */}
    </div>
  )
}

export default PopularTags
