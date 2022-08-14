import { TimelineEventsE } from '../../../../../types/events'
import { NuiAPPS } from '../../../../../types/main'
import { useTimelineService } from './useTimelineService'
import { useNuiEvent } from 'fivem-nui-react-lib'

export const useTimelineController = () => {
  const { handleCreateTimeline, handleUpdateTimeline, handleRemoveTimeline } =
    useTimelineService()

  useNuiEvent(
    NuiAPPS.TIMELINE,
    TimelineEventsE.CREATE_TIMELINE,
    handleCreateTimeline
  )

  useNuiEvent(
    NuiAPPS.TIMELINE,
    TimelineEventsE.UPDATE_TIMELINE,
    handleUpdateTimeline
  )

  useNuiEvent(
    NuiAPPS.TIMELINE,
    TimelineEventsE.DESTROY_TIMELINE,
    handleRemoveTimeline
  )
}
