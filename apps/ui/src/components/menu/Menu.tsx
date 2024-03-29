import { Container, ContainerPrimary } from '@nx/lib'
import { MenuItem as MenuItemType } from '@nx/types'
import { useMenuStore } from '../../store/menu'
import { MenuHeader } from './components/MenuHeader'
import { MenuItem } from './components/MenuItem'

const Menu = () => {
  const { menu } = useMenuStore()

  return (
    <>
      {menu !== null ? (
        <ContainerPrimary
          style={{ width: menu.options.width }}
          className="menu"
        >
          <MenuHeader banner={menu.options.banner} title={menu.options.title} />
          <Container className="menu__items__wrapper">
            {menu.items.map((item: MenuItemType, index: number) => (
              <MenuItem key={index} item={item} index={index} />
            ))}
          </Container>
        </ContainerPrimary>
      ) : null}
    </>
  )
}

export { Menu }
