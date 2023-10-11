import React from 'react';
import { GuildCategoryEnum, GuildType } from '../../interfaces/guild.interface';
import GuildCardStatus from './GuildCard/GuildCardStatus';
import { useQuery } from 'react-query';
import { guildsService } from '../../services/guilds.service';
import { profilesService } from '../../services/profiles.service';

interface GuildCardProps {
  guild: GuildType;
}

const GuildRow = ({ guild }: GuildCardProps): JSX.Element => {
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

  const guildOwnerId = guildOwnerProfile?.userId;

  const { data: guildOwnerProfileAvatarUrl } = useQuery({
    queryKey: ['guildOwnerProfileAvatar', guildOwnerId],
    queryFn: () =>
      guildOwnerId ? profilesService.getUserAvatar(guildOwnerId) : '',
    enabled: !!guildOwnerProfile,
  });

  return (
    <li className="flex items-center gap-4 p-4 bg-light-blue rounded-lg overflow-hidden hover:outline outline-1 outline-accent-blue transition group">
      <div className="flex gap-4 items-center">
        <GuildCardStatus isOpened={guild.isRecruiting} />
        <h3 className="text-white text-md font-semibold">{guild.name}</h3>
      </div>
      <ul className="flex ml-4 gap-2 items-center">
        {guild.categories &&
          guild.categories.map((category, index) => {
            return (
              <div
                className="bg-main-blue/70 z-10 uppercase self-end rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold"
                key={index}
              >
                {categoriesLabel[category]}
              </div>
            );
          })}
      </ul>
      <div className="flex gap-4 items-center ml-auto">
        <img
          className="rounded-xl w-10 h-10"
          src={guildOwnerProfileAvatarUrl}
          alt=""
        />
        <div className="flex gap-2">
          <p className="text-light-gray text-sm">Géré par</p>
          <span className="text-white font-semibold text-sm">
            {guildOwnerProfile?.username}
          </span>
        </div>
      </div>
    </li>
  );
};

export default GuildRow;
