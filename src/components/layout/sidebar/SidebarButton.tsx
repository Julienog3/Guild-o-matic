import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface SidebarButtonProps {
  // type: SidebarButtonTypeEnum;
  icon: React.ReactNode;
  isActive?: boolean;
  to?: string;
  onClick?: () => void;
  label: string;
}

export enum SidebarButtonTypeEnum {
  LINK = 'LINK',
  MODAL = 'MODAL',
}

interface conditionalLinkedSidebarButtonProps {
  link?: string;
  children: JSX.Element;
}

const ConditionalLinkedSidebarButton = ({
  link,
  children,
}: conditionalLinkedSidebarButtonProps): JSX.Element =>
  link ? <Link to={link}>{children}</Link> : children;

const SidebarButton = ({
  // type,
  to,
  onClick,
  icon,
  isActive = false,
  label,
}: SidebarButtonProps): JSX.Element => {
  const [isButtonHovered, setIsButtonHovered] = useState<boolean>(false);
  return (
    <ConditionalLinkedSidebarButton link={to}>
      <div
        className={`${
          isActive ? 'bg-accent-blue text-white' : 'hover:bg-light-blue'
        } flex transition items-center text-light-gray text-sm gap-5  py-4 px-5 rounded-md cursor-pointer`}
        onClick={() => onClick && onClick()}
      >
        <div
          // onMouseEnter={() => setIsButtonHovered(true)}
          // onMouseLeave={() => setIsButtonHovered(false)}
          className="relative flex items-center justify-center text-xl text-white transition-opacity"
        >
          {icon}
        </div>
        {label}
      </div>
    </ConditionalLinkedSidebarButton>
  );
};

export default SidebarButton;
