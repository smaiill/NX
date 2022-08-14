import { InputRowT } from '../../../../../types/input'
import { useState } from 'react'

export const useInputHandler = () => {
  const [inputsState, setInputsState] = useState<
    { [key: string]: string; value: any } | {}
  >({})

  const handleInputs = (value: string, inputData: InputRowT) => {
    setInputsState({
      ...inputsState,
      [inputData.id]: {
        ...inputData,
        value,
      },
    })
  }

  return { handleInputs, inputsState }
}
