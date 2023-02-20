import { NotificationData } from '@nx/types'
import { useNotificationStore } from '../../../store/notification'
import { uuid } from '../../../utils/misc'
import { parseNotificationContent } from '../utils/misc'

const useNotificationService = () => {
  const { createNotification, removeNotification } = useNotificationStore()

  const handleRemoveNotification = (duration: number, uuid: string) => {
    setTimeout(() => {
      removeNotification(uuid)
    }, duration * 1000)
  }

  const handleCreateNotification = (notification: NotificationData) => {
    notification.uuid = uuid()
    notification.body.content = parseNotificationContent(
      notification.body.content
    )
    createNotification(notification)
    handleRemoveNotification(notification.duration, notification.uuid)
  }

  return { handleCreateNotification }
}

export { useNotificationService }
