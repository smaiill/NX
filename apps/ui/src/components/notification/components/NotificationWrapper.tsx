import { NotificationBGColors, NotificationData } from '@nx/types'
import { Icon } from '../../misc/Icon'

const NotificationWrapper = ({
  notification,
}: {
  notification: NotificationData
}) => {
  return (
    <div
      style={{
        backgroundColor: NotificationBGColors[notification.type],
      }}
      id={notification.uuid}
      className="notification-wrapper"
    >
      <div className="noise__bg"></div>
      <div className="notification-left-side">
        <div className="notification-icon-wrapper">
          <div className="notification-row">
            <Icon size={20} name={notification.type.toLowerCase()} />
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

export { NotificationWrapper }
