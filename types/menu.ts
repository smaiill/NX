export type MenuItemTypes = 'BUTTON' | 'SLIDER' | 'LIST' | 'CHECKBOX'

export enum MenuItemTypesE {
  BUTTON = 'BUTTON',
  SLIDER = 'SLIDER',
  LIST = 'LIST',
  CHECKBOX = 'CHECKBOX',
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

export interface MenuItem extends ItemSliderOptions {
  type: MenuItemTypes
  label: string
}
