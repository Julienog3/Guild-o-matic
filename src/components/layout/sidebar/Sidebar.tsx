import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BsFillJournalBookmarkFill, BsShieldShaded } from 'react-icons/bs';
import SidebarButton from './SidebarButton';
import { SidebarButtonType } from '../../../App';
import useAuth from '../../../hooks/useAuth';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import ChangelogModal from '../../modals/ChangelogModal';

interface SidebarProps {
  buttons: SidebarButtonType[];
}

const Sidebar = ({ buttons }: SidebarProps): JSX.Element => {
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [isChangelogModalOpened, setIsChangelogModalOpened] =
    useState<boolean>(false);

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
    <>
      {isChangelogModalOpened && (
        <ChangelogModal
          onClose={(): void => setIsChangelogModalOpened(false)}
        />
      )}
      <aside
        className={`${
          isExpanded ? ' w-72' : 'w-24'
        } z-20 flex flex-col p-4 h-screen bottom-0 bg-main-blue border-r border-light-blue items-start relative`}
      >
        <h1 className="flex gap-4 text-white text-lg items-center font-semibold p-4 mt-4">
          <span className="text-2xl">
            <BsShieldShaded />
          </span>
          Guild-o-matic
        </h1>
        {/* <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? (
          <IoIosArrowBack className="text-white text-lg" />
        ) : (
          <IoIosArrowForward className="text-white text-lg" />
        )}
      </button> */}
        {filteredButtons && (
          <div className="flex flex-col gap-4 w-full border-b border-light-blue py-6">
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
        {session?.user && (
          <div className="flex flex-col text-light-gray gap-4 w-full border-b border-light-blue py-6">
            <span className="font-medium text-sm flex gap-2">
              Mes guildes
              <div className=" w-5 h-5  text-xs flex items-center justify-center text-white bg-accent-blue rounded-full">
                3
              </div>
            </span>
            <ul className="flex flex-col gap-4">
              <li className="flex items-center bg-light-blue p-3 rounded-md text-light-gray text-sm">
                Ordres Des Phoenix
              </li>
              <li className="flex items-center bg-light-blue p-3 rounded-md text-light-gray text-sm">
                Oblivious
              </li>
              <li className="flex items-center bg-light-blue p-3 rounded-md text-light-gray text-sm">
                Fraternité tyrienne
              </li>
            </ul>
          </div>
        )}
        <div className="rounded-md flex flex-col items-center justify-center  relative overflow-hidden h-56 w-full bg-bg-blue border border-light-blue p-4 my-6">
          <BsFillJournalBookmarkFill className="text-white text-4xl mb-4" />
          <p className="w-auto text-sm text-center text-light-gray mb-6">
            Suivez la progression du projet
          </p>
          <button
            onClick={(): void => setIsChangelogModalOpened(true)}
            className="w-full text-white text-sm bg-accent-blue p-4 rounded-md"
          >
            Voir changelogs
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
