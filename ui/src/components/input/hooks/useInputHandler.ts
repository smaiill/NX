import { ChangeEvent, useState } from 'react'

export const useInputHandler = () => {
  const [inputsState, setInputsState] = useState<
    { [key: string]: string; value: string } | {}
  >({})

  const handleInputs = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setInputsState({
      ...inputsState,
      [id]: e.target.value,
    })
  }

  return { handleInputs, inputsState }
}
