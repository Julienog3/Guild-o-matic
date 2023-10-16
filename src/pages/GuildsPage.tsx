import React, { useCallback, useState } from 'react';
import Page from '../components/layout/Page';
import GuildCards from '../components/guilds/GuildCards';
import GuildFilter from '../components/guilds/GuildFilter';
import { useQuery } from 'react-query';
import { guildsService } from '../services/guilds.service';
import GuildList from '../components/guilds/GuildList';
import { BsGridFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { GuildCategoryEnum, GuildType } from '../interfaces/guild.interface';
import Spinner from '../components/utils/Spinner';
import Banner from '../components/layout/Banner';
import IconButton from '../components/utils/IconButton';

export type GuildsFilterType = {
  categories: GuildCategoryEnum[],
  isRecruiting: boolean,
  name: string,
};

export default function GuildsPage(): JSX.Element {
  const [filter, setFilter] = useState<GuildsFilterType>({
    categories: [],
    isRecruiting: false,
    name: '',
  });

  const filterGuildByCategories = useCallback(
    (guilds: GuildType[]): GuildType[] => {
      return guilds
        .filter((guild: GuildType) =>
          filter.isRecruiting ? guild?.isRecruiting === true : true,
        )
        .filter((guild: GuildType) => {
          const commonCategories = filter?.categories.filter((category) =>
            guild.categories.includes(category),
          );

          return commonCategories?.length === filter?.categories.length;
        })
        .filter((guild: GuildType) => {
          return guild.name?.toLowerCase()?.includes(filter.name.toLowerCase());
        });
    },
    [filter],
  );

  const { data: guilds, isLoading } = useQuery(
    ['guilds'],
    guildsService.getGuilds,
    {
      retry: 2,
      select: filterGuildByCategories,
    },
  );

  const [isDisplayList, setIsDisplayList] = useState<boolean>(false);

  const handleFilterChange = (newFilter: GuildsFilterType) => {
    setFilter(newFilter);
  };

  return (
    <>
      <Page>
        <div className="max-w-7xl mx-auto">
          <div className="flex mb-4 p-8 rounded-lg overflow-hidden relative h-64">
            <Banner url="/images/bg-guilds.jpg" />
          </div>
          <div className="w-full items-center gap-4 border-b border-light-blue pb-4 my-8">
            <h2 className="text-2xl font-semibold text-white">
              Toutes les guildes
            </h2>
          </div>
          <div className="flex w-full gap-4 items-center mb-8">
            <GuildFilter
              filter={filter}
              onFilterChange={(newFilter) => handleFilterChange(newFilter)}
            />
            <div className="flex gap-4">
              <IconButton
                isActivated={!isDisplayList}
                onClick={(): void => setIsDisplayList(true)}
                icon={<FiMenu />}
              />
              <IconButton
                isActivated={isDisplayList}
                onClick={(): void => setIsDisplayList(false)}
                icon={<BsGridFill />}
              />
            </div>
          </div>
          {isLoading ? (
            <div className=" text-light-gray flex items-center justify-center text-sm w-full">
              <Spinner />
              Le guild-o-matic recherche les meilleurs guildes
            </div>
          ) : (
            <>
              {guilds ? (
                isDisplayList ? (
                  <GuildList guilds={guilds} />
                ) : (
                  <GuildCards guilds={guilds} />
                )
              ) : (
                <div className=" text-light-gray flex items-center justify-center text-sm w-full">
                  Nous n&apos;avons pas trouver de guildes
                </div>
              )}
            </>
          )}
        </div>
      </Page>
    </>
  );
}
