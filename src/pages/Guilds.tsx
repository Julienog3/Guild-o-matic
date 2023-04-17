import React from "react";
import Page from "../components/layout/Page";
import GuildCards from "../components/guilds/GuildCards";
import { useAtom } from "jotai";
import { guildAtom } from "../App";

function Guilds () {
  const [guilds] = useAtom(guildAtom)

  return (
    <Page>
      <img 
        className=" overflow-hidden rounded-xl mb-4 max-h-80 w-full object-cover"
        src="./images/bg-home.jpg" 
        alt="Guild wars 2 Wallpaper" 
      />
      <h2 className="text-4xl font-bold text-white mb-8">Toutes les guildes</h2>
      <GuildCards guilds={guilds}/>
    </Page>
  )
}

export default Guilds