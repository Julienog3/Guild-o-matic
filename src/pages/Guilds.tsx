import React, { useCallback, useEffect, useState } from 'react';
import Page from '../components/layout/Page';
import GuildCards from '../components/guilds/GuildCards';
import GuildFilter from '../components/guilds/GuildFilter';
import { useQuery } from 'react-query';
import { guildsService } from '../services/guilds.service';
import GuildList from '../components/guilds/GuildList';
import { BsGridFill } from 'react-icons/bs';
import { FiMenu } from 'react-icons/fi';
import { GuildCategoryEnum, GuildType } from '../interfaces/guild.interface';

export type GuildsFilterType = {
  categories: GuildCategoryEnum[],
  isRecruiting: boolean,
  name: string,
};

function Guilds() {
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

  useEffect(() => {
    console.log('filter', filter);
  }, [filter]);

  return (
    <Page>
      <div className="max-w-7xl mx-auto">
        <div className="flex mb-4 p-8 rounded-lg overflow-hidden relative h-64">
          <div className="absolute z-0 top-0 left-0 w-full h-full ">
            <img
              className="absolute h-full object-cover w-full"
              src="/images/bg-guilds.jpg"
              alt=""
            />
          </div>
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
            <button
              className={`${
                isDisplayList ? 'bg-accent-blue' : 'bg-main-blue'
              } cursor-pointer w-fit p-4 font-raleway gap-8 border text-white text-sm  border-light-blue rounded-lg  flex items-center justify-center hover:border-accent-blue transition-colors`}
              onClick={(): void => setIsDisplayList(true)}
            >
              <FiMenu />
            </button>
            <button
              className={`${
                isDisplayList ? 'bg-main-blue' : 'bg-accent-blue'
              } cursor-pointer w-fit p-4 py-4 font-raleway gap-8 border text-white text-sm  border-light-blue rounded-lg flex items-center justify-center hover:border-accent-blue transition-colors`}
              onClick={(): void => setIsDisplayList(false)}
            >
              <BsGridFill />
            </button>
          </div>
        </div>
        {isLoading ? (
          <div className=" text-light-gray flex items-center justify-center text-sm w-full">
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 mr-2 text-light-gray animate-spin fill-accent-blue"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
            </div>
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
  );
}

export default Guilds;
