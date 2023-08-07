export interface Notification {
  type: NotificationEnum;
  message: string;
}

export enum NotificationEnum {
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  SUCCESS = 'success',
}
