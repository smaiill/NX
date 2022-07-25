import { useSelector } from 'react-redux'
import { NotificationDataT } from '../../types/notification'
import NotificationWrapper from './components/NotificationWrapper'

const Notification = () => {
  const notificationsState = useSelector(
    (state: any) => state.notification.notifications
  )

  return (
    <>
      {notificationsState.map((notification: NotificationDataT) => (
        <NotificationWrapper
          notification={notification}
          key={notification.uuid}
        />
      ))}
    </>
  )
}

export default Notification
