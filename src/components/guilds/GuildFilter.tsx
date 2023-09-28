import React from 'react';
import { GuildCategoryEnum } from '../../interfaces/guild.interface';
import { GuildsFilterType } from '../../pages/Guilds';

interface GuildFilterProps {
  filter: GuildsFilterType;
  onFilterChange: (newFilter: GuildsFilterType) => void;
}

const GuildFilter = ({
  filter,
  onFilterChange,
}: GuildFilterProps): JSX.Element => {
  const categories: GuildCategoryEnum[] = [
    GuildCategoryEnum.MCM,
    GuildCategoryEnum.PVE,
    GuildCategoryEnum.PVP,
  ];

  const categoriesLabel: Record<GuildCategoryEnum, string> = {
    [GuildCategoryEnum.MCM]: 'mcm',
    [GuildCategoryEnum.PVP]: 'pvp',
    [GuildCategoryEnum.PVE]: 'pve',
  };

  const handleCategoryClick = (category: GuildCategoryEnum) => {
    if (filter.categories.includes(category)) {
      onFilterChange({
        ...filter,
        categories: [
          ...filter.categories.filter(
            (guildCategory) => guildCategory !== category,
          ),
        ],
      });
    } else {
      onFilterChange({
        ...filter,
        categories: [...filter.categories, category],
      });
    }
  };

  return (
    <div className="flex gap-8 w-full items-center">
      <div className="flex flex-col">
        <h3 className=" text-light-gray text-sm font-normal mb-3">
          Filtrer par Catégories
        </h3>
        <ul className="flex gap-2">
          {categories &&
            categories.map((category: GuildCategoryEnum, index: number) => {
              return (
                <>
                  <label
                    htmlFor={categoriesLabel[category]}
                    key={index}
                    className={`${
                      filter.categories.includes(category)
                        ? 'bg-accent-blue/25 border-accent-blue'
                        : 'bg-light-blue border-light-blue'
                    }  rounded-full select-none h-8 flex items-center px-6 border  text-sm text-white font-semibold uppercase cursor-pointer`}
                  >
                    {categoriesLabel[category]}
                  </label>
                  <input
                    type="checkbox"
                    className="sr-only peer hidden"
                    checked={filter.categories.includes(category)}
                    onClick={() => handleCategoryClick(category)}
                    id={categoriesLabel[category]}
                  />
                </>
              );
            })}
        </ul>
      </div>
      <div className="flex flex-col">
        <h3 className=" text-light-gray text-sm font-normal mb-3">
          Actuellement ouvert ?
        </h3>
        <label className="relative inline-flex items-center cursor-pointer w-full">
          <input
            type="checkbox"
            checked={filter.isRecruiting}
            onChange={() =>
              onFilterChange({
                ...filter,
                isRecruiting: !filter.isRecruiting,
              })
            }
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-light-blue rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-accent-blue"></div>
        </label>
      </div>
      <input
        type="text"
        value={filter.name}
        onChange={(e) =>
          onFilterChange({
            ...filter,
            name: e.target.value,
          })
        }
        placeholder="Rechercher une guilde"
        className=" rounded-lg ml-auto h-12 text-sm bg-transparent border p-2 bg-main-blue border-light-blue outline-accent-blue text-white"
      />
    </div>
  );
};

export default GuildFilter;
