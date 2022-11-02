import { TimelineDataT } from '../../../types/timeline'

class TimelineUtils {
  constructor() {}

  validateCreationData(data: TimelineDataT): {
    isValid: boolean
    errorMessage: string
  } {
    if (!Array.isArray(data.rows) || data.rows.length === 0) {
      return { isValid: false, errorMessage: 'Array was not detected !' }
    }

    const rowsIDS = data.rows.map((row) => row.id)
    const nonDuplicateArray = [...new Set(rowsIDS)]

    if (rowsIDS.length !== nonDuplicateArray.length) {
      return { isValid: false, errorMessage: 'Duplicated ID was detected  !' }
    }

    for (const row of data.rows) {
      if (!row.type) {
        row.type = 'DOT'
      }
    }

    return { isValid: true, errorMessage: '' }
  }
}

export default new TimelineUtils()
