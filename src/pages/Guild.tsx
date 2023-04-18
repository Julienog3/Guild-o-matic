import React from "react";
import { ScrollRestoration, useParams } from "react-router-dom";
import Page from "../components/layout/Page";

function Guild () {
  const { guildId } = useParams()

  return (
    <Page>
      <ScrollRestoration  />
      <img 
        className=" overflow-hidden rounded-xl mb-4 max-h-80 w-full object-cover"
        src="/images/bg-home.jpg" 
        alt="Guild wars 2 Wallpaper" 
      />
      <h2 className="text-5xl font-bold text-white mb-4">Guild {guildId}</h2>
    </Page>
  )
}

export default Guild