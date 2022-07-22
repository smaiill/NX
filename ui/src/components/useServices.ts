import { useInputService } from './input/hooks/useInputService'
import { useNotificationService } from './notification/hooks/useNotificationService'

export const useServices = () => {
  useInputService()
  useNotificationService()
}
