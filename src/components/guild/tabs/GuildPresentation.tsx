/* eslint-disable react/no-children-prop */
import React from 'react';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import remarkGfm from 'remark-gfm';

interface GuildPresentationProps {
  description?: string;
}

const GuildPresentation = ({
  description,
}: GuildPresentationProps): JSX.Element => {
  return (
    <div className="flex flex-col mb-4 max-w-7xl m-auto">
      <article className="relative w-full rounded-md bg-main-blue border border-light-blue p-8 z-10">
        <h3 className="text-xl font-semibold text-white mb-4">Description</h3>
        <div className="max-w-7xl prose prose-p:text-light-gray prose-headings:text-white prose-headings:text-xl prose-headings:font-semibold prose-strong:text-light-gray prose-strong:font-bold">
          {description && (
            <ReactMarkdown children={description} remarkPlugins={[remarkGfm]} />
          )}
        </div>
      </article>
    </div>
  );
};

export default GuildPresentation;
