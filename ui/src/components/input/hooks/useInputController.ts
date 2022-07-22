import { useNuiEvent } from 'fivem-nui-react-lib'
import { createInputsRow } from '../../../features/input/input.slice'
import { InputMethods, InputsDataT } from '../../../types/input'
import { NuiAPP } from '../../../types/main'
import { useDispatch } from 'react-redux'

export const useInputController = () => {
  const dispatch = useDispatch()

  const handleCreateInputsRow = async (inputs: InputsDataT) => {
    dispatch(createInputsRow(inputs))
  }

  useNuiEvent(NuiAPP.INPUT, InputMethods.CREATE_INPUT, handleCreateInputsRow)
}
