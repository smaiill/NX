import { InputRow } from '@nx/types'
import { useState } from 'react'

const useInputHandler = () => {
  const [inputsState, setInputsState] = useState<
    { [key: string]: string; value: string } | object
  >({})

  const handleInputs = (value: string, inputData: InputRow) => {
    setInputsState({
      ...inputsState,
      [inputData.id]: {
        ...inputData,
        value,
      },
    })
  }

  const clearInputs = () => setInputsState({})

  return { handleInputs, inputsState, clearInputs }
}

export { useInputHandler }
