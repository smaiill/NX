import { InputMethods, InputsDataT } from '../../../../../types/input'
import { NuiAPP } from '../../../../../types/main'
import {
  createInputsRow,
  deleteInputsRow,
} from '../../../features/input/input.slice'
import { useNuiEvent } from 'fivem-nui-react-lib'
import { useDispatch } from 'react-redux'

export const useInputController = () => {
  const dispatch = useDispatch()

  const handleCreateInputsRow = (inputs: InputsDataT) => {
    dispatch(createInputsRow(inputs))
  }

  const handleDestroyInput = () => {
    dispatch(deleteInputsRow())
  }

  useNuiEvent(NuiAPP.INPUT, InputMethods.CREATE_INPUT, handleCreateInputsRow)
  useNuiEvent(NuiAPP.INPUT, InputMethods.DESTROY_INPUT, handleDestroyInput)
}
