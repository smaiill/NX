import { NotificationData, NotificationSliceState } from '@nx/types'
import { create } from 'zustand'

type NotificationStore = NotificationSliceState & {
  createNotification: (notification: NotificationData) => void
  removeNotification: (uuid: string) => void
}

const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  createNotification: (notification) =>
    set((state) => ({
      notifications: [...state.notifications, notification],
    })),
  removeNotification: (uuid) =>
    set((state) => ({
      notifications: state.notifications.filter(
        (noti: any) => noti.uuid !== uuid
      ),
    })),
}))

export { useNotificationStore }
