import { MenuEventsE } from '../../../../../types/events'
import { NuiAPPS } from '../../../../../types/main'
import { useMenuServices } from './useMenuServices'
import { useNuiEvent } from 'fivem-nui-react-lib'

const useMenuController = () => {
  const { handleCreateMenu } = useMenuServices()

  useNuiEvent(NuiAPPS.MENU, MenuEventsE.CREATE_MENU, handleCreateMenu)
}

export { useMenuController }
