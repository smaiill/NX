export enum TimelineUpdateActions {
  SET_COMPLETED = 'SET_COMPLETED',
  SET_UNCOMPLETED = 'SET_UNCOMPLETED',
}

export type TimelineRowTypes = 'DOT' | 'OUTLINE'

export interface UpdateTimelineData {
  type: keyof typeof TimelineUpdateActions
  id: string
}

export interface TimelineRow {
  id: string
  label: string
  completed: boolean
  type: TimelineRowTypes
}

export interface TimelineData {
  rows: TimelineRow[]
}

export interface TimelineStateSlice {
  timeline: {
    rows: TimelineRow[]
  }
}

export interface TimelineState {
  active: boolean
  rows: TimelineRow[]
  completedTasks: any[]
}
