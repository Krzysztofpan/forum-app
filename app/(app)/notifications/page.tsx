import { auth } from '@/auth'

import NotificationBell from '@/components/NotificationBell'

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
