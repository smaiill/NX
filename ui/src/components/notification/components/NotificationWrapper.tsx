import {
  NotificationBGColors,
  NotificationDataT,
  NotificationMainColors,
} from '../../../types/notification'
import NotificationIcon from './NotificationIcon'

const NotificationWrapper = ({
  notification,
}: {
  notification: NotificationDataT
}) => {
  return (
    <div
      style={{
        backgroundColor: NotificationBGColors[notification.type],
      }}
      id={notification.uuid}
      className="notification-wrapper"
    >
      <div className="notification-left-side">
        <div
          style={{
            backgroundColor: NotificationMainColors[notification.type],
          }}
          className="notification-icon-wrapper"
        >
          <div className="notification-row">
            <NotificationIcon type={notification.type.toLowerCase()} />
          </div>
        </div>
      </div>
      <div className="notification-right-side">
        <div className="notification-body">
          <div className="notification-content">
            <p
              dangerouslySetInnerHTML={{ __html: notification.body.content }}
            ></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationWrapper
