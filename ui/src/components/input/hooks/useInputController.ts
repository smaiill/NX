import { InputEventsE } from '../../../../../types/events'
import { InputsDataT } from '../../../../../types/input'
import { NuiAPPS } from '../../../../../types/main'
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

  useNuiEvent(NuiAPPS.INPUT, InputEventsE.CREATE_INPUT, handleCreateInputsRow)
  useNuiEvent(NuiAPPS.INPUT, InputEventsE.DESTROY_INPUT, handleDestroyInput)
}
