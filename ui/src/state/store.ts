import inputSlice from '../features/input/input.slice'
import loadingBarSlice from '../features/loadingBar/loadingBar.slice'
import notificationSlice from '../features/notification/notification.slice'
import timelineSlice from '../features/timeline/timeline.slice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    input: inputSlice,
    notification: notificationSlice,
    loadingBar: loadingBarSlice,
    timeline: timelineSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
