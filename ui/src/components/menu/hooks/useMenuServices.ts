import { Menu } from '../../../../../types/menu'
import { createMenu } from '../../../features/menu/menu.slice'
import { useDispatch } from 'react-redux'

const useMenuServices = () => {
  const dispatch = useDispatch()

  const handleCreateMenu = (menu: Menu) => {
    dispatch(createMenu(menu))
  }

  return { handleCreateMenu }
}

export { useMenuServices }
