import { TimelineDataT } from '../../../types/timeline'

export const useTimelineValidator = () => {
  const validateCreationData = (data: TimelineDataT) => {
    if (!Array.isArray(data.rows) || data.rows.length < 0) {
      return false
    }

    return true
  }

  return { validateCreationData }
}
