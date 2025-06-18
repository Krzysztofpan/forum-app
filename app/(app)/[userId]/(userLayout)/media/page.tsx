import DataNotFoundInformation from '@/components/DataNotFoundFoundInformation'
import { prisma } from '@/prisma'
import Image from 'next/image'

const MediaPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>
}) => {
  const userId = (await params).userId

  const mediaArray = await prisma.media.findMany({
    where: { user: { username: userId } },
  })

  if (mediaArray.length === 0) {
    return (
      <DataNotFoundInformation
        header={`@${userId} isn't following anyone`}
        info="Once they follow accounts, they'll show up here."
      />
    )
  }
  return (
    <div className="grid grid-cols-3  gap-1 m-1">
      {mediaArray.map((media) => (
        <div className="relative aspect-square" key={media.id}>
          <Image src={media.url} alt={media.url} fill />
        </div>
      ))}
    </div>
  )
}

export default MediaPage
