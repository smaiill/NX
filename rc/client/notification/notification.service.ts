import { NotificationEvents } from '../../../types/events'
import { NuiAPP } from '../../../types/main'
import { DefaultDataT } from '../../../types/misc'
import { NotificationDataT } from '../../../types/notification'
import { overWriteData } from '@shared/utils/def'
import EventsService from 'c@events/events.service'

class _NotificationService {
  constructor() {}

  public async create(data: NotificationDataT): Promise<void> {
    const overRidedData = await overWriteData<NotificationDataT>(
      DefaultDataT.NOTIFICATION,
      data
    )

    EventsService.emitNuiEvent(
      {
        app: NuiAPP.NOTIFICATION,
        method: NotificationEvents.CREATE_NOTIFICATION,
        data: overRidedData,
      },
      false
    )
  }
}

const NotificationService = new _NotificationService()
export default NotificationService
