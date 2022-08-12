import {
  TimelineDataT,
  TimelineStateT,
  UpdateTimelineData,
} from '../../types/timeline'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

const initialState: TimelineStateT = {
  timeline: {
    rows: [],
  },
}

export const timelineSlice = createSlice({
  name: 'timeline',
  initialState,
  reducers: {
    createTimeline: (state, action: PayloadAction<TimelineDataT>) => {
      state.timeline = action.payload
    },

    setCompleted: (state, action: PayloadAction<UpdateTimelineData>) => {
      const row = state.timeline.rows.find(
        (row) => row.id === action.payload.id
      )
      if (!row) return
      row.completed = true
    },

    setUncompleted: (state, action: PayloadAction<UpdateTimelineData>) => {
      const row = state.timeline.rows.find(
        (row) => row.id === action.payload.id
      )
      if (!row) return
      row.completed = false
    },

    removeTimeline: (state) => {
      state.timeline = {
        rows: [],
      }
    },
  },
})

export const { createTimeline, setCompleted, setUncompleted, removeTimeline } =
  timelineSlice.actions
export default timelineSlice.reducer
