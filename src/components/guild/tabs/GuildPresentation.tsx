/* eslint-disable react/no-children-prop */
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

interface GuildPresentation {
  description?: string;
}

const GuildPresentation = ({ description }: GuildPresentation): JSX.Element => {
  return (
    <div>
      <div className="flex flex-col mb-4 ">
        <article className="relative w-full rounded-md bg-main-blue border border-light-blue p-8 z-10">
          <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
          <div className="w- max-w-full prose text-light-gray prose-headings:text-white prose-headings:text-xl prose-headings:font-semibold">
            {description && (
              <ReactMarkdown
                children={description}
                remarkPlugins={[remarkGfm]}
              />
            )}
          </div>
        </article>
      </div>
    </div>
  );
};

export default GuildPresentation;
