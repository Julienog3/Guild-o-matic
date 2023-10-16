import React from 'react';

interface IconButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  isActivated: boolean;
}

const IconButton = ({
  icon,
  onClick,
  isActivated,
}: IconButtonProps): JSX.Element => {
  return (
    <button
      className={`${
        isActivated ? 'bg-main-blue' : 'bg-accent-blue'
      } cursor-pointer w-fit p-4 py-4 font-raleway gap-8 border text-white text-sm  border-light-blue rounded-lg flex items-center justify-center hover:border-accent-blue transition-colors`}
      onClick={(): void => onClick()}
    >
      {icon}
    </button>
  );
};

export default IconButton;
