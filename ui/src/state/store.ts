import { configureStore } from '@reduxjs/toolkit'
import inputSlice from '../features/input/input.slice'

export const store = configureStore({
  reducer: {
    input: inputSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
