import { InputsDataT } from '../../../types/input'

class _InputUtils {
  constructor() {}

  public isDataValid(
    submitedData: any,
    validData: InputsDataT
  ): { isValid: boolean; message: string } {
    for (const validInput of validData.rows) {
      console.log(validInput.required)
      if (
        (validInput.required && !submitedData[validInput.id]) ||
        (validInput.required && submitedData[validInput.id].value.trim() === '')
      ) {
        return { isValid: false, message: `Invalid: [${validInput.label}].` }
      }
    }

    return { isValid: true, message: '' }
  }
}

const InputUtils = new _InputUtils()
export default InputUtils
