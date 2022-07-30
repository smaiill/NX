export enum NotificationMethods {
  CREATE_NOTIFICATION = 'NX::createNotification',
}

export enum NotificationBGColors {
  SUCCES = 'rgba(255, 255, 255, 0.2)',
  WARN = 'rgba(255, 255, 255, 0.2)',
  NORMAL = 'rgba(255, 255, 255, 0.2)',
  ERROR = 'rgba(255, 255, 255, 0.2)',
}

export enum NotificationMainColors {
  SUCCES = '#0B872D',
  WARN = '#ef9400',
  NORMAL = '#006ce4',
  ERROR = '#ec4e2b',
}

export type NotificationTypes = 'SUCCES' | 'WARN' | 'NORMAL' | 'ERROR'

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
