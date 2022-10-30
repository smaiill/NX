export type MenuItemTypes = 'BUTTON' | 'SLIDER' | 'LIST' | 'CHECKBOX'

export interface Menu {
  options: MenuOptions
  items: MenuItem[]
}

export interface MenuOptions {
  title: string
  banner: URL
}

export interface MenuItem {
  type: MenuItemTypes
}
