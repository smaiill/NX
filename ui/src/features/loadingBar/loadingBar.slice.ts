import {
  NotificationDataT,
  NotificationSliceState,
} from '../../types/notification'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: any = {
  loadingBar: null,
}

export const loadingBarSlice = createSlice({
  name: 'loadingBar',
  initialState,
  reducers: {
    createLoadingBar: (state, action: PayloadAction<any>) => {
      state.loadingBar = action.payload.duration
    },
  },
})

export const { createLoadingBar } = loadingBarSlice.actions
export default loadingBarSlice.reducer
