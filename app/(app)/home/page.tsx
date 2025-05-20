import MainApp from '@/app/(app)/home/MainApp'
import { AddPostContextProvider } from '@/context/AddPostContext'

const HomePage = () => {
  /*  async function handleLogOut() {
    'use server'
    await signOut()
  } */
  return (
    <AddPostContextProvider>
      <div className="flex gap-8 max-w-[600px] lg:max-w-[990px] w-full">
        <MainApp />

        <div className="hidden lg:block  ">sdwadawwsssswdide</div>
      </div>
    </AddPostContextProvider>
  )
}

export default HomePage
