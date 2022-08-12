import { TimelineDataT } from '../../types/timeline'

class _TimelineUtils {
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

    return { isValid: true, errorMessage: '' }
  }
}

const TimelineUtils = new _TimelineUtils()
export default TimelineUtils
