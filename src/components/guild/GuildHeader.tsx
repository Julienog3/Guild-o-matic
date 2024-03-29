import { useEffect, useRef, useState } from 'react';
import { gw2Service } from '../../services/gw2.service';
import React from 'react';
import { supabase } from '../../supabaseClient';
import { GuildCategoryEnum, GuildType } from '../../interfaces/guild.interface';
import { guildsService } from '../../services/guilds.service';
import { Link, useNavigate } from 'react-router-dom';
import { BsDiscord } from 'react-icons/bs';
import { FiMoreHorizontal } from 'react-icons/fi';
import Banner from '../layout/Banner';
import GuildDeleteModal from '../modals/GuildDeleteModal';
import { useMutation, useQuery } from 'react-query';
import { QueryClient } from '@tanstack/query-core';
import useAuth from '../../hooks/useAuth';
import GuildModal from '../modals/GuildModal/GuildModal';
import { GuildModalMode } from '../modals/GuildModal/GuildModal.intefaces';
import { useTransition, animated } from '@react-spring/web';

interface GuildHeaderProps {
  guild: GuildType;
}

const GuildHeader = ({ guild }: GuildHeaderProps): JSX.Element => {
  const { session } = useAuth();

  const [isGuildDeleteModalOpened, setIsGuildDeleteModalOpened] =
    useState<boolean>(false);
  const [isEditingGuildModalOpened, setIsEditingGuildModalOpened] =
    useState<boolean>(false);
  const [isMoreButtonExpanded, setIsMoreButtonExpanded] =
    useState<boolean>(false);

  const queryClient = new QueryClient();
  const navigate = useNavigate();

  const categoriesLabel: Record<GuildCategoryEnum, string> = {
    [GuildCategoryEnum.MCM]: 'mcm',
    [GuildCategoryEnum.PVP]: 'pvp',
    [GuildCategoryEnum.PVE]: 'pve',
  };

  const dropdownRef = useRef<HTMLDivElement>(null);
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const  handleClickOutside = (event: globalThis.MouseEvent) => {
      if (dropdownRef.current && (!dropdownRef.current.contains(event.target as Node) && !dropdownButtonRef?.current?.contains(event.target as Node))) {
        setIsMoreButtonExpanded(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  const moreButtonTransition = useTransition(isMoreButtonExpanded, {
    from: {
      y: 0,
      opacity: 0,
    },
    enter: {
      y: 15,
      opacity: 1,
    },
    leave: {
      y: 0,
      opacity: 0,
    },
  });

  const transition = {
    from: {
      y: 0,
      opacity: 0,
    },
    enter: {
      y: -10,
      opacity: 1,
    },
    leave: {
      y: 0,
      opacity: 0,
    },
    config: {
      duration: 200,
    },
  };

  const guildEditingModalTransition = useTransition(
    isEditingGuildModalOpened,
    transition,
  );

  const guildDeleteModalTransition = useTransition(
    isGuildDeleteModalOpened,
    transition,
  );

  const deleteGuild = useMutation({
    mutationFn: guildsService.deleteGuild,
    onSuccess: async () => {
      navigate('/guilds');
      queryClient.invalidateQueries({ queryKey: ['guilds'] });
    },
  });

  const editGuild = useMutation({
    mutationFn: (updatedGuild: GuildType) =>
      guildsService.updateGuild({ id: guild.id, guild: updatedGuild }),
    onSuccess: async () => {
      navigate(`/guilds/${guild.id}`);
      queryClient.invalidateQueries({ queryKey: ['guilds'] });
    },
  });

  const { data: guildBackgroundUrl, isLoading: guildBackgroundUrlIsLoading } =
    useQuery(['guildBackgroundUrl', guild.id], () =>
      guildsService.getGuildBackgroundUrl(guild.id),
    );

  const { data: guildDetails } = useQuery<GuildType>(
    ['guildDetails', guild.id],
    () => gw2Service.getGuildById(guild.guildId),
  );

  const isUserOwningGuild = session?.user.id === guild.ownerId;

  return (
    <>
      {guildDeleteModalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <GuildDeleteModal
              style={{ ...style }}
              onClose={() => setIsGuildDeleteModalOpened(false)}
              onDelete={() => deleteGuild.mutate(guild.id)}
            />
          )}
        </>
      ))}
      {guildEditingModalTransition((style, isOpened) => (
        <>
          {isOpened && (
            <GuildModal
              mode={GuildModalMode.EDITING}
              style={{ ...style }}
              guild={guild}
              onClose={() => setIsEditingGuildModalOpened(false)}
              onSubmit={() => editGuild.mutate(guild)}
            />
          )}
        </>
      ))}

      <div className="flex flex-col max-w-7xl mx-auto gap-4 mb-4 p-8 justify-end  relative h-64">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center justify-between">
            <div className="flex flex-col gap-4">
              {guildDetails && (
                <h2 className="flex z-10 items-center gap-4 text-white text-4xl font-bold">
                  <span className=" bg-accent-blue/25 border text-xl border-accent-blue font-medium backdrop-blur text-accent-blue py-1 px-3 rounded-lg ">
                    {guildDetails.tag}
                  </span>
                  {guildDetails.name}
                </h2>
              )}
              <div className="flex gap-2">
                {guild.categories &&
                  guild.categories.map((category, index) => {
                    return (
                      <div
                        className="bg-light-blue/70 z-10 uppercase self-end rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold"
                        key={index}
                      >
                        {categoriesLabel[category]}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
          <div className="flex gap-4 relative">
            {guild && guild.discordLink && (
              <Link to={guild.discordLink}>
                <span className="relative flex gap-2 z-10 items-center bg-purple/50 p-3 h-12 rounded-md border backdrop-blur border-purple text-white text-sm hover:bg-purple transition-all">
                  <BsDiscord /> Lien du serveur discord
                </span>
              </Link>
            )}
            {isUserOwningGuild && (
              <div className="relative z-10">
                <button
                  onClick={() => setIsMoreButtonExpanded(!isMoreButtonExpanded)}
                  ref={dropdownButtonRef}
                  className="text-white text-xl bg-main-blue border border-light-blue w-12 h-12 flex items-center justify-center rounded-md"
                >
                  <FiMoreHorizontal />
                </button>
                {moreButtonTransition((style, isExpanded) => (
                  <>
                    {isExpanded && (
                      <animated.div
                        ref={dropdownRef}
                        style={{ ...style }}
                        className="absolute z-50 flex flex-col w-40 right-0 translate-y-4 bg-main-blue border rounded-lg text-white border-light-blue"
                      >
                        <ul className="w-full border-light-blue text-sm  p-4 text-white text-md flex flex-col gap-4">
                          <li
                            onClick={(): void =>
                              setIsEditingGuildModalOpened(true)
                            }
                            className="cursor-pointer"
                          >
                            Modifer
                          </li>
                          <li
                            onClick={(): void =>
                              setIsGuildDeleteModalOpened(true)
                            }
                            className="text-red cursor-pointer"
                          >
                            Supprimer
                          </li>
                        </ul>
                      </animated.div>
                    )}
                  </>
                ))}
              </div>
            )}
          </div>
        </div>
        {!guildBackgroundUrlIsLoading && guildBackgroundUrl && (
          <Banner
            url={guildBackgroundUrl}
            alt={`Illustration de la guilde ${guild.name}`}
          />
        )}
      </div>
    </>
  );
};

export default GuildHeader;
