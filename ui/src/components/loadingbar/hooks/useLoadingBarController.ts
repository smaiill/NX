import { LoadingBarMethods } from '../../../types/loadingBar'
import { NuiAPP } from '../../../types/main'
import useLoadingBarService from './useLoadingBarService'
import { useNuiEvent } from 'fivem-nui-react-lib'

export const useLoadingBarController = () => {
  const { handleCreateLoadingBar } = useLoadingBarService()

  useNuiEvent(
    NuiAPP.LOADING_BAR,
    LoadingBarMethods.CREATE_LOADING_BAR,
    handleCreateLoadingBar
  )
}
