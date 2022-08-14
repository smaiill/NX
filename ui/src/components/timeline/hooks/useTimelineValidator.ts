import { TimelineDataT } from '../../../../../types/timeline'

export const useTimelineValidator = () => {
  const validateCreationData = (data: TimelineDataT) => {
    if (!Array.isArray(data.rows) || data.rows.length < 0) {
      return false
    }

    // ? by ref.
    for (const row of data.rows) {
      if (!row.type) {
        row.type = 'DOT'
      }
    }

    return true
  }

  return { validateCreationData }
}
