import { KeysTypes, Menu } from '../../../../../types/menu'
import { createMenu, setSelected } from '../../../features/menu/menu.slice'
import { useDispatch } from 'react-redux'

const useMenuServices = () => {
  const dispatch = useDispatch()

  const handleCreateMenu = (menu: Menu) => {
    dispatch(createMenu(menu))
  }

  const handleKeyPressed = (data: any) => {
    dispatch(setSelected(data.index))
  }

  return { handleCreateMenu, handleKeyPressed }
}

export { useMenuServices }
