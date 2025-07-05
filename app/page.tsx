import Navbar from '@/components/Navbar'

export const metadata = {
  title: 'Welcome to Cube – Your Gateway to Connection and Growth',
  description:
    'Discover why Cube was created – a platform designed to connect people, share knowledge, and grow communities. Join us today by registering or logging in to start your journey!',
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}`,
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Welcome to Cube – Your Gateway to Connection and Growth',
    description:
      'Learn about Cube’s mission and how we help you connect and grow. Ready to join? Register or log in now!',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
    siteName: 'Cube',
    type: 'website',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo-sm.png`,
        width: 630,
        height: 630,
        alt: 'Cube homepage preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Welcome to Cube – Your Gateway to Connection and Growth',
    description:
      'Discover Cube’s purpose and join our community. Register or log in to get started!',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logo-sm.png`],
  },
  viewport: 'width=device-width, initial-scale=1',
  lang: 'en',
}
export default async function Home() {
  return (
    <div className="relative h-[100vh] ">
      <Navbar />
      <div className="h-[70vh] bg-[url('/homepage-bg.jpg')]   bg-cover bg-repeat-x animate-bg-move flex items-center justify-center shadow-xl shadow-foreground/10 ">
        <h1 className="font-bold lg:text-7xl md:text-6xl sm:text-5xl text-4xl opacity-90">
          Welcome to my Forum
        </h1>
      </div>

      <div className="h-[30vh] flex items-center justify-center">
        <h2 className="lg:text-5xl md:text-4xl sm:text-3xl text-2xl font-semibold text-foreground ">
          The best forum under the sun
        </h2>
      </div>

      <div></div>
    </div>
  )
}
