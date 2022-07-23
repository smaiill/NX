import { useSelector } from 'react-redux'
import { NotificationDataT } from '../../types/notification'
import { injectMockData } from '../../utils/mock.data'
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

injectMockData([
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'SUCCES',
      duration: 500,
      body: {
        content: 'SUCCES',
      },
    },
  },
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'WARN',
      duration: 500,
      body: {
        content: 'WARN',
      },
    },
  },
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'ERROR',
      duration: 500,
      body: {
        content: 'ERROR',
      },
    },
  },
  {
    app: 'NX::notification',
    method: 'NX::createNotification',
    data: {
      type: 'NORMAL',
      duration: 500,
      body: {
        content: 'NORMAL',
      },
    },
  },
])
