import { ChangeEvent, useState } from 'react'

export const useInputHandler = () => {
  const [inputsState, setInputsState] = useState<
    { [key: string]: string; value: string } | {}
  >({})

  const handleInputs = (e: ChangeEvent, id: string) => {
    setInputsState({
      ...inputsState,
      // @ts-ignore
      [id]: e.target.value,
    })
  }

  return { handleInputs, inputsState }
}
