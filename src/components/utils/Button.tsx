import React from 'react';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
}

const Button = ({ type, onClick, children }: ButtonProps) => {
  return (
    <button
      type={type}
      onClick={(): void => {
        if (onClick) {
          onClick();
        }
      }}
      className="bg-neutral-900 px-8 py-3 text-white rounded-full"
    >
      {children}
    </button>
  );
};

export default Button;
