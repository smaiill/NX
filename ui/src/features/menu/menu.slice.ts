import { Menu } from '../../../../types/menu'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: { menu: Menu | null } = {
  menu: null,
}

export const menuSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createMenu: (state, action: PayloadAction<Menu>) => {
      action.payload.items[0].selected = true
      state.menu = action.payload
    },

    setSelected: (state, action: PayloadAction<number>) => {
      state.menu?.items.forEach((item, index) => {
        item.selected = false

        if (index === action.payload) {
          item.selected = true
        }
      })
    },
  },
})

export const { createMenu, setSelected } = menuSlice.actions
export default menuSlice.reducer
