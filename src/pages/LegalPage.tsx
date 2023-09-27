import { MDXProvider } from '@mdx-js/react';
import Legales from '../assets/legales.mdx';
import React from 'react';
import { ScrollRestoration } from 'react-router-dom';

const LegalPage = (): JSX.Element => {
  return (
    <>
      <ScrollRestoration />
      <div>
        <div className="max-w-7xl m-auto prose text-light-gray prose-headings:text-white prose-headings:text-xl prose-headings:font-semibold">
          <MDXProvider>
            <Legales />
          </MDXProvider>
        </div>
      </div>
    </>
  );
};

export default LegalPage;
