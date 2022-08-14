import { NuiAPP } from '../../../../../types/main'
import { NotificationMethods } from '../../../../../types/notification'
import { useNotificationService } from './useNotificationService'
import { useNuiEvent } from 'fivem-nui-react-lib'

export const useNotificationController = () => {
  const { handleCreateNotification } = useNotificationService()

  useNuiEvent(
    NuiAPP.NOTIFICATION,
    NotificationMethods.CREATE_NOTIFICATION,
    handleCreateNotification
  )
}
