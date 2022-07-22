import { useInputController } from './input/hooks/useInputController'
import { useNotificationController } from './notification/hooks/useNotificationController'

export const useControllers = () => {
  useInputController()
  useNotificationController()
}
