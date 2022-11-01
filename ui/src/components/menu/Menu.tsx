import {
  ItemListChoices,
  MenuItem,
  MenuItemTypesE,
} from '../../../../types/menu'
import Icon from '../misc/Icon'
import { createRef, useEffect, useRef } from 'react'
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
          <div
            style={{ backgroundImage: `url("${menuState.options.banner}")` }}
            className="menu-header"
          >
            <h2>{menuState.options.title}</h2>
          </div>

          <div className="menu-items-wrapper">
            {menuState.items.map((item: MenuItem, index: number) => (
              <div
                key={index}
                className={`menu-item ${item.type.toLowerCase()} ${
                  item.selected ? 'selected' : ''
                }`}
              >
                <span className="label">{item.label ?? ''}</span>

                {item.type === MenuItemTypesE.SLIDER && (
                  <input
                    id={`slider-${index}`}
                    min={item.min ?? 0}
                    max={item.max ?? 10}
                    type="range"
                  />
                )}

                {item.type === MenuItemTypesE.CHECKBOX && (
                  <>
                    <span className="checkbox-style">
                      <input id={`checkbox-${index}`} type="checkbox" />
                    </span>
                  </>
                )}

                {item.type === MenuItemTypesE.LIST && (
                  <div className="list-choices-container">
                    <Icon name="chevron-right" size={12} />
                    <>
                      {item.choices?.map(
                        (choice: ItemListChoices, choiceIndex: number) => (
                          <span
                            className={`choices-${index} choice ${
                              choiceIndex === 0 ? 'active' : ''
                            }`}
                            id={`choice-${index}-${choiceIndex}`}
                            key={`choice-key-${index}-${choiceIndex}`}
                          >
                            {choice.label}
                          </span>
                        )
                      )}
                    </>
                    <Icon name="chevron-left" size={12} />
                  </div>
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
