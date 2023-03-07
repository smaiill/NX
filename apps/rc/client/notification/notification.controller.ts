import { NotificationEvents } from '@nx/types'
import { CreateNotificationType } from './notification.schema'
import { NotificationService } from './notification.service'

onNet(
  NotificationEvents.CREATE_NOTIFICATION,
  (data: CreateNotificationType): void => {
    NotificationService.create(data)
  },
)
