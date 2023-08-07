import React from 'react';
import { GuildType } from '../../interfaces/guild.interface';

interface GuildCardProps {
  guild: GuildType;
}

const GuildRow = ({ guild }: GuildCardProps): JSX.Element => {
  return (
    <li className="flex items-center gap-4 p-4 bg-light-blue rounded-lg overflow-hidden hover:outline outline-1 outline-accent-blue transition group">
      <div className="flex gap-4">
        <div
          className={`flex gap-4 items-center self-end py-2 px-3 border rounded-full ${
            guild.isRecruiting
              ? 'bg-green/25 border-green'
              : 'bg-red/25 border-red'
          }`}
        >
          <span
            className={`${
              guild.isRecruiting ? 'bg-green' : 'bg-red'
            } w-2 h-2 rounded-full`}
          />
          {guild.isRecruiting ? (
            <p className="text-green text-sm font-medium">Ouvert</p>
          ) : (
            <p className="text-red text-sm font-medium">Fermé</p>
          )}
        </div>
        <h3 className="text-white text-md mt-2 font-semibold">{guild.name}</h3>
      </div>
      <div className="flex gap-2">
        <ul className="flex gap-2">
          <div className="bg-main-blue rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold">
            PVP
          </div>
          <div className="bg-main-blue rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold">
            PVE
          </div>
          <div className="bg-main-blue rounded-full h-8 flex items-center px-6 border border-light-blue text-sm text-white font-semibold">
            MCM
          </div>
        </ul>
      </div>
      <div className="flex gap-4 items-center ml-auto">
        <img
          className="rounded-xl w-10 h-10"
          src="https://avatarfiles.alphacoders.com/108/thumb-108702.jpg"
          alt=""
        />
        <div className="flex gap-2">
          <p className="text-light-gray text-sm">Géré par</p>
          <span className="text-white font-semibold text-sm">Myst</span>
        </div>
      </div>
    </li>
  );
};

export default GuildRow;
