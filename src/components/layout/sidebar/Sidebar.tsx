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
    <aside className="z-20 flex sm:flex-col p-4 gap-4 sm:w-24 w-full sm:justify-normal justify-center sm:h-screen h-24 bottom-0 bg-main-blue border-r border-light-blue items-center sm:relative fixed">
      <span className="mt-4 text-2xl text-white sm:block hidden">
        <BsShieldShaded />
      </span>
      <div className="sm:mt-8 flex sm:flex-col gap-4 ">
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
