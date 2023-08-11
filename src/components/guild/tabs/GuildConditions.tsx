import React from 'react';

interface GuildConditions {
  description?: string;
}

const GuildConditions = ({ description }: GuildConditions): JSX.Element => {
  return (
    <div>
      <div className="flex flex-col max-w-7xl mx-auto">
        <article className="relative w-full rounded-md bg-light-blue border border-light-blue p-8 z-10">
          <h3 className="text-xl font-semibold text-white">Conditions</h3>
          <div className="prose">{description}</div>
        </article>
      </div>
    </div>
  );
};

export default GuildConditions;
