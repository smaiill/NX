import { LoadingBarDataT, LoadingBarState } from '../../types/loadingBar'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: LoadingBarState = {
  loadingBar: null,
}

export const loadingBarSlice = createSlice({
  name: 'loadingBar',
  initialState,
  reducers: {
    createLoadingBar: (state, action: PayloadAction<LoadingBarDataT>) => {
      state.loadingBar = action.payload
    },
    removeLoadingBar: (state, action: PayloadAction<void>) => {
      state.loadingBar = null
    },
  },
})

export const { createLoadingBar, removeLoadingBar } = loadingBarSlice.actions
export default loadingBarSlice.reducer
