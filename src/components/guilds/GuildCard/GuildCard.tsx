import React, { useEffect, useState } from 'react';
import {
  GuildCategoryEnum,
  GuildType,
} from '../../../interfaces/guild.interface';
import { guildsService } from '../../../services/guilds.service';
import { supabase } from '../../../supabaseClient';
import { keysToCamel } from '../../../utils/helpers';
import GuildCardStatus from './GuildCardStatus';

interface GuildCardProps {
  guild: GuildType;
}

const GuildCard = ({ guild }: GuildCardProps): JSX.Element => {
  const [owner, setOwner] = useState<any>();
  const [guildBackgroundUrl, setGuildBackgroundUrl] = useState<string>();
  const [guildOwnerAvatarUrl, setGuildOwnerAvatarUrl] = useState<string>();

  const categoriesLabel: Record<GuildCategoryEnum, string> = {
    [GuildCategoryEnum.MCM]: 'mcm',
    [GuildCategoryEnum.PVP]: 'pvp',
    [GuildCategoryEnum.PVE]: 'pve',
  };

  useEffect(() => {
    if (!guild) {
      return;
    }

    const getGuildOwner = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', guild.ownerId);

      if (error) {
        return;
      }

      const formattedData = keysToCamel(data[0]);
      setOwner(formattedData);
    };

    const getGuildOwnerAvatarUrl = async () => {
      const { data, error } = await supabase.storage
        .from('users')
        .createSignedUrl(`${guild.ownerId}/avatar`, 3600);

      if (error) {
        console.error(error);
        return;
      }

      setGuildOwnerAvatarUrl(data.signedUrl);
    };

    const getGuildBackgroundUrl = async () => {
      const { data, error } = await supabase.storage
        .from('guilds')
        .createSignedUrl(`${guild.id}/background`, 3600);

      if (error) {
        console.error(error);
        return;
      }

      setGuildBackgroundUrl(data.signedUrl);
    };

    // guildsService.getGuildCategoriesById(guild.id).then((res) => {
    //   setCategories(res);
    // });

    getGuildOwner();
    getGuildBackgroundUrl();
    getGuildOwnerAvatarUrl();
  }, [guild]);

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
      <div className="p-4 flex justify-between">
        <div className="flex gap-4 items-center">
          <img
            className="rounded-xl w-10 h-10 object-cover"
            src={guildOwnerAvatarUrl}
            alt=""
          />
          <div className="flex flex-col">
            <p className="text-light-gray text-sm">Géré par</p>
            <span className="text-white font-semibold text-sm">
              {owner && owner.username}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
};

export default GuildCard;
