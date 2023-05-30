import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Page from "../components/layout/Page";
import { GuildType } from "../interfaces/guild.interface";
import { supabase } from "../supabaseClient";
import { keysToCamel } from "../utils/helpers";
import { useQuery } from "react-query";
import { guildsService } from "../services/guilds.service";
import { gw2Service } from "../services/gw2.service";

function Guild (): JSX.Element {
  const { guildId } = useParams()
  const [guildDetails, setGuildDetails] = useState<GuildType>()

  const { data } = useQuery(['guilds', guildId], () => guildsService.getGuildById(guildId))

  useEffect(() => {
    if (data) {
      gw2Service.getGuildById(data.guildId).then((res) => {
        setGuildDetails(res)
      })
    }
  }, [data])

  return (
    <Page>
      <ScrollRestoration  />
      <div className="flex flex-col w-auto mx-12">
        <div className="relative guild-card__image h-80 p-8">
          <h2 className="relative text-5xl font-bold text-white mb-4 z-10">{data?.name}</h2>
          <img 
            className="absolute top-0 left-0 overflow-hidden rounded-t-xl mb-4 h-full w-full object-cover"
            src="/images/bg-card.jpg" 
            alt="Guild wars 2 Wallpaper" 
          />
        </div>
        <article className="relative -top-4 w-full rounded-t-xl bg-main-blue border border-light-blue h-screen p-8 z-10">
          <div className="prose">
            {data?.description}
          </div>
        </article>
      </div>
     
    </Page>
  )
}

export default Guild