import { InputEventsE } from '../../../../../types/events'
import { RespT } from '../../../../../types/main'
import {
  addInvalidInputs,
  deleteInputsRow,
  deleteInvalidInputs,
} from '../../../features/input/input.slice'
import { fetchNui } from '../../../utils/fetchNui'
import { useDispatch } from 'react-redux'

export const useInputServices = () => {
  const dispatch = useDispatch()

  const handleSubmitData = async (data: Record<string, any>) => {
    fetchNui(InputEventsE.SUBMIT_DATA, {
      status: 'succes',
      data,
    }).then((res: RespT) => {
      if (res.status === 'succes') {
        dispatch(deleteInvalidInputs())
        dispatch(deleteInputsRow())

        return
      }

      dispatch(addInvalidInputs(res.message))
    })
  }

  return { handleSubmitData }
}
