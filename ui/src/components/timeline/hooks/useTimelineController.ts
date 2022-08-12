import { NuiAPP } from '../../../types/main'
import { TimelineMethods } from '../../../types/timeline'
import { useTimelineService } from './useTimelineService'
import { useNuiEvent } from 'fivem-nui-react-lib'

export const useTimelineController = () => {
  const { handleCreateTimeline, handleUpdateTimeline } = useTimelineService()

  useNuiEvent(
    NuiAPP.TIMELINE,
    TimelineMethods.CREATE_TIMELINE,
    handleCreateTimeline
  )

  useNuiEvent(
    NuiAPP.TIMELINE,
    TimelineMethods.UPDATE_TIMELINE,
    handleUpdateTimeline
  )
}
