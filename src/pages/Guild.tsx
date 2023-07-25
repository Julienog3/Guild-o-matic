import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Page from "../components/layout/Page";
import { GuildCategoryEnum, GuildType } from "../interfaces/guild.interface";
import { useQuery } from "react-query";
import { guildsService } from "../services/guilds.service";
import { gw2Service } from "../services/gw2.service";
import GuildPresentation from "../components/guild/tabs/GuildPresentation";
import GuildConditions from "../components/guild/tabs/GuildConditions";
import GuildTabs from "../components/guild/GuildTabs";

export type Tab = {
  name: string
  label: string
  component: React.ReactNode
}

function Guild (): JSX.Element {
  const { guildId } = useParams()
  const [guildDetails, setGuildDetails] = useState<GuildType>()
  const [categories, setCategories] = useState<GuildCategoryEnum[]>([])
 
  const { data } = useQuery(['guilds', guildId], () => {
    if (guildId) {
      return guildsService.getGuildById(guildId)
    }
  })

   const tabs: Tab[] = [
    {
      name: "general",
      label: "Général",
      component: <GuildPresentation description={data?.description}/>
    },
    {
      name: "conditions",
      label: "Conditions",
      component: <GuildConditions description={data?.description}/>
    }
  ]

  useEffect(() => {
    if (!data) {
      return
    }

    gw2Service.getGuildById(data.guildId).then((res) => {
      setGuildDetails(res)
    })

    guildsService.getGuildCategoriesById(data.id).then((res) => {
      setCategories(res)
    })
  }, [data])

  useEffect(() => {
    console.log(categories)
  }, [categories])

  return (
    <Page>
      <ScrollRestoration  />
      <div className="flex mb-4 p-8 rounded-lg overflow-hidden relative h-64">
        {guildDetails && <h2 className="flex z-10 self-end items-center gap-4 text-white text-4xl font-bold">
          <span className=" bg-accent-blue/25 border text-xl border-accent-blue font-medium text-accent-blue py-1 px-3 rounded-lg ">{guildDetails.tag}</span>
           {guildDetails.name}
        </h2>}
        {/* {categories.map((category, index) => {
          return <span key={index}>{category}</span>
        })} */}
        <div className="absolute z-0 top-0 left-0 w-full h-full guild-card__image">
          <img className="absolute h-full object-cover w-full" src="/images/bg-home.jpg" alt="" />
        </div>
      </div>
      <GuildTabs tabs={tabs}/>     
    </Page>
  )
}

export default Guild