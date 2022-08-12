import { useInputController } from './input/hooks/useInputController'
import {useLoadingBarController} from './loadingbar/hooks/useLoadingBarController'
import { useNotificationController } from './notification/hooks/useNotificationController'
import { useTimelineController } from './timeline/hooks/useTimelineController'

export const useControllers = () => {
  useInputController()
  useNotificationController()
  useTimelineController()
  useLoadingBarController()
}
