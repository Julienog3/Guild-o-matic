import React, { useState } from "react"
import { Tab } from "../../pages/Guild"

interface GuildTabsProps {
  tabs: Tab[]
}

const GuildTabs = ({ tabs }: GuildTabsProps): JSX.Element => {
  const [guildTabIndex, setGuildTabIndex] = useState<number>(0)
  const tabComponent = tabs[guildTabIndex].component

  return <>
    <div className="flex w-full mb-4">
      <ul className="flex gap-4 text-white">
        {tabs.map((tab, index) => {
          return <li 
            key={tab.name}
            onClick={() => setGuildTabIndex(index)}
            className={`cursor-pointer ${guildTabIndex === index ? 'text-accent-blue border-b-2 border-accent-blue' : ''}`}
          >
            {tab.label}
          </li>
        })}
      </ul>
    </div>
    {tabComponent}
  </>
}

export default GuildTabs