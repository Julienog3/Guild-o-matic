import React, { useCallback, useContext } from 'react';
import { NotificationContext } from '../../../contexts/NotificationContext';
import { Notification } from '../../../interfaces/notification.interface';
import ToasterMessage from './ToasterMessage/ToasterMessage';
import { useTransition } from '@react-spring/web';
import useNotificationStore from '../../../stores/useNotificationStore';

const Toaster = (): JSX.Element => {
  const notifications = useNotificationStore((state) => state.notifications);
  const removeNotification = useNotificationStore(
    (state) => state.removeNotification,
  );

  const handleDelete = useCallback((id: string) => {
    removeNotification(id);
  }, []);

  const transitions = useTransition(notifications, {
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 },
  });

  return (
    <div className="z-50 fixed top-8 left-8 flex flex-col gap-4">
      {transitions((style, item) => (
        <>
          <ToasterMessage
            style={style}
            key={item.id}
            {...item}
            onDelete={(): void => handleDelete(item.id)}
          />
        </>
      ))}
    </div>
  );
};

export default Toaster;
