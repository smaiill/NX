import {
  TimelineDataT,
  TimelineUpdateActions,
  UpdateTimelineData,
} from '../../../../../types/timeline'
import {
  createTimeline,
  removeTimeline,
  setCompleted,
  setUncompleted,
} from '../../../features/timeline/timeline.slice'
import { useTimelineValidator } from './useTimelineValidator'
import { useDispatch } from 'react-redux'

export const useTimelineService = () => {
  const dispatch = useDispatch()

  const { validateCreationData } = useTimelineValidator()

  const handleCreateTimeline = (timeline: TimelineDataT) => {
    const isValid = validateCreationData(timeline)

    if (!isValid) return

    dispatch(createTimeline(timeline))
  }

  const handleUpdateTimeline = (data: UpdateTimelineData) => {
    switch (data.type) {
      case TimelineUpdateActions.SET_COMPLETED:
        dispatch(setCompleted(data))
        break
      case TimelineUpdateActions.SET_UNCOMPLETED:
        dispatch(setUncompleted(data))
        break
      default:
        break
    }
  }

  const handleRemoveTimeline = () => {
    dispatch(removeTimeline())
  }

  return { handleCreateTimeline, handleUpdateTimeline, handleRemoveTimeline }
}
