import React from 'react';
import Button from '../../utils/Button';
import { Link, useLocation } from 'react-router-dom';
import LinkedButton from '../../utils/LinkedButton';
import { BsFillShieldFill, BsShieldShaded } from 'react-icons/bs';
import { AiFillHome } from 'react-icons/ai';
import SidebarButton from './SidebarButton';
import { SidebarButtonType } from '../../../App';

interface SidebarProps {
  buttons: SidebarButtonType[];
}

const Sidebar = ({ buttons }: SidebarProps): JSX.Element => {
  const location = useLocation();

  const isButtonActive = (button: SidebarButtonType): boolean => {
    return button.link === location.pathname;
  };

  return (
    <aside className="flex flex-col p-4 gap-4 w-24 h-screen bg-main-blue border-r border-light-blue items-center">
      <span className="mt-4 text-2xl text-white">
        <BsShieldShaded />
      </span>
      <div className="mt-8 flex flex-col gap-4">
        {buttons &&
          buttons.map((button) => {
            return (
              <SidebarButton
                key={button.name}
                to={button.link}
                isActive={isButtonActive(button)}
                icon={button.icon}
              />
            );
          })}
      </div>
    </aside>
  );
};

export default Sidebar;
