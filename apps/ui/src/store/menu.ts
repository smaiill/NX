import { Menu } from '@nx/types'
import { create } from 'zustand'

type MenuState = {
  menu: Menu | null
}

interface MenuStoreState extends MenuState {
  createMenu: (menu: Menu) => void
  setSelected: (idx: number) => void
  hideMenu: () => void
}

const useMenuStore = create<MenuStoreState>((set) => ({
  menu: null,

  createMenu: (menu: Menu) => {
    menu.items[0].selected = true
    set((state: MenuState) => ({ ...state, menu }))
  },

  setSelected: (index: number) =>
    set((state: MenuState) => {
      const menu = state.menu

      if (!menu) {
        return state
      }

      menu.items.forEach((item, i) => {
        item.selected = i === index
      })

      return { ...state, menu }
    }),

  hideMenu: () => set((state: MenuState) => ({ ...state, menu: null })),
}))

export { useMenuStore }
