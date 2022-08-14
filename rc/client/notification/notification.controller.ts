import { NotificationEvents } from '../../../types/events'
import { NotificationDataT } from '../../../types/notification'
import NotificationService from './notification.service'

onNet(
  NotificationEvents.CREATE_NOTIFICATION,
  (data: NotificationDataT): void => {
    NotificationService.create(data)
  }
)
