import React, { useContext, useEffect } from 'react';
import {
  Notification,
  NotificationEnum,
} from '../../../interfaces/notification.interface';
import { AiFillInfoCircle } from 'react-icons/ai';
import { IoIosWarning, IoMdClose } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdDangerous } from 'react-icons/md';
import { NotificationContext } from '../../../contexts/NotificationContext';

interface ToasterMessageProps {
  type: NotificationEnum;
  message: string;
  onDelete: () => void;
}

const getNotificationTypeStyle = (type: NotificationEnum): string => {
  switch (type) {
    case NotificationEnum.DANGER:
      return 'text-red border-red';

    case NotificationEnum.INFO:
      return 'text-accent-blue border-accent-blue ';

    case NotificationEnum.SUCCESS:
      return 'text-green border-green ';

    case NotificationEnum.WARNING:
      return 'text-yellow-500 border-yellow-500';

    default:
      return '';
  }
};

const getTypeBackground = (type: NotificationEnum): string => {
  switch (type) {
    case NotificationEnum.DANGER:
      return 'bg-red';

    case NotificationEnum.INFO:
      return 'bg-accent-blue ';

    case NotificationEnum.SUCCESS:
      return 'bg-green ';

    case NotificationEnum.WARNING:
      return 'bg-yellow-500';

    default:
      return '';
  }
};

const getIconType = (type: NotificationEnum): JSX.Element | undefined => {
  switch (type) {
    case NotificationEnum.DANGER:
      return <MdDangerous className="text-2xl" />;

    case NotificationEnum.INFO:
      return <AiFillInfoCircle className="text-2xl" />;

    case NotificationEnum.SUCCESS:
      return <BsFillCheckCircleFill className="text-2xl" />;

    case NotificationEnum.WARNING:
      return <IoIosWarning className="text-2xl" />;

    default:
      return undefined;
  }
};

const ToasterMessage = ({
  type,
  message,
  onDelete,
}: ToasterMessageProps): JSX.Element => {
  return (
    <div
      className={`flex relative overflow-hidden items-center gap-4 border rounded-md justify-between bg-light-blue min-w-[250px] p-4 ${getNotificationTypeStyle(
        type,
      )}`}
    >
      <span
        className={`absolute top-0 left-0 h-full w-1 ${getTypeBackground(
          type,
        )}`}
      ></span>
      <div className="flex gap-4">
        {getIconType(type)} {message}
      </div>
      <button
        onClick={(): void => onDelete()}
        className="border-0 text-white text-lg rounded-md hover:bg-bg-blue p-2"
      >
        <IoMdClose />
      </button>
    </div>
  );
};

export default ToasterMessage;
