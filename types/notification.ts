export type NotificationTypes = 'SUCCES' | 'WARN' | 'NORMAL' | 'ERROR'

export enum NotificationBGColors {
  SUCCES = 'rgba(11, 135, 45, 0.3)',
  WARN = 'rgba(239, 148, 0, 0.3)',
  NORMAL = 'rgba(0, 108, 228, 0.3)',
  ERROR = 'rgba(236, 78, 43, 0.3)',
}

export enum NotificationMainColors {
  SUCCES = '#0B872D',
  WARN = '#ef9400',
  NORMAL = '#006ce4',
  ERROR = '#ec4e2b',
}

export enum NotificationColorsReplace {
  CLOSE = 0,
  RED = 1,
  ORANGE = 2,
  YELLOW = 3,
  GREEN = 4,
  CYAN = 5,
  BLUE = 6,
  PURPLE = 7,
}

export interface NotificationDataT {
  type: NotificationTypes
  duration: number
  uuid?: string
  body: {
    content: string
  }
}

export interface NotificationSliceState {
  notifications: any
}
