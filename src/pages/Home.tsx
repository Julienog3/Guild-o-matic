import React from "react";
import Page from "../components/layout/Page";
import LinkedButton from "../components/utils/LinkedButton";
import GuildFilter from "../components/guilds/GuildFilter";
import GuildCards from "../components/guilds/GuildCards";
import { guildsService } from "../services/guilds.service";
import { useQuery } from "react-query";

function Home () {
  const { data } = useQuery('guilds', guildsService.getGuilds)

  return (
    <Page>
      <div className="flex mb-4 p-8 rounded-lg overflow-hidden relative h-64">
        <div className="absolute z-0 top-0 left-0 w-full h-full ">
          <img className="absolute h-full object-cover w-full" src="/images/bg-landing.jpg" alt="" />
        </div>
      </div>
      <div className="w-full border-b border-light-blue mb-4">
        <h2 className="text-4xl font-raleway font-semibold text-white mb-4">Les guildes récentes</h2>
      </div>
      {(data?.length) ? <GuildCards guilds={data} singleRow /> : <div>There is nothing</div>}
    </Page>
  )
}

export default Home