import {
  KeyPressedHandler,
  KeysTypes,
  KeysTypesE,
  Menu,
  MenuItemTypesE,
} from '../../../../../types/menu'
import {
  createMenu,
  hideMenu,
  setSelected,
} from '../../../features/menu/menu.slice'
import { useDispatch } from 'react-redux'

const useMenuServices = () => {
  const dispatch = useDispatch()

  const handleCreateMenu = (menu: Menu) => {
    dispatch(createMenu(menu))
  }

  const handleKeyPressed = (data: KeyPressedHandler) => {
    if (data.key === KeysTypesE.DOWN || data.key === KeysTypesE.UP) {
      return dispatch(setSelected(data.index))
    }

    if (data.type === MenuItemTypesE.SLIDER) {
      // @ts-ignore
      const element: HTMLInputElement = document.getElementById(
        `slider-${data.index}`
      )

      if (data.key === KeysTypesE.LEFT) {
        element.stepDown(1)
      }

      if (data.key === KeysTypesE.RIGHT) {
        element.stepUp(1)
      }
    }

    if (data.type === MenuItemTypesE.CHECKBOX) {
      // @ts-ignore
      const element: HTMLInputElement = document.getElementById(
        `checkbox-${data.index}`
      )
      element.checked = !element.checked
    }

    if (data.type === MenuItemTypesE.LIST) {
      const elements = document.querySelectorAll(`.choices-${data.index}`)

      elements.forEach((element) => element.classList.remove('active'))

      document
        .getElementById(`choice-${data.index}-${data.choiceIndex}`)
        ?.classList.add('active')
    }
  }

  const handleHideMenu = () => {
    dispatch(hideMenu())
  }

  return { handleCreateMenu, handleKeyPressed, handleHideMenu }
}

export { useMenuServices }
