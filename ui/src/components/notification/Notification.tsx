import { NotificationDataT } from '../../../../types/notification'
import NotificationWrapper from './components/NotificationWrapper'
import { useSelector } from 'react-redux'

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
