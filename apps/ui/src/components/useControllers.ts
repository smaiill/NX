import { useInputController } from './form/hooks/useInputController'
import { useLoadingBarController } from './loadingbar/hooks/useLoadingBarController'
import { useMenuController } from './menu/hooks/useMenuController'
import { useNotificationController } from './notification/hooks/useNotificationController'
import { useTimelineController } from './timeline/hooks/useTimelineController'

const useControllers = () => {
  useInputController()
  useNotificationController()
  useTimelineController()
  useLoadingBarController()
  useMenuController()
}

export { useControllers }
