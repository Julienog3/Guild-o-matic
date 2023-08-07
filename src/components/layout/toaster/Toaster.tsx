import React, { useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext';
import { Notification } from '../../../interfaces/notification.interface';
import ToasterMessage from './ToasterMessage';

const Toaster = (): JSX.Element => {
  const { notifications, setNotifications } = useContext(NotificationContext);

  const handleDelete = (index: number) => {
    const newNotification = [...notifications];
    newNotification.splice(index, 1);
    setNotifications(newNotification);
  };

  return (
    <div className="z-50 fixed top-8 left-8 flex flex-col gap-4">
      {notifications &&
        notifications.map((notification: Notification, index: number) => {
          return (
            <ToasterMessage
              key={index}
              {...notification}
              onDelete={(): void => handleDelete(index)}
            />
          );
        })}
    </div>
  );
};

export default Toaster;
