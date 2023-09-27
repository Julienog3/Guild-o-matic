import { MDXProvider } from '@mdx-js/react';
import Faq from '../assets/faq.mdx';

import React from 'react';
import { ScrollRestoration } from 'react-router-dom';

const FaqPage = (): JSX.Element => {
  return (
    <>
      <ScrollRestoration />
      <div>
        <div className="max-w-7xl m-auto prose text-light-gray prose-headings:text-white prose-headings:text-xl prose-headings:font-semibold">
          <MDXProvider>
            <Faq />
          </MDXProvider>
        </div>
      </div>
    </>
  );
};

export default FaqPage;
