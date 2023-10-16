/* eslint-disable react/prop-types */
import React, { memo, useEffect } from 'react';
import { NotificationEnum } from '../../../interfaces/notification.interface';
import { AiFillInfoCircle } from 'react-icons/ai';
import { IoIosWarning, IoMdClose } from 'react-icons/io';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { MdDangerous } from 'react-icons/md';
import { useSpring, animated, SpringValue } from '@react-spring/web';

interface ToasterMessageProps {
  type: NotificationEnum;
  message: string;
  style?: any;
  onDelete: () => void;
}

const getNotificationTypeStyle = (type: NotificationEnum): string => {
  switch (type) {
    case NotificationEnum.DANGER:
      return 'text-red';

    case NotificationEnum.INFO:
      return 'text-accent-blue';

    case NotificationEnum.SUCCESS:
      return 'text-green';

    case NotificationEnum.WARNING:
      return 'text-yellow-500';

    default:
      return '';
  }
};

const getTypeBackground = (type: NotificationEnum): string => {
  switch (type) {
    case NotificationEnum.DANGER:
      return 'bg-red';

    case NotificationEnum.INFO:
      return 'bg-accent-blue';

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

const ToasterMessage = memo(function ToasterMessage({
  type,
  message,
  style,
  onDelete,
}: ToasterMessageProps): JSX.Element {
  const DURATION = 4000;

  const props = useSpring({
    from: { width: 0 },
    to: { width: 100 },
    config: {
      duration: DURATION,
    },
  });

  useEffect(() => {
    const selfDeleteTimeout = setTimeout(() => {
      onDelete();
    }, DURATION);

    return () => {
      clearTimeout(selfDeleteTimeout);
    };
  }, []);

  return (
    <animated.div
      style={style}
      className={`flex flex-col relative overflow-hidden  gap-4 border border-light-blue rounded-md justify-between bg-bg-blue min-w-[250px] max-w-[400px] p-4 ${getNotificationTypeStyle(
        type,
      )}`}
    >
      <div className="flex items-center justify-between gap-4">
        <div className="flex text-sm">{getIconType(type)}</div>
        <p className="text-sm">{message}</p>
        <button
          onClick={(): void => onDelete()}
          className="border-0 text-white text-lg rounded-md hover:bg-light-blue p-2"
        >
          <IoMdClose />
        </button>
      </div>
      <animated.span
        style={{ width: props.width.to((value) => `${value}%`) }}
        className={`absolute bottom-0 left-0 h-1 ${getTypeBackground(type)}`}
      ></animated.span>
    </animated.div>
  );
});

export default ToasterMessage;
