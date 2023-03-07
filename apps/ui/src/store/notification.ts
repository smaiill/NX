import { ICreatedNotification, NotificationSliceState } from '@nx/types'
import { create } from 'zustand'

type NotificationStore = NotificationSliceState & {
  createNotification: (notification: ICreatedNotification) => void
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
        (notification) => notification.uuid !== uuid,
      ),
    })),
}))

export { useNotificationStore }
