import React from 'react';

interface GuildCardStatusProps {
  isOpened: boolean;
}

const GuildCardStatus = ({ isOpened }: GuildCardStatusProps) => {
  return (
    <div
      className={`flex gap-4 items-center self-end py-2 px-3 border rounded-full ${
        isOpened ? 'bg-green/25 border-green' : 'bg-red/25 border-red'
      }`}
    >
      <span
        className={`${
          isOpened ? 'bg-green text-green' : 'bg-red text-red'
        } w-2 h-2 rounded-full`}
      />
      <p
        className={`text-sm font-medium ${
          isOpened ? ' text-green' : ' text-red'
        }`}
      >
        {isOpened ? 'Ouvert' : 'Fermé'}
      </p>
    </div>
  );
};

export default GuildCardStatus;
