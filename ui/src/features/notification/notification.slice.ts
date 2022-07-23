import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  NotificationDataT,
  NotificationSliceState,
} from '../../types/notification'

const initialState: NotificationSliceState = {
  notifications: [],
}

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification: (state, action: PayloadAction<NotificationDataT>) => {
      state.notifications = [...state.notifications, action.payload]
    },

    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (noti: any) => noti.uuid !== action.payload
      )
    },
  },
})

export const { createNotification, removeNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
