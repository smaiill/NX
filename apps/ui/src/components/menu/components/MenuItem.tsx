import { Checkbox } from '@nx/lib'
import {
  ItemListChoices,
  MenuItem as MenuItemType,
  MenuItemEnum,
} from '@nx/types'
import { Icon } from '../../misc/Icon'

const MenuItem = ({ item, index }: { item: MenuItemType; index: number }) => {
  return (
    <div
      className={`menu__item ${item.type.toLowerCase()} ${
        item.selected ? 'selected' : ''
      }`}
    >
      <span className="label">{item.label ?? ''}</span>

      {item.type === MenuItemEnum.SLIDER && (
        <input
          id={`slider-${index}`}
          min={item.min ?? 0}
          max={item.max ?? 10}
          type="range"
        />
      )}

      {item.type === MenuItemEnum.CHECKBOX && (
        <>
          <Checkbox id={`checkbox-${index}`} />
        </>
      )}

      {item.type === MenuItemEnum.LIST && (
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
  )
}

export { MenuItem }
