import { EventsService } from '@events/events.service'
import { NotificationData, NotificationEvents, NuiAPPS } from '@nx/types'
import { LG } from '@utils/logger'
import {
  createNotificationSchema,
  CreateNotificationType,
} from './notification.schema'

class _NotificationService {
  public async create(notification: CreateNotificationType): Promise<void> {
    const res = createNotificationSchema.safeParse(notification)

    if (!res.success) {
      LG.error(
        `Couldn't create Notification line invalid data: ${JSON.stringify(
          res,
          undefined,
          2,
        )}`,
      )
      return
    }

    const { data } = res

    EventsService.emitNuiEvent<NotificationData>(
      {
        app: NuiAPPS.NOTIFICATION,
        method: NotificationEvents.CREATE_NOTIFICATION,
        data,
      },
      false,
    )
  }
}

const NotificationService = new _NotificationService()
export { NotificationService }
