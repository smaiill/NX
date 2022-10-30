import { MenuEventsE } from '../../../../../types/events'
import { NuiAPPS } from '../../../../../types/main'
import { useNuiEvent } from 'fivem-nui-react-lib'

const useMenuController = () => {
  useNuiEvent(NuiAPPS.INPUT, MenuEventsE.CREATE_MENU, () => {})
}

export { useMenuController }
