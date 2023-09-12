import React from 'react';

enum ButtonVariantType {
  DANGER = 'danger',
  SUCCESS = 'success',
  WARNING = 'warning',
  INFO = 'info',
}

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  variant: ButtonVariantType;
  children: React.ReactNode;
}

const Button = ({
  type = 'button',
  onClick,
  variant,
  children,
}: ButtonProps) => {
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
