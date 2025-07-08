import { auth } from '@/auth'

import NotificationBell from '@/components/NotificationBell'
export const metadata = {
  title: 'Notifications | YourAppName',
  description:
    'View your latest notifications: likes, new followers, and other interactions with your posts.',
  openGraph: {
    title: 'Notifications',
    description: 'See who liked your posts or started following you.',
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/home`,
    siteName: 'YourAppName',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_BASE_URL}/logo-sm.png`,
        width: 1200,
        height: 630,
        alt: 'User notifications',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Notifications | YourAppName',
    description:
      'Likes, follows, and more — check all your latest notifications in one place.',
    images: [`${process.env.NEXT_PUBLIC_BASE_URL}/logo-sm.png`],
  },
  robots: {
    index: false, // Notifications are private, do not index this page
    follow: false,
  },
  alternates: {
    canonical: `${process.env.NEXT_PUBLIC_BASE_URL}/notifications`,
  },
}
const NotificationsPage = async () => {
  const session = await auth()

  if (!session || !session.user) {
    return null
  }

  const userId = session.user.id

  return (
    <div>
      <NotificationBell userId={userId} />
    </div>
  )
}

export default NotificationsPage
