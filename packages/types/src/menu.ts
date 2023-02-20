export type MenuItemTypes =
  | 'BUTTON'
  | 'SLIDER'
  | 'LIST'
  | 'CHECKBOX'
  | 'SEPARATOR'

export type KeysTypes = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT' | 'RETURN' | 'BACK'

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

export enum Keys {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  RETURN = 'RETURN',
  BACK = 'BACK',
}

export interface Menu {
  options: MenuOptions
  items: MenuItem[]
  uuid?: string
  active?: boolean
  itemsLength?: number
  listChoices?: any
}

export interface MenuOptions {
  title: string
  banner: string
  width?: number
}

export interface ItemSliderOptions {
  min?: number
  max?: number
}

export interface ItemListChoices {
  label: string
  id: string
}

export interface ItemListOptions {
  choices?: ItemListChoices[]
}

export interface MenuItem extends ItemSliderOptions, ItemListOptions {
  type: MenuItemTypes
  label: string
  id: string
  selected?: boolean
  onClick?: Function
  onChange?: Function
}

export interface KeyMapping {
  key: string
  description: string
  command: string
  handler: (key: string) => void
}
