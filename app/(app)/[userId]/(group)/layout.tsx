import BackComponent from '@/components/BackComponent'
import SpecialButton from '@/components/SpecialButton'
import StickyTopComponent from '@/components/StickyTopComponent'

import { ReactNode } from 'react'

const Layout = async ({
  params,
  children,
}: {
  params: Promise<{ userId: string }>
  children: ReactNode
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
  return (
    <div className="flex gap-8 max-w-[600px] lg:max-w-[990px] w-full  relative">
      <div className="max-w-[600px] w-full border-[1px] ">
        <StickyTopComponent>
          <BackComponent>
            <div className="flex flex-col">
              <span className="font-bold wrap-break-word">{user.username}</span>
              <span className="text-sm text-foreground/50">@{user.userAt}</span>
            </div>
          </BackComponent>
          <div className="grid grid-cols-2">
            <SpecialButton link={`/${user.userAt}/followers`}>
              Followers
            </SpecialButton>

            <SpecialButton link={`/${user.userAt}/following`}>
              Following
            </SpecialButton>
          </div>
          <hr></hr>
        </StickyTopComponent>

        <main>{children}</main>
      </div>
    </div>
  )
}

export default Layout
