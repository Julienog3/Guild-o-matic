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
        onMouseEnter={() => setIsButtonHovered(true)}
        onMouseLeave={() => setIsButtonHovered(false)}
        className={`relative w-14 h-14 rounded-md bg-light-blue flex items-center justify-center text-lg text-white hover:border border-accent-blue transition-opacity  ${
          isActive ? 'border' : ''
        }`}
      >
        {icon}
        {isButtonHovered && (
          <span className="absolute z-50 text-sm text-white top-1/2 -translate-y-1/2 left-20 bg-main-blue p-2 whitespace-nowrap rounded-md border border-light-blue">
            {label}
          </span>
        )}
      </div>
    </Link>
  );
};

export default SidebarButton;
