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
      state.menu = action.payload
    },
  },
})

export const { createMenu } = menuSlice.actions
export default menuSlice.reducer
