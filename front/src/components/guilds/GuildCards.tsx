import React from "react"
import { GuildType } from "../../interfaces/guild.interface"
import Card from "../utils/Card"
import { Link } from "react-router-dom"

interface GuildCardsProps {
  guilds: GuildType[]
}

const GuildCards = ({ guilds }: GuildCardsProps): JSX.Element => {
  return (
    <div className="w-full">
      {guilds &&<ul className="grid gap-4 grid-cols-3">
        {guilds.map((guild: GuildType) => {
          return <Link to={`/guilds/${guild.id}`} key={guild.id}>
            <Card>
              <h2 className="text-white text-2xl mb-2">{guild.name}</h2>
              <p className="text-neutral-600 text-md mb-2">{guild.description}</p>
            </Card>
          </Link>
        })}
      </ul>}
    </div>
  )
}

export default GuildCards