import { ICreatedNotification } from '@nx/types'
import { useNotificationStore } from '../../store/notification'
import { NotificationWrapper } from './components/NotificationWrapper'

const Notification = () => {
  const { notifications } = useNotificationStore()

  return (
    <>
      {notifications.map((notification: ICreatedNotification) => (
        <NotificationWrapper
          notification={notification}
          key={notification.uuid}
        />
      ))}
    </>
  )
}

export { Notification }
