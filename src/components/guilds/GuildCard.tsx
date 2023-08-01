import React, { useEffect, useState } from 'react';
import { GuildType } from '../../interfaces/guild.interface';
import { gw2Service } from '../../services/gw2.service';
import { guildsService } from '../../services/guilds.service';
import { supabase } from '../../supabaseClient';
import { keysToCamel } from '../../utils/helpers';

interface GuildCardProps {
  guild: GuildType;
}

const GuildCard = ({ guild }: GuildCardProps): JSX.Element => {
  const [categories, setCategories] = useState<any[]>([]);
  const [owner, setOwner] = useState<any>();

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

    guildsService.getGuildCategoriesById(guild.id).then((res) => {
      setCategories(res);
    });

    getGuildOwner();
  }, [guild]);

  return (
    <article className="guild-card bg-light-blue rounded-lg overflow-hidden hover:outline outline-1 outline-accent-blue transition group">
      <div className="relative h-44 w-full p-6 overflow-hidden flex flex-col ">
        <div className="relative z-10 flex flex-col h-full justify-between">
          <div
            className={`flex gap-4 items-center self-end py-2 px-3 border rounded-full ${
              guild.isRecruiting
                ? 'bg-green/25 border-green'
                : 'bg-red/25 border-red'
            }`}
          >
            <span
              className={`${
                guild.isRecruiting ? 'bg-green' : 'bg-red'
              } w-2 h-2 rounded-full`}
            />
            {guild.isRecruiting ? (
              <p className="text-green text-sm font-medium">Ouvert</p>
            ) : (
              <p className="text-red text-sm font-medium">Fermé</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-raleway text-2xl font-semibold">
              {guild.name}
            </h3>
            <ul className="flex gap-2">
              {categories &&
                categories.map((category, index) => {
                  return (
                    <div
                      className="bg-light-blue/70 z-10 uppercase self-end rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold"
                      key={index}
                    >
                      {category.categories.name}
                    </div>
                  );
                })}
            </ul>
          </div>
        </div>
        <div className="absolute top-0 left-0 w-full h-full guild-card__image">
          <img
            className="absolute h-full object-cover w-full group-hover:scale-110 transition-transform"
            src="./images/bg-card.jpg"
            alt=""
          />
        </div>
      </div>
      <div className="p-4 flex justify-between">
        <div className="flex gap-4 items-center">
          <img
            className="rounded-xl w-10 h-10"
            src="https://avatarfiles.alphacoders.com/108/thumb-108702.jpg"
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
