import { NuiAPPS, TimelineEvents } from '@nx/types'
import { useNuiEvent } from 'fivem-nui-react-lib'
import { useTimelineService } from './useTimelineService'

const useTimelineController = () => {
  const { handleCreateTimeline, handleUpdateTimeline, handleRemoveTimeline } =
    useTimelineService()

  useNuiEvent(
    NuiAPPS.TIMELINE,
    TimelineEvents.CREATE_TIMELINE,
    handleCreateTimeline,
  )

  useNuiEvent(
    NuiAPPS.TIMELINE,
    TimelineEvents.UPDATE_TIMELINE,
    handleUpdateTimeline,
  )

  useNuiEvent(
    NuiAPPS.TIMELINE,
    TimelineEvents.DESTROY_TIMELINE,
    handleRemoveTimeline,
  )
}

export { useTimelineController }
