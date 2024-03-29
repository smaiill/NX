import { KeyPressedHandler, Keys, Menu, MenuItemEnum } from '@nx/types'
import { useMenuStore } from '../../../store/menu'

const useMenuServices = () => {
  const { createMenu, setSelected, hideMenu } = useMenuStore()

  const handleCreateMenu = (menu: Menu) => {
    createMenu(menu)
  }

  const handleKeyPressed = (data: KeyPressedHandler) => {
    if (data.key === Keys.DOWN || data.key === Keys.UP) {
      return setSelected(data.index)
    }

    if (data.type === MenuItemEnum.SLIDER) {
      const element = document.getElementById(
        `slider-${data.index}`,
      ) as HTMLInputElement

      if (data.key === Keys.LEFT) {
        element.stepDown(1)
      }

      if (data.key === Keys.RIGHT) {
        element.stepUp(1)
      }
    }

    if (data.type === MenuItemEnum.CHECKBOX) {
      const element = document.getElementById(
        `checkbox-${data.index}`,
      ) as HTMLInputElement
      element.checked = !element.checked
    }

    if (data.type === MenuItemEnum.LIST) {
      const elements = document.querySelectorAll(`.choices-${data.index}`)

      elements.forEach((element) => element.classList.remove('active'))

      document
        .getElementById(`choice-${data.index}-${data.choiceIndex}`)
        ?.classList.add('active')
    }
  }

  const handleHideMenu = () => {
    hideMenu()
  }

  return { handleCreateMenu, handleKeyPressed, handleHideMenu }
}

export { useMenuServices }
