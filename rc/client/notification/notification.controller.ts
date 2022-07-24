import { NotificationEvents } from '../../types/events'
import { NotificationDataT } from '../../types/notification'
import NotificationService from './notification.service'

on(NotificationEvents.CREATE_NOTIFICATION, (data: NotificationDataT) => {
  NotificationService.create(data)
})
