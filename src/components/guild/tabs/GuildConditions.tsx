import React from 'react';

interface GuildConditions {
  description?: string;
}

const GuildConditions = ({ description }: GuildConditions): JSX.Element => {
  return (
    <div className="flex flex-col mb-4 max-w-7xl m-auto">
      <article className="relative w-full rounded-md bg-main-blue border border-light-blue p-8 z-10">
        <h3 className="text-xl font-semibold text-white mb-4">Conditions</h3>
        <div className="max-w-7xl prose text-light-gray prose-headings:text-white prose-headings:text-xl prose-headings:font-semibold">
          Arrive bientôt
        </div>
      </article>
    </div>
  );
};

export default GuildConditions;
