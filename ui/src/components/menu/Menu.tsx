import { MenuItem as MenuItemType } from '../../../../types/menu'
import MenuHeader from './components/MenuHeader'
import MenuItem from './components/MenuItem'
import { useSelector } from 'react-redux'

const Menu = () => {
  const menuState = useSelector((state: any) => state.menu.menu)

  return (
    <>
      {menuState !== null && (
        <div
          style={{ width: menuState.options.width }}
          className="menu-wrapper"
        >
          <MenuHeader
            banner={menuState.options.banner}
            title={menuState.options.title}
          />
          <div className="menu-items-wrapper">
            {menuState.items.map((item: MenuItemType, index: number) => (
              <MenuItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Menu
