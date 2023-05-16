import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Page from "../components/layout/Page";
import { GuildType } from "../interfaces/guild.interface";
import { supabase } from "../supabaseClient";
import { keysToCamel } from "../utils/format";

function Guild () {
  const { guildId } = useParams()

  const [guild, setGuild] = useState<GuildType>()


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

    const getAccount = () => {
      fetch(`${import.meta.env.VITE_GW2_API_URL}/v2/account?access_token=${import.meta.env.VITE_GW2_API_KEY}`, {
        method: "GET",
      }).then((res) => {
        console.log(res)
      })
    }

    const getGuild = () => {
      fetch(`${import.meta.env.VITE_GW2_API_URL}/v2/guild/41DDD105-36E2-E811-81A8-CDE2AC1EED30?access_token=${import.meta.env.VITE_GW2_API_KEY}`, {
        method: "GET",
      }).then((res) => {
        console.log(res)
      })
    }
    
    getAccount()
    getGuild()
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