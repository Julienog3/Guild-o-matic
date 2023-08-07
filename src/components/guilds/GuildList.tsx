import React from 'react';
import { GuildType } from '../../interfaces/guild.interface';
import { Link } from 'react-router-dom';
import GuildRow from './GuildRow';

interface GuildCardsProps {
  guilds: GuildType[];
  singleRow?: boolean;
}

const GuildList = ({
  guilds,
  singleRow = false,
}: GuildCardsProps): JSX.Element => {
  const filteredGuilds = singleRow ? guilds.slice(0, 3) : guilds;

  return (
    <div className="w-full">
      {guilds && (
        <ul className="flex flex-col gap-6">
          {filteredGuilds.map((guild: GuildType) => {
            return (
              <Link to={`/guilds/${guild.id}`} key={guild.id}>
                <GuildRow guild={guild} />
              </Link>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default GuildList;
