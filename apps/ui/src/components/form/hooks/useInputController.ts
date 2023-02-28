import { InputEvents, InputsData, NuiAPPS } from '@nx/types'
import { useNuiEvent } from 'fivem-nui-react-lib'
import { useInputStore } from '../../../store/input'

const useInputController = () => {
  const { deleteInputsRow, createInputsRow } = useInputStore()

  const handleCreateInputsRow = (inputs: InputsData) => {
    createInputsRow(inputs)
  }

  const handleDestroyInput = () => {
    deleteInputsRow()
  }

  useNuiEvent(NuiAPPS.INPUT, InputEvents.CREATE_INPUT, handleCreateInputsRow)
  useNuiEvent(NuiAPPS.INPUT, InputEvents.DESTROY_INPUT, handleDestroyInput)
}

export { useInputController }
