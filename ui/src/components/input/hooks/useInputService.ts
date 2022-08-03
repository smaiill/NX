import {
  addInvalidInput,
  deleteInputsRow,
} from '../../../features/input/input.slice'
import { InputMethods } from '../../../types/input'
import { RespT } from '../../../types/main'
import { fetchNui } from '../../../utils/fetchNui'
import { useDispatch } from 'react-redux'

export const useInputServices = () => {
  const dispatch = useDispatch()

  const handleSubmitData = async (data: Record<string, any>) => {
    fetchNui(InputMethods.SUBMIT_DATA, {
      status: 'succes',
      data,
    }).then((res: RespT) => {
      if (res.status === 'succes') return dispatch(deleteInputsRow())
    })
  }

  return { handleSubmitData }
}
