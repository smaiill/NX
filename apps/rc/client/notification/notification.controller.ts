import { NotificationData, NotificationEvents } from '@nx/types'
import { NotificationService } from './notification.service'

onNet(
  NotificationEvents.CREATE_NOTIFICATION,
  (data: NotificationData): void => {
    NotificationService.create(data)
  }
)
