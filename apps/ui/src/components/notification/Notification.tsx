import { NotificationData } from '@nx/types'
import { useNotificationStore } from '../../store/notification'
import { NotificationWrapper } from './components/NotificationWrapper'

const Notification = () => {
  const { notifications } = useNotificationStore()

  return (
    <>
      {notifications.map((notification: NotificationData) => (
        <NotificationWrapper
          notification={notification}
          key={notification.uuid}
        />
      ))}
    </>
  )
}

export { Notification }
