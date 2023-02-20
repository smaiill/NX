import { TimelineData } from '@nx/types'

const useTimelineValidator = () => {
  const validateCreationData = (data: TimelineData) => {
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

export { useTimelineValidator }
