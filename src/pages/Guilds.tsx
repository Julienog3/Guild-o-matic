import React, { useState } from "react";
import Page from "../components/layout/Page";
import GuildCards from "../components/guilds/GuildCards";
import GuildFilter from "../components/guilds/GuildFilter";
import { useQuery } from "react-query";
import { guildsService } from "../services/guilds.service";
import GuildList from "../components/guilds/GuildList";
import { BsGridFill } from "react-icons/bs";
import { FiMenu } from "react-icons/fi";

function Guilds () {
  const { data } = useQuery('guilds', guildsService.getGuilds)

  const [isDisplayList, setIsDisplayList] = useState<boolean>(false)
  
  return (
    <Page>
      <div className="flex mb-4 p-8 rounded-lg overflow-hidden relative h-64">
        <div className="absolute z-0 top-0 left-0 w-full h-full ">
          <img className="absolute h-full object-cover w-full" src="/images/bg-guilds.jpg" alt="" />
        </div>
      </div>
      <div className="w-full items-center gap-4 border-b border-light-blue pb-4 my-8">
        <h2 className="text-2xl font-semibold text-white">Toutes les guildes</h2>
      </div>
      <div className="flex w-full justify-between items-center mb-8">
        <GuildFilter />
        <div className="flex gap-4">
          <input 
            type="text"
            placeholder="Rechercher une guilde"
            className=" rounded-lg text-sm bg-transparent border p-2 bg-main-blue border-light-blue outline-accent-blue text-white" 
          />
          <button 
            className={`${isDisplayList ? 'bg-accent-blue' : 'bg-main-blue'} cursor-pointer w-fit p-4 font-raleway gap-8 border text-white text-sm  border-light-blue rounded-lg  flex items-center justify-center hover:border-accent-blue transition-colors`}
            onClick={(): void => setIsDisplayList(true)}
          >
            <FiMenu />
          </button>
          <button 
            className={`${isDisplayList ? 'bg-main-blue' : 'bg-accent-blue'} cursor-pointer w-fit p-4 py-4 font-raleway gap-8 border text-white text-sm  border-light-blue rounded-lg flex items-center justify-center hover:border-accent-blue transition-colors`}
            onClick={(): void => setIsDisplayList(false)}
          >
            <BsGridFill />
          </button>
        </div>
      </div>
      {(data?.length) ? 
        (isDisplayList) ? <GuildList guilds={data}/> : <GuildCards guilds={data}/>
        : <div>There is nothing</div>
      }
    </Page>
  )
}

export default Guilds