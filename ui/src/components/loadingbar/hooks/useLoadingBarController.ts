import { LoadingBarEventsE } from '../../../../../types/events'
import { NuiAPPS } from '../../../../../types/main'
import useLoadingBarService from './useLoadingBarService'
import { useNuiEvent } from 'fivem-nui-react-lib'

export const useLoadingBarController = () => {
  const { handleCreateLoadingBar } = useLoadingBarService()

  useNuiEvent(
    NuiAPPS.LOADING_BAR,
    LoadingBarEventsE.CREATE_LOADING_BAR,
    handleCreateLoadingBar
  )
}
