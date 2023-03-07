import { LoadingBarEvents, NuiAPPS } from '@nx/types'
import { useNuiEvent } from 'fivem-nui-react-lib'
import { useLoadingBarService } from './useLoadingBarService'

const useLoadingBarController = () => {
  const { handleCreateLoadingBar } = useLoadingBarService()

  useNuiEvent(
    NuiAPPS.LOADING_BAR,
    LoadingBarEvents.CREATE_LOADING_BAR,
    handleCreateLoadingBar,
  )
}

export { useLoadingBarController }
