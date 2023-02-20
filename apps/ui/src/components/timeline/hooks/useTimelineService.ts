import {
  TimelineData,
  TimelineUpdateActions,
  UpdateTimelineData,
} from '@nx/types'
import { useTimelineStore } from '../../../store/timeline'
import { useTimelineValidator } from './useTimelineValidator'

const useTimelineService = () => {
  const { createTimeline, removeTimeline, setCompleted, setUncompleted } =
    useTimelineStore()

  const { validateCreationData } = useTimelineValidator()

  const handleCreateTimeline = (timeline: TimelineData) => {
    const isValid = validateCreationData(timeline)

    if (!isValid) return

    createTimeline(timeline)
  }

  const handleUpdateTimeline = (data: UpdateTimelineData) => {
    switch (data.type) {
      case TimelineUpdateActions.SET_COMPLETED:
        setCompleted(data)
        break
      case TimelineUpdateActions.SET_UNCOMPLETED:
        setUncompleted(data)
        break
      default:
        break
    }
  }

  const handleRemoveTimeline = () => {
    removeTimeline()
  }

  return { handleCreateTimeline, handleUpdateTimeline, handleRemoveTimeline }
}

export { useTimelineService }
