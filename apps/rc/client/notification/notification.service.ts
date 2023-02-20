import { EventsService } from '@events/events.service'
import {
  DefaultData,
  NotificationData,
  NotificationEvents,
  NuiAPPS,
} from '@nx/types'
import { overWriteData } from '@shared/utils/def'

class _NotificationService {
  constructor() {}

  public async create(data: NotificationData): Promise<void> {
    const overWritedData = await overWriteData<NotificationData>(
      DefaultData.NOTIFICATION,
      data
    )

    EventsService.emitNuiEvent<NotificationData>(
      {
        app: NuiAPPS.NOTIFICATION,
        method: NotificationEvents.CREATE_NOTIFICATION,
        data: overWritedData,
      },
      false
    )
  }
}

const NotificationService = new _NotificationService()
export { NotificationService }
