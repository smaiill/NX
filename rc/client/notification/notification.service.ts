import EventsService from 'c@events/events.service'
import { NotificationEvents } from '../../types/events'
import { NuiAPP } from '../../types/main'
import { NotificationDataT } from '../../types/notification'

class _NotificationService {
  constructor() {}

  create(data: NotificationDataT): void {
    EventsService.emitNuiEvent(
      {
        app: NuiAPP.NOTIFICATION,
        method: NotificationEvents.CREATE_NOTIFICATION,
        data,
      },
      false
    )
  }
}

const NotificationService = new _NotificationService()
export default NotificationService
