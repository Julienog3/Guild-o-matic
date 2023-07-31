import React from 'react';

interface GuildPresentation {
  description?: string;
}

const GuildPresentation = ({ description }: GuildPresentation): JSX.Element => {
  return (
    <div>
      <div className="flex flex-col w-full">
        <article className="relative w-full rounded bg-light-blue border border-light-blue p-8 z-10">
          <h3 className="text-xl font-semibold text-white">Description</h3>
          <div className="prose text-light-gray">{description}</div>
        </article>
      </div>
    </div>
  );
};

export default GuildPresentation;
