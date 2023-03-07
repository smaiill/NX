import { NotificationEvents, NuiAPPS } from '@nx/types'
import { useNuiEvent } from 'fivem-nui-react-lib'
import { useNotificationService } from './useNotificationService'

const useNotificationController = () => {
  const { handleCreateNotification } = useNotificationService()

  useNuiEvent(
    NuiAPPS.NOTIFICATION,
    NotificationEvents.CREATE_NOTIFICATION,
    handleCreateNotification,
  )
}

export { useNotificationController }
