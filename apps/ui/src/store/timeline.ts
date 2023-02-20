import { TimelineData, UpdateTimelineData } from '@nx/types'
import create from 'zustand'

type TimelineSliceState = {
  timeline: TimelineData
  createTimeline: (timeline: TimelineData) => void
  setCompleted: (timelineData: UpdateTimelineData) => void
  setUncompleted: (timelineData: UpdateTimelineData) => void
  removeTimeline: () => void
}

const useTimelineStore = create<TimelineSliceState>((set) => ({
  timeline: {
    rows: [],
  },
  createTimeline: (timeline) => set(() => ({ timeline })),
  setCompleted: ({ id }) =>
    set(({ timeline }) => {
      const row = timeline.rows.find((row) => row.id === id)
      if (row) {
        row.completed = true
      }
      return { timeline }
    }),
  setUncompleted: ({ id }) =>
    set(({ timeline }) => {
      const row = timeline.rows.find((row) => row.id === id)
      if (row) {
        row.completed = false
      }
      return { timeline }
    }),
  removeTimeline: () => set(() => ({ timeline: { rows: [] } })),
}))

export { useTimelineStore }
