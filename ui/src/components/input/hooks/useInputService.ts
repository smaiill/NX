import { InputMethods } from '../../../../../types/input'
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
    fetchNui(InputMethods.SUBMIT_DATA, {
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
