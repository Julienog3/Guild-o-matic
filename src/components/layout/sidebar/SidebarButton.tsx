import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SidebarButtonProps {
  icon: React.ReactNode;
  isActive?: boolean;
  to: string;
  label: string;
}

const SidebarButton = ({
  to,
  icon,
  isActive = false,
  label,
}: SidebarButtonProps): JSX.Element => {
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);

  return (
    <Link to={to}>
      <div
        className={`${
          isActive ? 'bg-accent-blue text-white' : 'hover:bg-light-blue'
        } flex items-center text-light-gray text-sm gap-5  py-4 px-5 rounded-md`}
      >
        <div
          onMouseEnter={() => setIsButtonHovered(true)}
          onMouseLeave={() => setIsButtonHovered(false)}
          className="relative flex items-center justify-center text-xl text-white transition-opacity"
        >
          {icon}
          {/* {isButtonHovered && (
            <span className="absolute z-50 text-sm text-white top-1/2 -translate-y-1/2 left-20 bg-main-blue p-2 whitespace-nowrap rounded-md border border-light-blue">
              {label}
            </span>
          )} */}
        </div>
        {label}
      </div>
    </Link>
  );
};

export default SidebarButton;
