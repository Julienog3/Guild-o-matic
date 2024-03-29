import React from 'react';
import { IoMdClose } from 'react-icons/io';
import { SpringValue, animated } from '@react-spring/web';

interface ModalProps {
  style?: ModalStyle;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
}

export type ModalStyle = {
  y: SpringValue<number>,
  opacity: SpringValue<number>,
};

const Modal = ({
  onClose,
  style,
  title,
  children,
}: ModalProps): JSX.Element => {
  return (
    <animated.div
      role="alertdialog"
      style={{ opacity: style?.opacity }}
      className="flex items-center justify-center fixed top-0 left-0 w-full h-screen bg-black/70 z-50"
    >
      <animated.div
        style={{ ...style }}
        className=" min-w-[500px] min-h-fit relative bg-main-blue rounded-lg p-6 border border-light-blue"
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-white font-raleway font-medium text-2xl">
            {title}
          </h2>
          <button
            className="border-0 text-white text-2xl rounded-md hover:bg-bg-blue p-2"
            onClick={onClose}
          >
            <IoMdClose />
          </button>
        </div>
        {children}
      </animated.div>
    </animated.div>
  );
};

export default Modal;
