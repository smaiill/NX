export enum NotificationMethods {
  CREATE_NOTIFICATION = 'NX::createNotification',
}

export enum NotificationBGColors {
  SUCCES = '#ebf7ee',
  WARN = '#fef7ea',
  NORMAL = '#e5effa',
  ERROR = '#fcedea',
}

export enum NotificationMainColors {
  SUCCES = '#3ebd61',
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
