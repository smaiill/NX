import { MenuItem, MenuItemTypesE } from '../../../../types/menu'
import { useEffect } from 'react'
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
          <div className="menu-header">
            <h2>{menuState.options.title}</h2>
            <img src={menuState.options.banner} alt="" />
          </div>

          <div className="menu-items-wrapper">
            {menuState.items.map((item: MenuItem, index: number) => (
              <div
                key={index}
                className={`menu-item ${item.type.toLowerCase()} ${
                  item.selected ? 'selected' : ''
                }`}
              >
                <span className="label">{item.label}</span>

                {item.type === MenuItemTypesE.SLIDER && (
                  <input
                    min={item.min ?? 0}
                    max={item.max ?? 10}
                    type="range"
                  />
                )}

                {item.type === MenuItemTypesE.CHECKBOX && (
                  <>
                    <span className="checkbox-style">
                      <input type="checkbox" />
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}

export default Menu
