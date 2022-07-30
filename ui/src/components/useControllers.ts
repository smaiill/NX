import { useInputController } from './input/hooks/useInputController'
import useLoadingBarController from './loadingbar/hooks/useLoadingBarController'
import { useNotificationController } from './notification/hooks/useNotificationController'

export const useControllers = () => {
  useInputController()
  useNotificationController()
  useLoadingBarController()
}
