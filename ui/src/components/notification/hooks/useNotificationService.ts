import {
  createNotification,
  removeNotification,
} from '../../../features/notification/notification.slice'
import {
  NotificationColorsReplace,
  NotificationDataT,
} from '../../../types/notification'
import { uuid } from '../../../utils/misc'
import { getTextColor, parseNotificationContent } from '../utils/misc'
import { useDispatch } from 'react-redux'

export const useNotificationService = () => {
  const dispatch = useDispatch()

  const handleRemoveNotification = (duration: number, uuid: string) => {
    setTimeout(() => {
      dispatch(removeNotification(uuid))
    }, duration * 1000)
  }

  const handleCreateNotification = (notification: NotificationDataT) => {
    notification.uuid = uuid()
    notification.body.content = parseNotificationContent(
      notification.body.content
    )
    dispatch(createNotification(notification))
    handleRemoveNotification(notification.duration, notification.uuid)
  }

  return { handleCreateNotification }
}
