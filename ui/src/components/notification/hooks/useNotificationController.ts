import { NotificationEvents } from '../../../../../types/events'
import { NuiAPPS } from '../../../../../types/main'
import { useNotificationService } from './useNotificationService'
import { useNuiEvent } from 'fivem-nui-react-lib'

export const useNotificationController = () => {
  const { handleCreateNotification } = useNotificationService()

  useNuiEvent(
    NuiAPPS.NOTIFICATION,
    NotificationEvents.CREATE_NOTIFICATION,
    handleCreateNotification
  )
}
