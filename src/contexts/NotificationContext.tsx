import { createContext } from "react";
import { Notification } from "../interfaces/notification.interface";

interface NotificationContextType {
  notifications: Notification[];
  setNotifications: (value: Notification[]) => void;
}

export const NotificationContext = createContext<NotificationContextType>({} as NotificationContextType)