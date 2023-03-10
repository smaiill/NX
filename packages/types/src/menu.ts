export interface KeyPressedHandler {
  key: KeysTypes
  index: number
  type: MenuItemTypes
  choiceIndex?: number
}

export enum MenuItemEnum {
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
  LIST = 'LIST',
  CHECKBOX = 'CHECKBOX',
  SEPARATOR = 'SEPARATOR',
}

export type MenuItemTypes = keyof typeof MenuItemEnum

export enum Keys {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  RETURN = 'RETURN',
  BACK = 'BACK',
}

export type KeysTypes = keyof typeof Keys

export interface IListChoice {
  itemID: number
  actualChoice: {
    id: string
    index: number
  }
  maxChoices: number
}
export interface Menu {
  options: MenuOptions
  items: MenuItem[]
  uuid?: string
  active?: boolean
  itemsLength?: number
  listChoices?: IListChoice[]
}

export interface MenuOptions {
  title: string
  banner: string
  width?: number
}

export interface ItemListChoice {
  label: string
  id: string
}

export interface MenuItemBase {
  label: string
  id: string
  onClick?: (...args: unknown[]) => void
  onChange?: (...args: unknown[]) => void
  selected?: boolean
}

export interface ListMenuItem extends MenuItemBase {
  type: 'LIST'
  choices: ItemListChoice[]
}

export interface ButtonMenuItem extends MenuItemBase {
  type: 'BUTTON'
}

export interface SeparatorMenuItem extends MenuItemBase {
  type: 'SEPARATOR'
}

export interface SliderMenuItem extends MenuItemBase {
  type: 'SLIDER'
  min?: number
  max?: number
}

export interface CheckboxMenuItem extends MenuItemBase {
  type: 'CHECKBOX'
}

export type MenuItem =
  | ButtonMenuItem
  | ListMenuItem
  | SeparatorMenuItem
  | SliderMenuItem
  | CheckboxMenuItem

export interface KeyMapping {
  key: string
  description: string
  command: string
  handler: (key: KeysTypes) => void
}
