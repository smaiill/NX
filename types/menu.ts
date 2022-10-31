export type MenuItemTypes =
  | 'BUTTON'
  | 'SLIDER'
  | 'LIST'
  | 'CHECKBOX'
  | 'SEPARATOR'

export enum MenuItemTypesE {
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
  LIST = 'LIST',
  CHECKBOX = 'CHECKBOX',
  SEPARATOR = 'SEPARATOR',
}

export interface Menu {
  options: MenuOptions
  items: MenuItem[]
}

export interface MenuOptions {
  title: string
  banner: URL
  width?: number
}

export interface ItemSliderOptions {
  min?: number
  max?: number
}

export interface ItemListOptions {
  choices: string[]
}

export interface MenuItem extends ItemSliderOptions, ItemListOptions {
  type: MenuItemTypes
  label: string
}
