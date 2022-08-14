import { InputsDataT } from '../../../types/input'

class _InputUtils {
  constructor() {}

  public isDataValid(
    submitedData: any,
    validData: InputsDataT
  ): [boolean, string] {
    for (const validInput of validData.rows) {
      if (
        (validInput.required && !submitedData[validInput.id]) ||
        submitedData[validInput.id].value.trim() === ''
      ) {
        return [false, `Invalid: ${validInput.label}`]
      }
    }

    return [true, '']
  }
}

const InputUtils = new _InputUtils()
export default InputUtils
