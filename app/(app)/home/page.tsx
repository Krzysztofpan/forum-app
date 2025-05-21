import MainApp from '@/app/(app)/home/MainApp'
import ComponentsLayout from '@/components/ComponentsLayout'

import { AddPostContextProvider } from '@/context/AddPostContext'

const HomePage = () => {
  /*  async function handleLogOut() {
    'use server'
    await signOut()
  } */
  return (
    <AddPostContextProvider>
      <ComponentsLayout>
        <MainApp />
      </ComponentsLayout>
    </AddPostContextProvider>
  )
}

export default HomePage
