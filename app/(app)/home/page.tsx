import MainApp from '@/app/(app)/home/MainApp'

import { AddPostContextProvider } from '@/context/AddPostContext'

const HomePage = () => {
  /*  async function handleLogOut() {
    'use server'
    await signOut()
  } */
  return (
    <AddPostContextProvider>
      <MainApp />
    </AddPostContextProvider>
  )
}

export default HomePage
