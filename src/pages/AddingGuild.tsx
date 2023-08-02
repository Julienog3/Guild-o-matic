import React, { useEffect, useState } from 'react';
import Page from '../components/layout/Page';
import usePlayer from '../hooks/usePlayer';
import { keysToCamel } from '../utils/helpers';
import { useMutation } from 'react-query';
import { guildsService } from '../services/guilds.service';
import { QueryClient } from '@tanstack/query-core';
import AddingGuildHeader from '../components/adding-guild/AddingGuildHeader';
import {
  GuildCategoryEnum,
  GuildPayloadInterface,
} from '../interfaces/guild.interface';
import useAuth from '../hooks/useAuth';
import TextEditor from '../components/utils/TextEditor';

const AddingGuild = (): JSX.Element => {
  const queryClient = new QueryClient();

  const { player, apiKey } = usePlayer();
  const [guilds, setGuilds] = useState<any[]>([]);

  const [guildToAdd, setGuildToAdd] = useState<GuildPayloadInterface>({
    guildId: '',
    isRecruiting: false,
    description: '',
    discordLink: '',
    categories: [],
    ownerId: '',
  });

  const categories: GuildCategoryEnum[] = [
    GuildCategoryEnum.MCM,
    GuildCategoryEnum.PVE,
    GuildCategoryEnum.PVP,
  ];

  const mutation = useMutation({
    mutationFn: guildsService.postGuild,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['guilds'] });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(guildToAdd);
    mutation.mutate(guildToAdd);
  };

  const { session } = useAuth();

  const handleTextEditorChange = (change: string): void => {
    setGuildToAdd((guildToAdd) => ({
      ...guildToAdd,
      description: change,
    }));
  };

  useEffect(() => {
    if (!session) {
      return;
    }

    setGuildToAdd({
      ...guildToAdd,
      ownerId: session.user.id,
    });
  }, [session]);

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

    const getAllGuilds = (guildsId: string[]) => {
      Promise.all(
        [...guildsId].map(async (guildId) => {
          return await getGuild(guildId);
        }),
      ).then((guilds) => {
        setGuilds(guilds);
      });
    };

    if (player) {
      getAllGuilds(player.guilds);
    }
  }, [player]);

  return (
    <Page>
      <div className="flex gap-4 max-w-7xl mx-auto">
        <div className="flex flex-col w-full relative">
          <AddingGuildHeader />
          <div className=" w-full">
            <form
              className="flex gap-8 w-full relative"
              id="adding-form"
              onSubmit={(e) => handleSubmit(e)}
            >
              <div className="flex flex-col gap-4 w-full">
                <label
                  className="relative flex flex-col gap-2 text-light-gray"
                  htmlFor="guilds"
                  aria-required
                >
                  <p>
                    Guilde <span className="text-accent-blue">*</span>
                  </p>
                  <select
                    name="guilds"
                    id="guilds"
                    value={guildToAdd.guildId}
                    onChange={(e) => {
                      console.log(e.target.value);

                      setGuildToAdd((guildToAdd) => ({
                        ...guildToAdd,
                        guildId: e.target.value,
                      }));
                    }}
                    className="bg-main-blue p-4 rounded-lg border border-light-blue text-white"
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
                <div className="relative flex flex-col gap-2 text-light-gray">
                  Catégories
                  <div className="grid grid-cols-3 gap-4">
                    {categories &&
                      categories.map((category: GuildCategoryEnum) => {
                        return (
                          <label
                            htmlFor={`guild-type-${category}`}
                            key={category}
                          >
                            <input
                              type="checkbox"
                              id={`guild-type-${category}`}
                              checked={guildToAdd.categories.includes(category)}
                              className="sr-only peer"
                              onChange={(e) =>
                                setGuildToAdd((guildToAdd) => {
                                  if (
                                    guildToAdd.categories.includes(category)
                                  ) {
                                    return {
                                      ...guildToAdd,
                                      categories: guildToAdd.categories.filter(
                                        (guildCategory) =>
                                          guildCategory !== category,
                                      ),
                                    };
                                  } else {
                                    return {
                                      ...guildToAdd,
                                      categories: [
                                        ...guildToAdd.categories,
                                        category,
                                      ],
                                    };
                                  }
                                })
                              }
                            />
                            <div className="relative cursor-pointer text-white font-semibold text-2xl flex items-center justify-center bg-main-blue rounded-lg overflow-hidden border peer-checked:border-accent-blue transition-all border-light-blue w-full h-28">
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
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={guildToAdd.isRecruiting}
                    onChange={() =>
                      setGuildToAdd((guildToAdd) => ({
                        ...guildToAdd,
                        isRecruiting: !guildToAdd.isRecruiting,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-light-blue rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
                  <span className="ml-3 text-sm text-white">
                    Est ce que la guilde recrute ?
                  </span>
                </label>
                <label
                  className="relative flex flex-col gap-2 text-light-gray"
                  htmlFor=""
                >
                  Lien discord
                  <input
                    type="text"
                    className="bg-main-blue w-full p-4 rounded-lg border border-light-blue text-white"
                    placeholder="ex : https://discord.com/invite/..."
                    value={guildToAdd.discordLink}
                    onChange={(e) =>
                      setGuildToAdd((guildToAdd) => ({
                        ...guildToAdd,
                        discordLink: e.target.value,
                      }))
                    }
                  />
                </label>
              </div>
              <label
                className="relative flex flex-col gap-2 text-light-gray w-full"
                htmlFor=""
              >
                <p>Description</p>
                <TextEditor handleChange={handleTextEditorChange} />
              </label>
            </form>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default AddingGuild;
