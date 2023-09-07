import React, { useEffect, useState } from 'react';
import { GuildModalStepProps } from '../AddingGuildModal';
import { GuildCategoryEnum } from '../../../../interfaces/guild.interface';
import { keysToCamel } from '../../../../utils/helpers';
import usePlayer from '../../../../hooks/usePlayer';
import { guildsService } from '../../../../services/guilds.service';

const GeneralStep = ({
  guildPayload,
  handleChange,
}: GuildModalStepProps): JSX.Element => {
  const { player, apiKey } = usePlayer();
  const [guilds, setGuilds] = useState<any[]>([]);

  const categories: GuildCategoryEnum[] = [
    GuildCategoryEnum.MCM,
    GuildCategoryEnum.PVE,
    GuildCategoryEnum.PVP,
  ];

  useEffect(() => {
    const getGuild = async (id: string) => {
      return await fetch(
        `${
          import.meta.env.VITE_GW2_API_URL
        }/v2/guild/${id}?access_token=${apiKey}`,
        {
          method: 'GET',
        },
      )
        .then((res) => res.json())
        .then((data) => keysToCamel(data));
    };

    const getAllGuilds = async (guildsId: string[]) => {
      const asyncFilter = async (
        arr: string[],
        predicate: (guildId: string) => Promise<boolean>,
      ) => {
        const results = await Promise.all(arr.map(predicate));

        return arr.filter((_v, index) => results[index]);
      };

      await asyncFilter([...guildsId], async (guildId: string) => {
        const guildCount = await guildsService.getGuildCountByGameId(guildId);
        return guildCount === 0;
      })
        .then((filteredGuilds) => {
          return Promise.all(
            filteredGuilds.map(async (guildId) => {
              return await getGuild(guildId);
            }),
          );
        })
        .then((guilds) => {
          setGuilds(guilds);
        });
    };

    if (player) {
      getAllGuilds(player.guilds);
    }
  }, [player]);

  return (
    <>
      <div className="flex flex-col gap-4 w-full">
        <label
          className="relative flex flex-col gap-2 text-light-gray"
          htmlFor="guilds"
          aria-required
        >
          <p className="text-sm">
            Guilde <span className="text-accent-blue">*</span>
          </p>
          <select
            name="guilds"
            id="guilds"
            value={guildPayload.guildId}
            onChange={(e) => {
              handleChange({
                ...guildPayload,
                guildId: e.target.value,
              });
            }}
            className="bg-main-blue text-sm p-4 rounded-lg border border-light-blue text-white"
          >
            {guilds &&
              guilds.map((guild) => {
                return (
                  <option key={guild.id} value={guild.id}>
                    {guild.name}
                  </option>
                );
              })}
          </select>
        </label>
        <div className="relative flex flex-col gap-2 text-light-gray text-sm">
          Catégories
          <div className="grid grid-cols-3 gap-4">
            {categories &&
              categories.map((category: GuildCategoryEnum) => {
                return (
                  <label htmlFor={`guild-type-${category}`} key={category}>
                    <input
                      type="checkbox"
                      id={`guild-type-${category}`}
                      checked={guildPayload.categories.includes(category)}
                      className="sr-only peer"
                      onChange={() => {
                        if (guildPayload.categories.includes(category)) {
                          handleChange({
                            ...guildPayload,
                            categories: guildPayload.categories.filter(
                              (guildCategory) => guildCategory !== category,
                            ),
                          });
                        } else {
                          handleChange({
                            ...guildPayload,
                            categories: [...guildPayload.categories, category],
                          });
                        }
                      }}
                    />
                    <div className="relative cursor-pointer text-white font-semibold text-xl flex items-center justify-center bg-main-blue rounded-lg overflow-hidden border peer-checked:border-accent-blue transition-all border-light-blue w-full h-28">
                      <p className="z-10">{category.toUpperCase()}</p>
                      <img
                        className="absolute top-0 w-full h-full object-cover opacity-25 peer-checked:opacity-50"
                        src={`/images/bg-${category}.jpg`}
                        alt=""
                      />
                    </div>
                  </label>
                );
              })}
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer text-sm">
          <input
            type="checkbox"
            checked={guildPayload.isRecruiting}
            onChange={() =>
              handleChange({
                ...guildPayload,
                isRecruiting: !guildPayload.isRecruiting,
              })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-light-blue rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
          <span className="ml-3 text-sm text-white">
            Est ce que la guilde recrute ?
          </span>
        </label>
        <label
          className="relative flex flex-col gap-2 text-light-gray text-sm"
          htmlFor=""
        >
          Lien discord
          <input
            type="text"
            className="bg-main-blue w-full p-4 rounded-lg border text-sm border-light-blue text-white"
            placeholder="ex : https://discord.com/invite/..."
            value={guildPayload.discordLink}
            onChange={(e) =>
              handleChange({
                ...guildPayload,
                discordLink: e.target.value,
              })
            }
          />
        </label>
      </div>
    </>
  );
};

export default GeneralStep;
