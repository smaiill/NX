import { createLoadingBar } from '../../../features/loadingBar/loadingBar.slice'
import { LoadingBarMethods } from '../../../types/loadingBar'
import { NuiAPP } from '../../../types/main'
import useLoadingBarService from './useLoadingBarService'
import { useNuiEvent } from 'fivem-nui-react-lib'
import { useDispatch } from 'react-redux'

const useLoadingBarController = () => {
  const { handleCreateLoadingBar } = useLoadingBarService()

  useNuiEvent(
    NuiAPP.LOADING_BAR,
    LoadingBarMethods.CREATE_LOADING_BAR,
    handleCreateLoadingBar
  )
}

export default useLoadingBarController
