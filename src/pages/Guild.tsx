import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Page from "../components/layout/Page";
import { GuildType } from "../interfaces/guild.interface";
import { supabase } from "../supabaseClient";
import { keysToCamel } from "../utils/format";

function Guild () {
  const { guildId } = useParams()

  const [guild, setGuild] = useState<GuildType>()

  const text = "# salut"

  useEffect(() => {
    const getGuilds = async () => {
      const { data, error } = await supabase
        .from('guilds')
        .select('*')
        .eq('id', guildId)

      if (error) {
        return
      }

      const formattedData = keysToCamel(data)
      setGuild(formattedData[0])
    }
   
    getGuilds()
  }, [])

  return (
    <Page>
      <ScrollRestoration  />
      <div className="flex flex-col w-auto mx-12">
        <div className="relative guild-card__image h-80 p-8">
          <h2 className="relative text-5xl font-bold text-white mb-4 z-10">{guild?.name}</h2>
          <img 
            className="absolute top-0 left-0 overflow-hidden rounded-t-xl mb-4 h-full w-full object-cover"
            src="/images/bg-card.jpg" 
            alt="Guild wars 2 Wallpaper" 
          />
        </div>
        <article className="relative -top-4 w-full rounded-t-xl bg-main-blue border border-light-blue h-screen p-8 z-10">
          <div className="prose">
          </div>
        </article>
      </div>
     
    </Page>
  )
}

export default Guild