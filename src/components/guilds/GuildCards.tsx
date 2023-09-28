import React from 'react';
import { GuildType } from '../../interfaces/guild.interface';
import { Link } from 'react-router-dom';
import GuildCard from './GuildCard/GuildCard';

interface GuildCardsProps {
  guilds: GuildType[];
  singleRow?: boolean;
}

const GuildCards = ({
  guilds,
  singleRow = false,
}: GuildCardsProps): JSX.Element => {
  const filteredGuilds = singleRow ? guilds.slice(0, 3) : guilds;

  return (
    <div className="w-full">
      <ul className="grid gap-4 xl:grid-cols-3 md:grid-cols-2 grid-cols-1">
        {filteredGuilds.map((guild: GuildType) => {
          return (
            <Link to={`/guilds/${guild.id}`} key={guild.id}>
              <GuildCard guild={guild} />
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default GuildCards;
