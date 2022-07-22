import { useNuiEvent } from 'fivem-nui-react-lib'
import { InputMethods } from '../../../types/input'
import { NuiAPP } from '../../../types/main'

export const useInputService = () => {
  const createInput = () => {
    console.log('')
  }

  useNuiEvent(NuiAPP.INPUT, InputMethods.CREATE_INPUT, createInput)
}
