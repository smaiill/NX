export type NotificationTypes = 'SUCCES' | 'WARN' | 'NORMAL' | 'ERROR'

export interface NotificationDataT {
  type?: NotificationTypes
  duration?: number
  uuid?: string
  body?: {
    content: string
  }
}
