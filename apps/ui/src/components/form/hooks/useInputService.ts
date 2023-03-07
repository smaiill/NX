import { InputEvents, Response } from '@nx/types'
import { useInputStore } from '../../../store/input'
import { fetchNui } from '../../../utils/fetchNui'

const useInputServices = () => {
  const { deleteInvalidInputs, deleteInputsRow, addInvalidInputs } =
    useInputStore()

  const handleSubmitData = async (data: Record<string, any>) => {
    fetchNui(InputEvents.SUBMIT_DATA, {
      ok: true,
      data,
    }).then((res: Response) => {
      if (res.ok) {
        deleteInvalidInputs()
        deleteInputsRow()
        return
      }

      addInvalidInputs(res.message as string)
    })
  }

  return { handleSubmitData }
}

export { useInputServices }
