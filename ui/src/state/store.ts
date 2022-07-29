import inputSlice from '../features/input/input.slice'
import notificationSlice from '../features/notification/notification.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    input: inputSlice,
    notification: notificationSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
