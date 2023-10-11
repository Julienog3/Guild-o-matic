import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BiShield } from 'react-icons/bi';
import SidebarButton from './SidebarButton';
import { SidebarButtonType } from '../../../App';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from 'react-query';
import { guildsService } from '../../../services/guilds.service';
import { GuildType } from '../../../interfaces/guild.interface';
import { AiOutlinePlus } from 'react-icons/ai';

interface SidebarProps {
  buttons: SidebarButtonType[];
  onAddingGuild: () => void;
}

const Sidebar = ({ buttons, onAddingGuild }: SidebarProps): JSX.Element => {
  const location = useLocation();

  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  const { session } = useAuth();
  const [filteredButtons, setFilteredButtons] = useState<SidebarButtonType[]>(
    [],
  );

  const userId = session ? session?.user.id : '';

  const { data: userGuilds } = useQuery({
    queryKey: ['userGuilds', userId],
    queryFn: () => guildsService.getUserGuilds(userId),
    enabled: !!userId,
  });

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
      <aside
        className={`${
          isExpanded ? ' w-72' : 'w-24'
        } z-20 flex flex-col p-4 h-screen bottom-0 bg-main-blue border-r border-light-blue items-start relative`}
      >
        <div className="flex items-center gap-4 p-4 mt-4">
          <img className="w-10 h-10" src="/images/icon.png" />
          <h1 className=" text-white text-base font-semibold ">
            Guild-o-matic
          </h1>
        </div>

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
                  onClick={button.onClick}
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
                {userGuilds?.length}
              </div>
            </span>
            {userGuilds && userGuilds?.length > 0 && (
              <ul className="flex flex-col gap-4">
                {userGuilds.map((guild: GuildType) => (
                  <Link key={guild.id} to={`/guilds/${guild.id}`}>
                    <li className="flex gap-2 items-center bg-light-blue p-3 rounded-md text-light-gray text-sm">
                      <BiShield />
                      {guild.name}
                    </li>
                  </Link>
                ))}
              </ul>
            )}
            {userGuilds && userGuilds?.length <= 4 && (
              <button onClick={(): void => onAddingGuild()}>
                <div className="flex gap-2 items-center bg-light-blue p-3 rounded-md text-light-gray text-sm">
                  <AiOutlinePlus /> Ajouter une guilde
                </div>
              </button>
            )}
          </div>
        )}
        {/* <div className="rounded-md flex flex-col items-center justify-center  relative overflow-hidden h-56 w-full bg-bg-blue border border-light-blue p-4 my-6">
          <BsFillJournalBookmarkFill className="text-white text-4xl mb-4" />
          <p className="w-auto text-sm text-center text-light-gray mb-6">
            Suivez la progression du projet
          </p>
          <button
            onClick={(): void => setIsChangelogModalOpened(true)}
            className="w-full text-white text-sm bg-accent-blue p-3 rounded-md"
          >
            Voir changelogs
          </button>
        </div> */}
      </aside>
    </>
  );
};

export default Sidebar;
