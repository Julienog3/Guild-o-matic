import React from "react";
import Page from "../components/layout/Page";
import LinkedButton from "../components/utils/LinkedButton";

function Home () {
  return (
    <Page>
      <img 
        className=" overflow-hidden rounded-xl mb-4 max-h-80 w-full object-cover"
        src="./images/bg-home.jpg" 
        alt="Guild wars 2 Wallpaper" 
      />
      <h2 className="text-5xl font-bold text-white mb-4">Bienvenue sur Guild&apos;Finder</h2>
      <p className="text-neutral-700 font-medium mb-4">Le site pour trouver la guilde francophone qu&apos;il vous faut sur Guild Wars 2</p>
      <LinkedButton path="/guilds">
        Voir les guildes
      </LinkedButton>
    </Page>
  )
}

export default Home