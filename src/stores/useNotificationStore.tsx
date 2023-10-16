import { create } from 'zustand';
import {
  Notification,
  NotificationEnum,
} from '../interfaces/notification.interface';

type State = {
  notifications: Notification[],
};

type Action = {
  addNotification: (notificationPayload: {
    type: NotificationEnum,
    message: string,
  }) => void,
  removeNotification: (id: string) => void,
  removeAllNotifications: () => void,
};

const useNotificationStore = create<State & Action>((set) => ({
  notifications: [],
  addNotification: ({ type, message }) =>
    set((state) => ({
      ...state,
      notifications: [
        ...state.notifications,
        {
          id: Date.now().toString(),
          type,
          message,
        },
      ],
    })),
  removeNotification: (id: string) =>
    set((state) => {
      const notificationToRemoveIndex = state.notifications.findIndex(
        (notification) => notification.id === id,
      );

      if (notificationToRemoveIndex !== undefined) {
        const newNotifications = [...state.notifications];
        newNotifications.splice(notificationToRemoveIndex, 1);

        return {
          ...state,
          notifications: newNotifications,
        };
      }

      return state;
    }),
  removeAllNotifications: () => set({ notifications: [] }),
}));

export default useNotificationStore;
