import { Menu } from '@nx/types'
import create from 'zustand'

type MenuState = {
  menu: Menu | null
}

const useMenuStore = create<any>((set: any) => ({
  menu: null,

  createMenu: (menu: Menu) => {
    menu.items[0].selected = true
    set((state: MenuState) => ({ ...state, menu }))
  },

  setSelected: (index: number) =>
    set((state: MenuState) => {
      const menu = state.menu
      if (menu) {
        menu.items.forEach((item, i) => {
          item.selected = i === index
        })
        return { ...state, menu }
      }
      return state
    }),

  hideMenu: () => set((state: MenuState) => ({ ...state, menu: null })),
}))

export { useMenuStore }
