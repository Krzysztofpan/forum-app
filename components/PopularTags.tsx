import Image from 'next/image'
import Link from 'next/link'

const PopularTags = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textGrayLight">
        What&apos; Happening
      </h1>

      {/* TOPICS */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm font-semibold">
            Technology Trending
          </span>
          <Image src="icons/infoMore.svg" alt="info" width={16} height={16} />
        </div>

        <h2 className="text-textGrayLight font-bold">OpenAI</h2>
        <span className="text-sm text-textGray">20K posts</span>
      </div>
      {/* TOPICS */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm font-semibold">
            Technology Trending
          </span>
          <Image src="icons/infoMore.svg" alt="info" width={16} height={16} />
        </div>

        <h2 className="text-textGrayLight font-bold">OpenAI</h2>
        <span className="text-sm text-textGray">20K posts</span>
      </div>
      {/* TOPICS */}
      <div>
        <div className="flex items-center justify-between">
          <span className="text-textGray text-sm font-semibold">
            Technology Trending
          </span>
          <Image src="icons/infoMore.svg" alt="info" width={16} height={16} />
        </div>

        <h2 className="text-textGrayLight font-bold">OpenAI</h2>
        <span className="text-sm text-textGray">20K posts</span>
      </div>
      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  )
}

export default PopularTags
