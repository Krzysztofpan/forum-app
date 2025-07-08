import MainApp from '@/app/(app)/home/MainApp'

import { AddPostContextProvider } from '@/context/AddPostContext'

export const metadata = {
  title: 'Home / Cube',
  description:
    'Welcome to our homepage – your gateway to the latest articles, updates, and featured content. Discover valuable resources, expert insights, and personalized recommendations designed to keep you informed and engaged. Start exploring now!',

  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
  },

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: 'Home / Cube',
    description:
      'Discover the latest articles, updates, and expert insights on Cube. Your go-to source for valuable content and personalized recommendations.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
    siteName: 'Cube',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo-sm.png`,
        width: 630,
        height: 630,
        alt: 'Cube Homepage Preview',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Home / Cube',
    description:
      'Explore Cube’s homepage with the latest articles, updates, and expert insights. Stay informed and engaged!',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logo-sm.png`],
  },

  viewport: 'width=device-width, initial-scale=1',

  lang: 'en',
}

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
