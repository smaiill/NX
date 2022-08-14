export enum TimelineUpdateActions {
  SET_COMPLETED = 'SET_COMPLETED',
  SET_UNCOMPLETED = 'SET_UNCOMPLETED',
}

export interface UpdateTimelineData {
  type: keyof typeof TimelineUpdateActions
  id: string
}

export interface TimelineRowT {
  id: string
  label: string
  completed: boolean
  type: 'DOT' | 'OUTLINE'
}

export interface TimelineDataT {
  rows: TimelineRowT[]
}

export interface TimelineState {
  active: boolean
  rows: TimelineRowT[]
  completedTasks: any[]
}
