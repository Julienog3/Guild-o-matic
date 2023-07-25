import React from "react"
import { Guild } from "../../interfaces/guild.interface"
import { Link } from "react-router-dom"
import GuildCard from "./GuildCard"

interface GuildCardsProps {
  guilds: Guild[]
  singleRow?: boolean
}

const GuildCards = ({ guilds, singleRow = false }: GuildCardsProps): JSX.Element => {

  const filteredGuilds = singleRow ? guilds.slice(0, 3) : guilds

  return (
    <div className="w-full">

      {guilds &&<ul className="grid gap-8 grid-cols-3">
        {filteredGuilds.map((guild: Guild) => {
          return <Link to={`/guilds/${guild.id}`} key={guild.id}>
            <GuildCard guild={guild} />
          </Link> 
          
        })}
      </ul>}
    </div>
  )
}

export default GuildCards