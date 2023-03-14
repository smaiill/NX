import { OnNet } from '@decorators/Event'
import { NotificationEvents } from '@nx/types'
import { CreateNotificationType } from './notification.schema'
import { NotificationService } from './notification.service'

export class NotificationController {
  @OnNet(NotificationEvents.CREATE_NOTIFICATION)
  public handleCreateNotification(data: CreateNotificationType) {
    NotificationService.create(data)
  }
}
