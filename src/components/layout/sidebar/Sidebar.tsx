import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsShieldShaded } from 'react-icons/bs';
import SidebarButton from './SidebarButton';
import { SidebarButtonType } from '../../../App';
import useAuth from '../../../hooks/useAuth';

interface SidebarProps {
  buttons: SidebarButtonType[];
}

const Sidebar = ({ buttons }: SidebarProps): JSX.Element => {
  const location = useLocation();

  const { session } = useAuth();
  const [filteredButtons, setFilteredButtons] = useState<SidebarButtonType[]>(
    [],
  );

  useEffect(() => {
    if (session?.user) {
      setFilteredButtons(buttons);
    } else {
      setFilteredButtons(
        buttons.filter((button) => button.isAuthNeeded === false),
      );
    }
  }, [session]);

  const isButtonActive = (button: SidebarButtonType): boolean => {
    return button.link === location.pathname;
  };

  return (
    <aside className="z-20 flex sm:flex-col p-4 gap-4 sm:w-24 w-full sm:justify-normal justify-center sm:h-screen h-24 bottom-0 bg-main-blue border-r border-light-blue items-center sm:relative fixed">
      <span className="mt-4 text-2xl text-white sm:block hidden">
        <BsShieldShaded />
      </span>
      {filteredButtons && (
        <div className="sm:mt-8 flex sm:flex-col gap-4 ">
          {filteredButtons.map((button) => {
            return (
              <SidebarButton
                label={button.label}
                key={button.name}
                to={button.link}
                isActive={isButtonActive(button)}
                icon={button.icon}
              />
            );
          })}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;
