import { MenuEvents, NuiAPPS } from '@nx/types'
import { useNuiEvent } from 'fivem-nui-react-lib'
import { useMenuServices } from './useMenuServices'

const useMenuController = () => {
  const { handleCreateMenu, handleKeyPressed, handleHideMenu } =
    useMenuServices()

  useNuiEvent(NuiAPPS.MENU, MenuEvents.CREATE_MENU, handleCreateMenu)
  useNuiEvent(NuiAPPS.MENU, MenuEvents.KEY_PRESSED, handleKeyPressed)
  useNuiEvent(NuiAPPS.MENU, MenuEvents.HIDE_MENU, handleHideMenu)
}

export { useMenuController }
