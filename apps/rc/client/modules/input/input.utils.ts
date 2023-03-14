import { InputsData } from '@nx/types'

class _InputUtils {
  public isDataValid(
    submitedData: Record<string, HTMLInputElement>,
    validData: InputsData,
  ): { isValid: boolean; message: string } {
    for (const validInput of validData.rows) {
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
export { InputUtils }
