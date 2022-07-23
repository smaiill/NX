import { useDispatch } from 'react-redux'
import {
  createNotification,
  removeNotification,
} from '../../../features/notification/notification.slice'
import { NotificationDataT } from '../../../types/notification'
import { uuid } from '../../../utils/misc'

export const useNotificationService = () => {
  const dispatch = useDispatch()

  const handleRemoveNotification = (duration: number, uuid: string) => {
    console.log(duration * 1000)
    setTimeout(() => {
      dispatch(removeNotification(uuid))
    }, duration * 1000)
  }

  const handleCreateNotification = (notification: NotificationDataT) => {
    notification.uuid = uuid()
    dispatch(createNotification(notification))
    handleRemoveNotification(notification.duration, notification.uuid)
  }

  return { handleCreateNotification }
}
