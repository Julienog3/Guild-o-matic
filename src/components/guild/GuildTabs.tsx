import React, { useState } from 'react';
import { Tab } from '../../pages/Guild';

interface GuildTabsProps {
  tabs: Tab[];
}

const GuildTabs = ({ tabs }: GuildTabsProps): JSX.Element => {
  const [guildTabIndex, setGuildTabIndex] = useState<number>(0);
  const tabComponent = tabs[guildTabIndex].component;

  return (
    <>
      <ul className="flex gap-4 text-white my-8 max-w-7xl mx-auto">
        {tabs.map((tab, index) => {
          return (
            <li
              key={tab.name}
              onClick={() => setGuildTabIndex(index)}
              className={`cursor-pointer ${
                guildTabIndex === index
                  ? 'text-accent-blue border-b-2 border-accent-blue'
                  : ''
              }`}
            >
              {tab.label}
            </li>
          );
        })}
      </ul>
      {tabComponent}
    </>
  );
};

export default GuildTabs;
