import { MenuEventsE } from '../../../../../types/events'
import { NuiAPPS } from '../../../../../types/main'
import { useMenuServices } from './useMenuServices'
import { useNuiEvent } from 'fivem-nui-react-lib'

const useMenuController = () => {
  const { handleCreateMenu, handleKeyPressed, handleHideMenu } =
    useMenuServices()

  useNuiEvent(NuiAPPS.MENU, MenuEventsE.CREATE_MENU, handleCreateMenu)
  useNuiEvent(NuiAPPS.MENU, MenuEventsE.KEY_PRESSED, handleKeyPressed)
  useNuiEvent(NuiAPPS.MENU, MenuEventsE.HIDE_MENU, handleHideMenu)
}

export { useMenuController }
