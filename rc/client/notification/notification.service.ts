import { NotificationEvents } from '../../../types/events'
import { NuiAPPS } from '../../../types/main'
import { DefaultDataT } from '../../../types/misc'
import { NotificationDataT } from '../../../types/notification'
import EventsService from '@events/events.service'
import { overWriteData } from '@shared/utils/def'

class NotificationService {
  constructor() {}

  public async create(data: NotificationDataT): Promise<void> {
    const overWritedData = await overWriteData<NotificationDataT>(
      DefaultDataT.NOTIFICATION,
      data
    )

    EventsService.emitNuiEvent<NotificationDataT>(
      {
        app: NuiAPPS.NOTIFICATION,
        method: NotificationEvents.CREATE_NOTIFICATION,
        data: overWritedData,
      },
      false
    )
  }
}

export default new NotificationService()
