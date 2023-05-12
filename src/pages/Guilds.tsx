import React, { useEffect, useState } from "react";
import Page from "../components/layout/Page";
import GuildCards from "../components/guilds/GuildCards";
import { supabase } from './../supabaseClient'
import GuildFilter from "../components/guilds/GuildFilter";
import { keysToCamel } from "../utils/format";

function Guilds () {
  const [guilds, setGuilds] = useState<any>([])

  useEffect(() => {
    const getGuilds = async () => {
      const { data, error } = await supabase
        .from('guilds')
        .select('*')

      if (error) {
        return
      }

      const formattedData = keysToCamel(data)
      setGuilds(formattedData)
    }
   
    getGuilds()
  }, [])

  return (
    <Page>
      <div className="w-full border-b border-light-blue mb-4">
        <h2 className="text-4xl font-raleway font-semibold text-white mb-4">Toutes les guildes</h2>
      </div>
      <GuildFilter />
      {(guilds.length) ? <GuildCards guilds={guilds}/> : <div>There is nothing</div>}
    </Page>
  )
}

export default Guilds