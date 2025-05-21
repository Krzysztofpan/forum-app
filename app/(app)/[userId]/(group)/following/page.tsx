import DataNotFoundInformation from '@/components/DataNotFoundFoundInformation'
import UserView from '@/components/user/UserView'
import { userType } from '@/models/User'
import Link from 'next/link'

const FollowingPage = async ({
  params,
}: {
  params: Promise<{ userId: string }>
}) => {
  const userId = (await params).userId
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/${userId}`,
    {
      // fetch na serwerze w Next.js domyślnie jest bez cache,
      // ale możesz dodać np. revalidate jeśli chcesz ISR
      cache: 'reload',
    }
  )

  if (!res.ok) {
    // obsłuż błąd (np. 404)
    return <p>User nie znaleziony</p>
  }
  const user = await res.json()

  if (!user.following) {
    return (
      <DataNotFoundInformation
        header={`@${user.userAt} isn't following anyone`}
        info="Once they follow accounts, they'll show up here."
      />
    )
  }

  return (
    <div>
      {user.following.map((follow: userType) => (
        <Link href={`/${follow.userAt}`} key={String(follow._id)}>
          <div className="p-4">
            <UserView userAt={follow.userAt} username={follow.username} />
          </div>
        </Link>
      ))}
    </div>
  )
}

export default FollowingPage
