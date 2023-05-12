import React from "react"
import { GuildType } from "../../interfaces/guild.interface"

interface GuildCardProps {
  guild: GuildType
}

const GuildCard = ({ guild }: GuildCardProps): JSX.Element => {
  return <article className="guild-card bg-light-blue rounded-lg overflow-hidden ">
    <div className="relative h-48 w-full p-6 overflow-hidden">
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-raleway text-3xl font-bold">{guild.name}</h3>
          <div className="flex gap-4 items-center">
            <span className={`${guild.isRecruiting ? 'bg-green' : 'bg-red'} w-2 h-2 rounded-full`} />
            {guild.isRecruiting 
              ? <p className="text-green text-lg font-medium">Ouvert</p>
              : <p className="text-red text-lg font-medium">Fermé</p>
            }
          </div>
        </div>
        <div className="flex gap-12">
          <div className="flex flex-col gap-1">
            <h4 className="text-light-gray font-raleway text-lg font-semibold">Niveau</h4>
            <span className="text-white text-2xl font-semibold">{guild.level}</span>
          </div>
          <div className="flex flex-col gap-1">
            <h4 className="text-light-gray font-raleway text-lg font-semibold">Membres</h4>
            <span className="text-white text-2xl font-semibold">{guild.members}</span>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full guild-card__image">
        <img className="absolute h-full object-cover w-full" src="./images/bg-card.jpg" alt="" />
      </div>
    </div>
    <div className="p-4 flex justify-between">
      <div className="flex gap-4 items-center">
        <img className="rounded-xl w-12 h-12" src="https://avatarfiles.alphacoders.com/126/126956.jpg" alt="" />
        <div className="flex flex-col">
          <p className="text-light-gray ">Géré par</p>
          <span className="text-white font-semibold text-lg">Myst</span>
        </div>
      </div>
      <div className="h-12 w-fit px-4 text-white bg-accent-blue flex items-center font-raleway font-medium rounded-md">
        En savoir plus
      </div>
    </div>
  </article>
}

export default GuildCard