import React, { useEffect, useState } from 'react';
import {
  GuildCategoryEnum,
  GuildType,
} from '../../../interfaces/guild.interface';
import { guildsService } from '../../../services/guilds.service';
import { supabase } from '../../../supabaseClient';
import { keysToCamel } from '../../../utils/helpers';
import GuildCardStatus from './GuildCardStatus';
import { useQuery } from 'react-query';
import { profilesService } from '../../../services/profiles.service';
import GuildCardFooter from './GuildCardFooter';

interface GuildCardProps {
  guild: GuildType;
}

const GuildCard = ({ guild }: GuildCardProps): JSX.Element => {
  const categoriesLabel: Record<GuildCategoryEnum, string> = {
    [GuildCategoryEnum.MCM]: 'mcm',
    [GuildCategoryEnum.PVP]: 'pvp',
    [GuildCategoryEnum.PVE]: 'pve',
  };

  const { data: guildOwnerProfile } = useQuery({
    queryKey: ['guildOwnerProfile', guild.ownerId],
    queryFn: () => guildsService.getGuildOwnerProfile(guild.ownerId),
    enabled: !!guild,
  });

  const { data: guildBackgroundUrl } = useQuery({
    queryKey: ['guildBackgroundUrl', guild.id],
    queryFn: () => guildsService.getGuildBackgroundUrl(guild.id),
    enabled: !!guild,
  });

  return (
    <article className="guild-card bg-light-blue rounded-lg overflow-hidden hover:outline outline-1 outline-accent-blue transition group">
      <div className="relative h-44 w-full p-6 overflow-hidden flex flex-col">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <GuildCardStatus isOpened={guild.isRecruiting} />
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-raleway text-2xl font-semibold">
              {guild.name}
            </h3>
            <ul className="flex gap-2">
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
            </ul>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full guild-card__image">
          {guildBackgroundUrl && (
            <img
              className="absolute h-full object-cover w-full group-hover:scale-110 transition-transform"
              src={guildBackgroundUrl}
              alt=""
            />
          )}
        </div>
      </div>
      {guildOwnerProfile && (
        <GuildCardFooter guildOwnerProfile={guildOwnerProfile} />
      )}
    </article>
  );
};

export default GuildCard;
