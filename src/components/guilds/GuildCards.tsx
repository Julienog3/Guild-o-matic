import React from "react"
import { Guild } from "../../interfaces/guild.interface"
import { Link } from "react-router-dom"
import GuildCard from "./GuildCard"

interface GuildCardsProps {
  guilds: Guild[]
}

const GuildCards = ({ guilds }: GuildCardsProps): JSX.Element => {
  return (
    <div className="w-full">
      {guilds &&<ul className="grid gap-8 grid-cols-3">
        {guilds.map((guild: Guild) => {
          return <Link to={`/guilds/${guild.id}`} key={guild.id}>
            <GuildCard guild={guild} />
          </Link> 
          
        })}
      </ul>}
    </div>
  )
}

export default GuildCards