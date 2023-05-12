import React, { useEffect, useState } from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Page from "../components/layout/Page";
import { GuildType } from "../interfaces/guild.interface";

function Guild () {
  const { guildId } = useParams()

  const [guild, setGuild] = useState<GuildType>()

  useEffect(() => {
    fetch(`http://127.0.0.1:3333/guilds/${guildId}`)
      .then((res) => res.json())
      .then((data) => setGuild(data))
  }, [])

  return (
    <Page>
      <ScrollRestoration  />
      <img 
        className=" overflow-hidden rounded-xl mb-4 max-h-80 w-full object-cover"
        src="/images/bg-home.jpg" 
        alt="Guild wars 2 Wallpaper" 
      />
      <h2 className="text-5xl font-bold text-white mb-4">{guild?.name}</h2>
    </Page>
  )
}

export default Guild