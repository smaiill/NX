export type MenuItemTypes =
  | 'BUTTON'
  | 'SLIDER'
  | 'LIST'
  | 'CHECKBOX'
  | 'SEPARATOR'

export type KeysTypes = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT'

export enum MenuItemTypesE {
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
  LIST = 'LIST',
  CHECKBOX = 'CHECKBOX',
  SEPARATOR = 'SEPARATOR',
}

export enum KeysTypesE {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
}

export interface Menu {
  options: MenuOptions
  items: MenuItem[]
  uuid?: string
  active?: boolean
  itemsLength?: number
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

export interface ItemListOptions {
  choices?: string[]
}

export interface MenuItem extends ItemSliderOptions, ItemListOptions {
  type: MenuItemTypes
  label: string
  selected?: boolean
}

export interface KeyMapping {
  key: string
  description: string
  command: string
  handler: (key: string) => void
}
